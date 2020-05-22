const fileopration = require('./sys-tool/fileopr.js');
const ostools = require('./sys-tool/os-tools.js');
const arraytools = require('./custom-tool/array-tools.js');
const timetools = require('./custom-tool/time-tools.js');
const objecttools = require('./custom-tool/object-tools.js');
module.exports={
    ...fileopration,
    ...ostools,
    ...arraytools,
    ...timetools,
    ...objecttools,
}

