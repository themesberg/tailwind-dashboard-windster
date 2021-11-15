const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const archiver = require('archiver');
const prettyBytes = require('pretty-bytes');
const args = require('minimist')(process.argv.slice(2), {
    alias: { v: 'version', o: 'output' }
});

const RELEASE_DIR_NAME = '.release';
const REQUIRED_FOLDERS = ['content', 'data', 'layouts', 'resources', 'src', 'static'];
const REQUIRED_FILES = ['LICENSE.md', 'postcss.config.js', 'README.md', 'syntax.css', 'tailwind.config.js', 'webpack.config.js'];
const REQUIRED_SCRIPTS = ['start', 'start:dev:hugo', 'start:dev:webpack', 'build', 'build:hugo', 'build:webpack', 'build:styles'];
const REQUIRED_DEPS = [
    'css-loader', 'file-loader', 'mini-css-extract-plugin', 'css-minimizer-webpack-plugin', 'npm-run-all',
    'postcss', 'postcss-loader', 'postcss-preset-env', 'source-map-loader', 'style-loader', 'tailwindcss',
    'terser-webpack-plugin', 'webpack', 'webpack-cli', 'webpack-dev-server', 'yarn'
];
const releaseDirPath = path.resolve(__dirname, RELEASE_DIR_NAME);

const moveDocument = (docName) => {
    const sourceDirPath = path.resolve(__dirname, docName);
    const destDirPath = path.resolve(__dirname, RELEASE_DIR_NAME, docName);
    fs.copySync(sourceDirPath, destDirPath, { recursive: true, overwrite: true });
};

const getRequiredKeysFromJson = (json, keys) => (
    Object.keys(json).reduce((acc, key) => {
        if (keys.includes(key)) acc[key] = json[key];
        return acc;
    }, {})
);

const preparePackageJsonForRelease = () => {
    const pkgJsonPath = path.resolve(__dirname, 'package.json');
    const pkgJsonOutputPath = path.resolve(__dirname, RELEASE_DIR_NAME, 'package.json');
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath).toString());

    const pkgJsonUpdated = Object.keys(pkgJson)
        .reduce((acc, key) => {
            const pkgJsonValue = pkgJson[key];
            const newPkgJsonValue = args[key];

            acc[key] = newPkgJsonValue ? newPkgJsonValue : pkgJsonValue;

            if (key === 'scripts') {
                const scriptsUpdated = getRequiredKeysFromJson(pkgJsonValue, REQUIRED_SCRIPTS);
                acc[key] = scriptsUpdated;
            } else if (key === 'devDependencies') {
                const depsUpdated = getRequiredKeysFromJson(pkgJsonValue, REQUIRED_DEPS);
                acc[key] = depsUpdated;
            }

            return acc;
        }, {});

    fs.writeJSONSync(pkgJsonOutputPath, pkgJsonUpdated, { spaces: '\t' });
}

const prepareConfigFileForRelease = () => {
    const configPath = path.resolve(__dirname, 'config.yml');
    const configOutputPath = path.resolve(__dirname, RELEASE_DIR_NAME, 'config.yml');
    const configFile = fs.readFileSync(configPath, 'utf8');
    const configJson = yaml.load(configFile, {
        schema: yaml.JSON_SCHEMA
    });

    configJson.baseURL = 'http://localhost:1313';

    const configOut = yaml.dump(configJson, {
        schema: yaml.JSON_SCHEMA
    });

    fs.writeFileSync(configOutputPath, Buffer.from(configOut));
}

const compressReleaseDirectory = () => {
    const outputName = args.output || 'flowbite.application-ui';
    const output = fs.createWriteStream(`${outputName}.zip`);
    const archive = archiver('zip');

    output.on('close', function () {
        const totalBytes = prettyBytes(archive.pointer())
        console.log(`Compression has been finalized. Total size: ${totalBytes}.`);
    });

    archive.on('error', function (err) {
        console.error('Compression failed.');
    });

    archive.pipe(output);

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(releaseDirPath, false);

    archive.finalize();
}

// move all required folders under release folder
fs.rmSync(releaseDirPath, { recursive: true, force: true });
REQUIRED_FOLDERS.forEach(folderName => moveDocument(folderName));

// move all required files under release folder
REQUIRED_FILES.forEach(folderName => moveDocument(folderName));

// prepare & move package.json file to release folder
preparePackageJsonForRelease();

// prepare & move config.yml file to release folder
prepareConfigFileForRelease();

// compress release folder
compressReleaseDirectory();