/**
 * Author: LX
 * Create  2020/3/22 1:04
 * Description:
 *      对数组的操作
 */

module.exports = (function () {
    /**
     * 确保传入的数组中的元素都是不同的数值
     * @param arrlike
     * @returns {Array}
     */
    function unique (arrlike) {
        if(!arrlike || !arrlike.length) return [];
        var res = [];
        for (var i = 0; i < arrlike.length; i++) {
            if (res.indexOf(arrlike[i]) === -1) {
                res.push(arrlike[i]);
            }
        }
        return res
    }
    return {
        unique
    }
})();
