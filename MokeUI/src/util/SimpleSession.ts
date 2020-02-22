function setSession(key: string, value: string | object): void {
    let result: string = typeof value === "object"
        ? window.JSON.stringify(value) //如果要存储对象，则先转为json串
        : value || "NONE";
    sessionStorage.setItem(key, result);
}

function getSession(key: string): any {
    const value = sessionStorage.getItem(key) || "NONE";//字符串或json串
    if (value === "NONE") {
        return;
    }
    if (isJson(value)) {
        return window.JSON.parse(value);
    }
    return value;
}

function isJson(str: string): boolean {
    try {
        window.JSON.parse(str);
        return true;
    } catch{
        return false;
    }
}

function clearSession(): void {
    sessionStorage.clear();
}

function hasKey(key: string): boolean {//session中是否存在指定key
    return getSession(key) ? true : false;
}

export default {
    setSession,
    getSession,
    clearSession,
    hasKey
}