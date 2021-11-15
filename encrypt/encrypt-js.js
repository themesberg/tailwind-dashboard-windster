
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const { getClassNames, transformEncryptedJs } = require('./webpack.utils');

const SOURCE_DIR = "src";
const OUTPUT_DIR = "temp";


const getJSFiles = (cb) => {
    const sourceDirPath = path.resolve(__dirname, '..', SOURCE_DIR);
    const outputDirPath = path.resolve(__dirname, '..', OUTPUT_DIR);

    fs.rmSync(outputDirPath, { recursive: true, force: true });
    fs.copySync(sourceDirPath, outputDirPath, { recursive: true, overwrite: true });

    return glob(`../${OUTPUT_DIR}/*.js`, cb);
}


getJSFiles((err, result) => {
    if (err) throw new Error(err);

    const classNames = getClassNames();
    Promise.all(result.map(src => transformEncryptedJs({ fileName: src, classNames })));
});
