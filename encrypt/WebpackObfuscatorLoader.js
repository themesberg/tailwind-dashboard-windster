const path = require('path');
const loaderUtils = require('loader-utils');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { getClassNames, transformEncryptedJs } = require('./webpack.utils');
const fs = require('fs-extra');

function WebpackObfuscatorLoader(sourceCode) {
    const context = this;
    const classNames = getClassNames();
    const relativePathOfModule = path.relative(context.rootContext, context.resourcePath);

    const sourceCodeWithEncryptedClasses = transformEncryptedJs({
        classNames,
        overwrite: false,
        fileName: context.resourcePath,
    })

    // const name = Math.floor(Math.random() * 10000 + 1)
    // fs.writeFileSync(path.resolve(__dirname, 'before_objuscate', `f-${name}.js`), Buffer.from(sourceCodeWithEncryptedClasses))

    // Obfuscates commented source code
    const options = loaderUtils.getOptions(context) || {};
    const obfuscationResult = JavaScriptObfuscator.obfuscate(
        sourceCodeWithEncryptedClasses,
        {
            ...options,
            ignoreRequireImports: true,
            inputFileName: relativePathOfModule,
            sourceMapMode: 'separate'
        }
    );

    return obfuscationResult.getObfuscatedCode();
}

module.exports = WebpackObfuscatorLoader;