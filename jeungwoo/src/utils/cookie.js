export function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

export function getCookie(name) {
    const prefix = `${name}=`;
    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith(prefix));
    if (!match) return null;
    try {
        return decodeURIComponent(match.slice(prefix.length));
    } catch {
        return null;
    }
}

export function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}
