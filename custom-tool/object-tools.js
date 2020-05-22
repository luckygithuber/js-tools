/**
 * Author: LX
 * Create  2020/3/22 1:46
 * Description:
 *      判断类型，替代instanceof，typeof操作符号
 */
module.exports = (function () {
    /**
     * 作为函数执行，将返回传入参数的类型
     * 使用Type.isXXX判断是否是某个类型
     * @param o
     * @returns {string}
     */

    function Type(o) {
        let s = Object.prototype.toString.call(o);
        // 非贪婪: (.*?)
        return s.match(/\[object (.*?)]/)[1].toLowerCase();
    }
    Type=(function (Type) {
        [   'Null',
            'Undefined',
            'Object',
            'Array',
            'String',
            'Number',
            'Boolean',
            'Function',
            'RegExp',
            'Date'
        ].forEach( (t)=>{
            Type['is' + t] = (o) => {
                return Type(o) === t.toLowerCase();
            };
        });
        return Type
    })(Type)

    return {
        Type
    }
})();
