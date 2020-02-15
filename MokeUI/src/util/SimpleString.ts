function shortenLongString(str: string, max: number) {//缩减长字符串
    if (max <= 0) {
        max = 100;
    }
    if (str.length > max) return str.slice(0, max + 1) + "...";//注意slice截取开始标记到结束标记前一位的字符串。从0到max则参数为0，max+1
    return str;
}
function getStringLength(str: string) {//得到有效字符串长度,即只计算字母和汉字
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= 0x4e00 && str.charCodeAt(i) <= 0x9fbb) {
            //中文unicode编码范围0x4e00~0x9fbb
            len++;
        } else if (str.charCodeAt(i) >= 0x0041 && str.charCodeAt(i) <= 0x005a) {
            //小写字母Unicode编码范围
            len++;
        } else if (str.charCodeAt(i) >= 0x0061 && str.charCodeAt(i) <= 0x007a) {
            //大写字母
            len++;
        } else if (str.charCodeAt(i) >= 0x0030 && str.charCodeAt(i) <= 0x0039) {
            //数字
            len++;
        }
    }
    return len;
}
export default {
    shortenLongString,
    getStringLength
}