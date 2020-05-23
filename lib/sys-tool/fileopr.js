/**
 * Author: LX
 * Create  2020/3/21 22:42
 * Description:
 * NodeJS fs模块的封装
 *  会尽可能地使用异步方法
 *  在繁忙的进程中，应使用系统API的异步版本。 同步的版本会阻塞整个进程（停止所有的连接），直到它们完成。
 */
module.exports = (function () {
    const fs = require('fs')
    const path = require('path')

    /**
     * 文件是否存在
     * @param filePath
     * @returns {Promise}
     */
    function isFileExist(filePath) {
        let _filePath = path.normalize(filePath)
        return new Promise((resolve, reject) => {
            fs.access(_filePath, fs.constants.F_OK, err => {
                err ? reject(err) : resolve();
            });
        })
    }


    /**
     * 文件是否可读
     * @param filePath
     * @returns  {Promise}
     */
    function isFileReadable(filePath) {
        let _filePath = path.normalize(filePath)
        return new Promise((resolve, reject) => {
            fs.access(_filePath, fs.constants.R_OK, err => {
                err ? reject(err) : resolve();
            });
        })
    }

    /**
     * 文件是否可写
     * @param filePath
     * @returns {Promise}
     */
    function isFileWritable(filePath) {
        let _filePath = path.normalize(filePath)
        return new Promise((resolve, reject) => {
            fs.access(_filePath, fs.constants.W_OK, err => {
                err ? reject(err) : resolve();
            });
        })
    }

    /**
     * 文件是否可执行
     * @param filePath
     * @returns  {Promise}
     */
    function isFileExecutable(filePath) {
        let _filePath = path.normalize(filePath)
        return new Promise((resolve, reject) => {
            fs.access(_filePath, fs.constants.X_OK, err => {
                err ? reject(err) : resolve();
            });
        })
    }

    /**
     * 将数据添加到文件末尾，使用UTF8编码
     * @param filePath
     * @param data
     * @returns {Promise}
     */
    function appendDataUTF8(filePath, data) {
        let _filePath = path.normalize(filePath)
        return new Promise((resolve, reject) => {
            fs.appendFile(_filePath, data, 'utf8', err => {
                err ? reject(err) : resolve();
            })
        })
    }

    /**
     * 复制文件，返回Promise，如果出错则reject
     * @param src
     * @param dest
     * @returns {Promise}
     */
    function copyFileOverride(src, dest) {
        let _src = path.normalize(src)
        let _dest = path.normalize(dest)
        return new Promise((resolve, reject) => {
            fs.copyFile(_src, _dest, err => {
                err ? reject(err) : resolve();
            })
        })
    }

    /**
     * 复制文件，返回Promise，如果文件存在或其它错误，则reject
     * @param src
     * @param dest
     * @returns {Promise}
     */
    function copyFileNotOverride(src, dest) {
        let _src = path.normalize(src)
        let _dest = path.normalize(dest)
        return new Promise((resolve, reject) => {
            fs.copyFile(_src, _dest, fs.constants.COPYFILE_EXCL, err => {
                err ? reject(err) : resolve();
            })
        })
    }

    /**
     * 创建目录，若存在目录，则覆盖
     * @param dirPath
     * @returns {Promise}
     */
    function mkdirOverride(dirPath) {
        let _dirPath = path.normalize(dirPath);
        return new Promise(((resolve, reject) => {
            fs.mkdir(_dirPath, {recursive: true}, err => {
                err ? reject(err) : resolve();
            })
        }))
    }

    /**
     * 创建目录，若存在，不覆盖，Promise reject
     * @param dirPath
     * @returns {Promise}
     */
    function mkdirNotOverride(dirPath) {
        let _dirPath = path.normalize(dirPath);
        return new Promise(((resolve, reject) => {
            fs.mkdir(_dirPath, {recursive: false}, err => {
                err ? reject(err) : resolve();
            })
        }))
    }

    /**
     * 读取目录信息，如果成功，则返回一个包含目录中文件的数组
     * @param dirPath
     * @returns {Promise}
     */
    function readDirUTF8(dirPath) {
        let _dirPath = path.normalize(dirPath);
        return new Promise((resolve, reject) => {
            fs.readdir(_dirPath, 'utf8', (err, files) => {
                err ? reject(err) : resolve(files);
            });
        })

    }

    /**
     * 读取文件，若成功，返回一个Buffer
     * @param filePath
     * @returns {Promise}
     */
    function readFileBuffer(filePath) {
        let _filePath = path.normalize(filePath);
        return new Promise((resolve, reject) => {
            fs.readFile(_filePath, (err, data) => {
                err ? reject(err) : resolve(data);
            })
        })
    }

    /**
     * 读取文件，若成功，返回由UTF8编码的字符串
     * 当 path 是目录时， fsPromises.readFile() 的行为是特定于平台的。
     * 在 macOS、Linux 和 Windows 上，promise 将会被拒绝并带上一个错误。 在 FreeBSD 上，则将会返回目录内容的表示。
     * @param filePath
     * @returns {Promise}
     */
    function readFileUTF8(filePath) {
        let _filePath = path.normalize(filePath);
        return new Promise((resolve, reject) => {
            fs.readFile(_filePath, 'utf8', (err, data) => {
                err ? reject(err) : resolve(data);
            })
        })
    }

    /**
     * 异步地把 oldPath 文件重命名为 newPath 提供的路径名。 如果 newPath 已存在，则覆盖它。
     * 返回一个Promise
     * @param oldFileName
     * @param newFileName
     * @returns {Promise}
     */
    function renameFile(oldFileName, newFileName) {
        let _oldFileName = path.normalize(oldFileName);
        let _newFileName = path.normalize(newFileName);
        return new Promise((resolve, reject) => {
            fs.rename(_oldFileName, _newFileName, err => {
                err ? reject(err) : resolve();
            })
        })
    }

    /**
     * 对目录不起作用，只能删除文件
     * @param filePath
     * @returns {Promise}
     */
    function rmFile(filePath) {
        let _filePath = path.normalize(filePath);
        return new Promise((resolve, reject) => {
            fs.unlink(_filePath, err => {
                err ? reject(err) : resolve();
            })
        })
    }

    /**
     * 获取文件信息
     * @param filePath
     * @returns {Promise}
     */
    function fileInfo(filePath) {
        let _filePath = path.normalize(filePath);
        return new Promise((resolve, reject) => {
            fs.stat(_filePath, {bigint: false}, (err, info) => {
                err ? reject(err) : resolve(info);
            })
        })
    }

    /**
     * data可以是Buffer|String
     * 异步地将数据写入到一个文件，如果文件已存在则覆盖该文件
     * @param filePath
     * @param dataSource
     * @returns {Promise}
     */
    function writeFileUTF8(filePath, dataSource) {
        let _filePath = path.normalize(filePath);
        return new Promise((resolve, reject) => {
            fs.writeFile(_filePath, dataSource, 'utf8', err => {
                err ? reject(err) : resolve();
            })
        })
    }

    return {
        isFileExist,
        isFileReadable,
        isFileWritable,
        isFileExecutable,
        appendDataUTF8,
        copyFileOverride,
        copyFileNotOverride,
        mkdirOverride,
        mkdirNotOverride,
        readDirUTF8,
        readFileBuffer,
        readFileUTF8,
        renameFile,
        rmFile,
        fileInfo,
        writeFileUTF8,
    };
})();


