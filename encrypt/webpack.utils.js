
const path = require('path');
const fs = require('fs-extra');

const filenameReservedRegex = /[<>:"/\\|?*]/g;
// eslint-disable-next-line no-control-regex
const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g;

const regexSingleEscape = /[ -,.\/:-@[\]\^`{-~]/;
const regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;


const normalizePath = (file) => {
	return path.sep === "\\" ? file.replace(/\\/g, "/") : file;
}

const escape = (string) => {
	let output = "";
	let counter = 0;

	while (counter < string.length) {
		// eslint-disable-next-line no-plusplus
		const character = string.charAt(counter++);

		let value;

		// eslint-disable-next-line no-control-regex
		if (/[\t\n\f\r\x0B]/.test(character)) {
			const codePoint = character.charCodeAt();

			value = `\\${codePoint.toString(16).toUpperCase()} `;
		} else if (character === "\\" || regexSingleEscape.test(character)) {
			value = `\\${character}`;
		} else {
			value = character;
		}

		output += value;
	}

	const firstChar = string.charAt(0);

	if (/^-[-\d]/.test(output)) {
		output = `\\-${output.slice(1)}`;
	} else if (/\d/.test(firstChar)) {
		output = `\\3${firstChar} ${output.slice(1)}`;
	}

	// Remove spaces after `\HEX` escapes that are not followed by a hex digit,
	// since they’re redundant. Note that this is only possible if the escape
	// sequence isn’t preceded by an odd number of backslashes.
	output = output.replace(regexExcessiveSpaces, ($0, $1, $2) => {
		if ($1 && $1.length % 2) {
			// It’s not safe to remove the space, so don’t.
			return $0;
		}

		// Strip the space.
		return ($1 || "") + $2;
	});

	return output;
}

const escapeLocalIdent = (localident) => {
	// TODO simplify in the next major release
	return escape(
		localident
			// For `[hash]` placeholder
			.replace(/^((-?[0-9])|--)/, "_$1")
			.replace(filenameReservedRegex, "-")
			.replace(reControlChars, "-")
			.replace(/\./g, "-")
	);
}

const getLocalIdent = (loaderContext, localIdentName, localName, options) => {
	let relativeMatchResource = "";

	const { context } = options;
	const { resourcePath, _module, _compiler, _compilation } = loaderContext;

	// eslint-disable-next-line no-underscore-dangle
	if (_module && _module.matchResource) {
		relativeMatchResource = `${normalizePath(
			// eslint-disable-next-line no-underscore-dangle
			path.relative(context, _module.matchResource)
		)}\x00`;
	}

	const relativeResourcePath = normalizePath(
		path.relative(context, resourcePath)
	);

	// eslint-disable-next-line no-param-reassign
	options.content = `${relativeMatchResource}${relativeResourcePath}\x00${localName}`;

	let { hashFunction, hashDigest, hashDigestLength } = options;
	const matches = localIdentName.match(
		/\[(?:([^:\]]+):)?(?:(hash|contenthash|fullhash))(?::([a-z]+\d*))?(?::(\d+))?\]/i
	);

	if (matches) {
		const hashName = matches[2] || hashFunction;

		hashFunction = matches[1] || hashFunction;
		hashDigest = matches[3] || hashDigest;
		hashDigestLength = matches[4] || hashDigestLength;

		// `hash` and `contenthash` are same in `loader-utils` context
		// let's keep `hash` for backward compatibility

		// eslint-disable-next-line no-param-reassign
		localIdentName = localIdentName.replace(
			/\[(?:([^:\]]+):)?(?:hash|contenthash|fullhash)(?::([a-z]+\d*))?(?::(\d+))?\]/gi,
			() => (hashName === "fullhash" ? "[fullhash]" : "[contenthash]")
		);
	}

	// eslint-disable-next-line no-underscore-dangle
	const hash = _compiler.webpack.util.createHash(hashFunction);
	const { hashSalt } = options;

	if (hashSalt) {
		hash.update(hashSalt);
	}

	hash.update(options.content);

	const localIdentHash = hash
		.digest(hashDigest)
		.slice(0, hashDigestLength)
		.replace(/[/+]/g, "_")
		.replace(/^\d/g, "_");

	// TODO need improve on webpack side, we should allow to pass hash/contentHash without chunk property, also `data` for `getPath` should be looks good without chunk property
	const ext = path.extname(resourcePath);
	const base = path.basename(resourcePath);
	const name = base.slice(0, base.length - ext.length);
	const data = {
		filename: path.relative(context, resourcePath),
		contentHash: localIdentHash,
		chunk: {
			name,
			hash: localIdentHash,
			contentHash: localIdentHash,
		},
	};

	// eslint-disable-next-line no-underscore-dangle
	let result = _compilation.getPath(localIdentName, data);

	if (/\[folder\]/gi.test(result)) {
		const dirname = path.dirname(resourcePath);
		let directory = normalizePath(
			path.relative(context, `${dirname + path.sep}_`)
		);

		directory = directory.substr(0, directory.length - 1);

		let folder = "";

		if (directory.length > 1) {
			folder = path.basename(directory);
		}

		result = result.replace(/\[folder\]/gi, () => folder);
	}

	if (options.regExp) {
		const match = resourcePath.match(options.regExp);

		if (match) {
			match.forEach((matched, i) => {
				result = result.replace(new RegExp(`\\[${i}\\]`, "ig"), matched);
			});
		}
	}

	return escapeLocalIdent(result)
}

// get encrypted classNames
const getClassNames = () => {
	const classNamesPath = path.resolve(__dirname, '..', 'classNames.json')
	const classNamesFile = fs.readFileSync(classNamesPath);
	const classNames = JSON.parse(classNamesFile.toString());

	return classNames;
}

const transformEncryptedJs = ({ fileName, classNames = {}, overwrite = true }) => {
	const jsSourcePath = path.resolve(__dirname, fileName);
	let jsContent = fs.readFileSync(jsSourcePath).toString();

	Object.keys(classNames).forEach(className => {
		const encryptedClassName = classNames[className];
		// generic regex used to replace all class names for our dynamically added/removed classes
		const regex1 = new RegExp(`(classList\.)(.+)('${className}')(.+)`, "g");
		// regex used to replace classes related to kanban's draggable elements
		const regex2 = new RegExp(`(dragClass|ghostClass): '(${className})',`)
		// regex used to replace classes related to tippy tooltip 
		// const regex3 = new RegExp(`(BOX_CLASS|CONTENT_CLASS|BACKDROP_CLASS|ARROW_CLASS|SVG_ARROW_CLASS) = "(${className})";`)

		jsContent = jsContent
			.replace(regex1, (match, p1, p2, p3, p4) => (
				`${p1}${p2}'${encryptedClassName}'${p4}`
			))
			.replace(regex2, (match, p1, p2, off, string) => (
				`${p1}: '${encryptedClassName}',`
			))
		// .replace(regex3, (match, p1, p2, off, string) => (
		// 	`${p1} = '${encryptedClassName}';`
		// ));
	});

	if (overwrite) {
		fs.writeFileSync(jsSourcePath, jsContent)
	}

	return jsContent
}

module.exports = {
	escape,
	escapeLocalIdent,
	getLocalIdent,
	transformEncryptedJs,
	getClassNames,
}