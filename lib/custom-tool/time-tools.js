/**
 * Author: LX
 * Create  2020/3/22 1:08
 * Description:
 *  对时间的处理
 */
module.exports = (function () {
    /**
     *
     * @param year
     * @param month
     * @param day
     * @param hour
     * @param minute
     * @param second
     * @param format
     *  y,m,d,h,M,s依次表示 年,月,日,时,分,秒
     *  [y年]： y如果是0，则不输出
     * @param accurate
     * 精确到：
     *  有效值 1-6，对应 y-s，大于6则视为6
     * @returns {string}
     */
    function countRemainingTime([year, month, day, hour = 0, minute = 0, second = 0], format = '[y年][m月][d天][h时][M分][s秒]', accurate = 3) {
        let msec = (+new Date(year, month - 1, day, hour, minute, second)) - Date.now();
        if (msec > 0) {
            let mscd = new Date(msec);
            let y = mscd.getUTCFullYear() - 1970,
                m = (mscd.getUTCMonth() > 0 && mscd.getUTCMonth() < 10) ? "0" + (mscd.getUTCMonth()) : mscd.getUTCMonth(),
                d = (mscd.getUTCDate() - 1 > 0 && mscd.getUTCDate() - 1 < 10) ? "0" + (mscd.getUTCDate() - 1) : mscd.getUTCDate(),
                h = (mscd.getUTCHours() > 0 && mscd.getUTCHours() < 10) ? "0" + mscd.getUTCHours() : mscd.getUTCHours(),
                M = mscd.getUTCMinutes() > 0 && mscd.getUTCMinutes() < 10 ? "0" + mscd.getUTCMinutes() : mscd.getUTCMinutes(),
                s = mscd.getUTCSeconds() > 0 && mscd.getUTCSeconds() < 10 ? "0" + mscd.getUTCSeconds() : mscd.getUTCSeconds();
            return extracted(format, y, m, d, h, M, s, accurate);
        } else {
            return "Time has passed"
        }
    }

    /**
     *
     * @param msc
     * @param format
     * @param accurate
     * @returns {string}
     * @see countRemainingTime
     */
    function parseTime(msc, format = '[y年][m月][d天][h时][M分][s秒]', accurate = 3) {
        if (Number(msc) >= 0) {
            let mscd = new Date(msc);
            let y = mscd.getFullYear(),
                m = mscd.getMonth() + 1 > 9 ? mscd.getMonth() : "0" + (mscd.getMonth() + 1),
                d = mscd.getDate() > 9 ? mscd.getDate() : "0" + mscd.getDate(),
                h = mscd.getHours() > 9 ? mscd.getHours() : "0" + mscd.getHours(),
                M = mscd.getMinutes() > 9 ? mscd.getMinutes() : "0" + mscd.getMinutes(),
                s = mscd.getSeconds() > 9 ? mscd.getSeconds() : "0" + mscd.getSeconds();
            return extracted(format, y, m, d, h, M, s, accurate);
        } else {
            return "Invalid parameter 'msc' it must be a positive number ";
        }
    }
    function extracted(format, y, m, d, h, M, s, accurate) {
        let _format = format;
        let formatStr = ['y', 'm', 'd', 'h', 'M', 's'];
        [y, m, d, h, M, s].forEach((item, idx) => {
            _format = _format.replace(formatStr[idx], `${item && accurate > idx ? item : '00'}`);
        });
        let raw = _format.match(/\[(.*?)]/g);
        raw.forEach(item => {
            let temp = item.slice(1, -1);
            _format = temp.startsWith('00') ? _format.replace(item, '') : _format.replace(item, temp);
        })
        return _format;
    }
    /**
     * 函数的执行时间
     * @param func
     */
    function printExecTime(func) {
        console.time(`${func.name.trim().length === 0 ? '匿名' : func.name}函数的执行时间:`);
        func();
        console.timeEnd(`${func.name.trim().length === 0 ? '匿名' : func.name}函数的执行时间:`);
        console.log('----------------------------');
    }

    return {
        countRemainingTime,
        parseTime,
        printExecTime
    }
})();
