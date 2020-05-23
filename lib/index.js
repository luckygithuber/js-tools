/**
 * 工具含ES2015 + 语法，需要兼容低版本浏览器，自行使用Babel Compiler
 */
const fileOperation = require('./sys-tool/fileopr.js');
const osTools = require('./sys-tool/os-tools.js');
const arrayTools = require('./custom-tool/array-tools.js');
const timeTools = require('./custom-tool/time-tools.js');
const objectTools = require('./custom-tool/object-tools.js');
const storeTools = require('./client-tool/store-tools.js');
const stringTools = require('./custom-tool/string-tools.js');
module.exports={
    fileOperation,
    osTools,
    arrayTools,
    timeTools,
    objectTools,
    storeTools,
    stringTools
}
