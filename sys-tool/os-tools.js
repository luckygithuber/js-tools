/**
 *  * Author: LX
 * Create  2020/3/22 0:58
 * Description:
 *  对process的封装
 */
module.exports= (function () {
    /**
     * 返回NodeJS的版本
     * @returns {string}
     */
    function nodeVersion() {
        return process.version
    }

    /**
     * 返回当前NodeJS 工作目录
     * @returns {string}
     */
    function currentDirectory() {
        return process.cwd();
    }

    /**
     * NodeJS安装目录
     * @returns {string}
     */
    function nodePath() {
        return process.execPath;
    }

    /**
     * 返回当前操作系统
     * @returns {string}
     */
    function currentOSType() {
        return process.env.os;
    }

    /**
     * 返回NodeJS当前工作文件路径
     * @returns {string}
     */
    function currentFilePath() {
        return __filename;
    }
    return{
        nodeVersion,
        currentDirectory,
        nodePath,
        currentOSType,
        currentFilePath,
    }
})()

