/**
 * Author: LX
 * Create  2020/5/23 15:04
 * Description:
 *  字符串处理工具
 */
module.exports = (function () {
    /**
     * 将字符串中的单词转为 camel-case
     * @param str
     * @returns {string}
     */
   function toCamelCase(str) {
       return String(str).replace(/\w+/g, (item) => {
           return item[0].toUpperCase() + item.slice(1).toLowerCase();
       });
   }
   return {toCamelCase}
})()
