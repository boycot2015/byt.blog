/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/
export const debounce = (func:()=> void, wait:number, immediate?:boolean) => {
    let timer:any;
    return function () {
        let args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait)
            if (callNow) func.apply(this, args as any)
        } else {
            timer = setTimeout(function() {
                func.apply(this, args as any)
            }, wait);
        }
    }
 }

 export function uuid () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] as any & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
}

export function decodeBase64(base64:string) {   
    // 创建一个缓冲区
    const buff = Buffer.from(base64, 'base64');

    // 将缓冲区解码为 UTF-8
    const str = buff.toString('utf-8');

    // 输出普通字符串
    console.log(str); // Base64 Encoding in Node.js
    return str
 }