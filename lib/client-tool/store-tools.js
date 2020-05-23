/**
 *Author: LX
 * Create  2020/5/23 11:04
 * Description:
 *  Cookie,Storage的封装
 *  在客户端浏览器的操作，非NodeJS服务端环境
 */
const {Type:{isArray}} = require('../custom-tool/object-tools.js');
const {toCamelCase} = require('../custom-tool/string-tools.js');
module.exports =(function () {
    /*Set*/
    /**
     *
     * @param key : String
     * @param value : String
     * @param options : Object
     *  {
     *      path :String,
     *      maxAge: Number,
     *      domain: String,
     *      expires: Number => timestamp
     *      httpOnly: Boolean,
     *      secure: Boolean,
     *      sameSite: Lax, Strict, None ,others  as  Strict
     *  }
     */
    function setCookie(key, value = '', options = {}) {
        if (key) {
            document.cookie = parseCookieOptions(key, value, options);
        }
    }
    function parseCookieOptions(key, value, options) {
        let raw = `${key}=${value}; `
        Object.keys(options).forEach(item => {
            switch (item.toLowerCase().replace('-', '')) {
                case 'path':
                    raw +=  `Path=${options[item]}; `
                    break;
                case 'maxage': // seconds
                    raw +=  `Max-Age=${options[item]}; `
                    break;
                case 'domain':
                    raw += `Domain=${options[item]}; `;
                    break;
                case 'expires': // UTC time
                    raw += `Expires=${+new Date(options[item])}; `;
                    break;
                case 'httponly':
                    raw += options[item] ? 'HttpOnly; ' : '';
                    break;
                case 'secure':
                    raw += options[item] ? 'Secure; ' : '';
                    break;
                case 'samesite':
                    if (['strict', 'lax', 'none'].includes(options[item])) {
                        raw += `SameSite=${toCamelCase(options[item])};`;
                    } else {
                        raw += `SameSite=Strict;`;
                    }
                    break;
                default:
            }
        })
        return raw
    }

    /**
     * 传入一个数组，数组元素格式遵循：
     *  {
     *      key:String
     *      value:String
     *      options:Object
     *  }
     * @param objArray : Array
     */
    function setCookies(objArray) {
        if (isArray(objArray)) {
            objArray.forEach(item=>{
                setCookie(item.key,item.value,item.options);
            })
        }
    }

    /**
     * @param key : String
     * @param value : String
     */
    function setLocal(key,value) {
        localStorage.setItem(key, value);
    }

    /**
     * @param key : String
     * @param value : String
     */
    function setSession(key, value) {
        sessionStorage.setItem(key, value);
    }

    /*Get*/
    /**
     * 获取Cookie
     * @param key : String
     * @returns {Array}
     *   Why returns Array?
     *      相同的Cookie的key值，但options不同，它们就是不同的，就会返回多个Cookie
     * @throws Error
     *      浏览器禁用了Cookie，则抛出异常
     */
    function getCookie(key) {
        if (navigator.cookieEnabled) {
            let cookies = document.cookie;
            return parseEntry(cookies, key);
        }else {
            throw new Error('Cookies are disabled');
        }
    }
    function parseEntry(cookies, key) {
        let values = [];
        if (cookies.length > 0) {
            let iter = cookies.matchAll(new RegExp(`${key}+?=(\\S*)($|;)`, 'g'))
            for (const iterElement of iter) {
                values.push(iterElement[1]);
            }
        }
        return values
    }

    /**
     * 获取多个Cookie
     * @param keyArray : Array
     * @returns {Array}
     */
    function getCookies(keyArray) {
        let values = [];
        if (isArray(keyArray)) {
            keyArray.forEach(item=>{
                values.push(getCookie(item));
            })
        }
        return values;
    }

    /**
     * @param key : String
     * @returns {string}
     */
    function getLocal(key) {
        return localStorage.getItem(key);
    }
    /**
     * @param key : String
     * @returns {string}
     */
    function getSession(key) {
        return sessionStorage.getItem(key);
    }

    /**
     * @param key : String
     * @param options : Object
     *      可选
     */
    function removeCookie(key, options = {}) {
        setCookie(key, '', {...options, maxAge: 0});
    }

    /**
     * 传入一个数组，数组元素遵循
     *  {
     *      key:String
     *      options:Object
     *  }
     * @param keyArray : Array
     */
    function removeCookies(keyArray) {
        if (isArray(keyArray)) {
            keyArray.forEach(item=>{
                removeCookie(item.key,item.options)
            })
        }
    }
    /**
     * @param key : String
     * @returns {string}
     */
    function removeLocal(key) {
        localStorage.removeItem(key)
    }
    /**
     * @param key : String
     * @returns {string}
     */
    function removeSession(key) {
        sessionStorage.removeItem(key);
    }
    function removeAllLocal() {
        localStorage.clear();
    }
    function removeAllSession() {
        sessionStorage.clear();
    }

    return {
        setCookie,
        setCookies,
        setLocal,
        setSession,
        getCookie,
        getCookies,
        getLocal,
        getSession,
        removeCookie,
        removeAllLocal,
        removeAllSession,
        removeSession,
        removeLocal,
        removeCookies,
    }
})()

