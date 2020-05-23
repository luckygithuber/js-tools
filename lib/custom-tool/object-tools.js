/**
 * Author: LX
 * Create  2020/3/22 1:46
 *  完成基本功能
 * Modified  2020/5/23 14:02
 *  重构结构，使得IDE能够显示Tips
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
    let Type = function (o) {
        let s = Object.prototype.toString.call(o);
        return s.match(/\[object (.*?)]/)[1].toLowerCase();
    }
    Type = (function (Type) {
        Type.isNull = (o)=>{};
        Type.isUndefined = (o)=>{};
        Type.isObject = (o)=>{};
        Type.isArray = (o)=>{};
        Type.isString = (o)=>{};
        Type.isNumber = (o)=>{};
        Type.isBoolean = (o)=>{};
        Type.isFunction = (o)=>{};
        Type.isRegExp = (o)=>{};
        Type.isFunction = (o)=>{};
        Type.isDate = (o) => {}
        Object.keys(Type).forEach((item) => {
            Type[item] = (o) => {
                return Type(o) === item.slice(2).toLowerCase();
            };
        });
        return Type
    })(Type);
    return {
        Type
    }
})()
