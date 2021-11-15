
const { JSDOM } = require('jsdom');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { getClassNames } = require('./webpack.utils')

const BUILD_DIR = ".build";
const classNames = getClassNames();


const getHTMLFiles = (cb) => {
    glob(`${BUILD_DIR}/**/*.html`, cb);
}

const replaceClassNamesForNode = (node, classNames) => {
    if (node.childNodes && node.childNodes.length > 0) {
        node.childNodes.forEach(n => replaceClassNamesForNode(n, classNames))
    }

    if (!node.classList || node.classList.length === 0) {
        return node
    }

    const nodeClasses = node.classList.value.split(' ')
    nodeClasses.forEach(className => {
        const encryptedClassName = classNames[className]
        if (encryptedClassName) {
            node.classList.replace(className, encryptedClassName)
        }
    })

    return node
}

const transformHTMLFile = (htmlSrc) => {
    return new Promise(async (resolve, reject) => {
        const filePath = path.resolve(__dirname, '..', htmlSrc);
        const file = await JSDOM.fromFile(filePath, { contentType: 'text/html' });

        file.window.document.documentElement.childNodes
            .forEach(node => replaceClassNamesForNode(node, classNames))

        fs.writeFileSync(filePath, file.serialize())

        resolve(file)
    })
}

getHTMLFiles((err, result) => {
    if (err) throw new Error(err)

    Promise.all(result.map(src => transformHTMLFile(src)))
})