const {existsSync, writeFileSync, readFileSync, watch, read} = require('fs');
const {dirname, resolve, extname} = require('path');

const root = dirname(require.main.paths[1]);

const funcWrapper = ['function (require, module, exports) {', '}'];
const getFilePath = modulePath => [modulePath, `${modulePath}.js`, `${modulePath}/index.js`].find(existsSync);

main(require(resolve(root, 'packer.config')));

function main(config) {
    if (Array.isArray(config)) return config.map(main);

    if (Array.isArray(config.entry)) return config.entry.map(entry => main({...config, entry, name: entry}));

    if (typeof config.entry === 'object') return Object.entries(config.entry).map(([name, entry]) => main({...config, entry, name}));

    const defaultConfig = {
        base: root,
        name: 'index',
        entry: 'index',
        output: '[name].bundle.js',
        public: (config.base || config.output) ? resolve(config.base || '', dirname(config.output || '')).replace(root, '') + '/' : '/'
    };
    const bundleConfig = Object.assign({}, defaultConfig, config);

    const modulePathIdMap = {};
    const moduleList = [];
    const moduleDepMapList = [];
    const chunkModuleList = [];
    const chunkModulePathIdMap = {};

    deepTravel(resolve(root, bundleConfig.base, bundleConfig.entry), moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap);

    chunkModuleList.forEach((chunk, id) => {
        const dynamicTemplate = readFileSync(resolve(__dirname, 'chunk.boilerplate'), 'utf-8');
        writeFileSync(
            resolve(root, bundleConfig.base, `chunk_${id}.js`),
            dynamicTemplate
                .replace("/* dynamic-require-chunk-id */", `"chunk_${id}"`)
                .replace("/* dynamic-require-chunk-code */", chunk),
            "utf-8"
        );
    });

    writeFileSync(
        resolve(root, bundleConfig.base, bundleConfig.output.replace('[name]', bundleConfig.name.replace(extname(bundleConfig.name), ''))),
        readFileSync(resolve(__dirname, 'bundle.boilerplate'), 'utf-8')
            .replace('/* runtime-config */', JSON.stringify(bundleConfig))
            .replace('/* module-list-template */', moduleList.join(','))
            .replace('/* module-dep-map-list-template */', moduleDepMapList.map(item => JSON.stringify(item)).join(',')),
        'utf-8'
    );

    watch(bundleConfig.base, {encoding: 'utf-8'}, eventType => eventType === "change" && main(bundleConfig));
}

function deepTravel(fullPath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, isChunk = false) {
    const modulePathMatcher = /require(\.ensure)?\(["`'](.+?)["`']\)/g;
    const moduleText = readFileSync(getFilePath(fullPath), 'utf-8');
    const childModules = [];
    const moduleDepMap = {};
    let moduleContent = moduleText;
    let match = null;
    while ((match = modulePathMatcher.exec(moduleText)) !== null) {
        const [, isDynamic, modulePath] = match;
        const childModuleAbsolutePath = resolve(dirname(getFilePath(fullPath)), modulePath);
        if ((isDynamic ? chunkModulePathIdMap : modulePathIdMap).hasOwnProperty(childModuleAbsolutePath)) {
            moduleDepMap[modulePath] = isDynamic ? getChunkRuntimePath(chunkModulePathIdMap, childModuleAbsolutePath) : modulePathIdMap[childModuleAbsolutePath];
            continue;
        };
        childModules.push(modulePath);
        deepTravel(childModuleAbsolutePath, moduleList, moduleDepMapList, modulePathIdMap, chunkModuleList, chunkModulePathIdMap, !!isDynamic);
        moduleDepMap[modulePath] = isDynamic ? getChunkRuntimePath(chunkModulePathIdMap, childModuleAbsolutePath) : modulePathIdMap[childModuleAbsolutePath];
    }
    const funcStr = `${funcWrapper[0]}\n${moduleContent}\n${funcWrapper[1]}`;
    isChunk
        ? cacheModule(chunkModuleList, chunkModulePathIdMap, funcStr, fullPath)
        : cacheModule(moduleList, modulePathIdMap, funcStr, fullPath);
    !isChunk && moduleDepMapList.push(moduleDepMap);
}

function cacheModule(list, map, listVal, mapKey) {
    list.push(listVal);
    map[mapKey] = list.length - 1;
}

function getChunkRuntimePath(chunkModulePathIdMap, chunkModuleAbsolutePath) {
    return `chunk_${chunkModulePathIdMap[chunkModuleAbsolutePath]}`;
}

module.exports = main;