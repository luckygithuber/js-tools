/**
 * Author: LX
 * Create  2020/3/22 1:04
 * Description:
 *      对数组的操作
 */

module.exports = (function () {
    /**
     * 确保传入的数组中的元素都是不同的数值
     * @param arrayLike
     * @returns {Array}
     */
    function unique (arrayLike) {
        if(!arrayLike || !arrayLike.length) return [];
        var res = [];
        for (var i = 0; i < arrayLike.length; i++) {
            if (res.indexOf(arrayLike[i]) === -1) {
                res.push(arrayLike[i]);
            }
        }
        return res
    }
    return {
        unique
    }
})();
