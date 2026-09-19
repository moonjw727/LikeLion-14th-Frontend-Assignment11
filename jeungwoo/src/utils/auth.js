import {setCookie, getCookie, deleteCookie} from './cookie.js';

const USERS_KEY = "users";

const CURRENT_USER_KEY = "currentUser";

function getUsers() {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


export function registerUser(username, password) {
    const users = getUsers();
    const exists =users.some((user) => user.username === username);
    if (exists) return false;

    users.push({ username, password });
    saveUsers(users);
    return true;
}

export function loginUser(username, password) {
    const users = getUsers();
    const found = users.find((user) => user.username === username && user.password === password);
    if (!found) return false;

    setCookie(
        CURRENT_USER_KEY,
        JSON.stringify({ username, loginAt: new Date().toISOString() }),
        1
    ); // 1일 동안 유지
    return true;
}

export function getCurrentUser() {
    const raw = getCookie(CURRENT_USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function logoutUser() {
    deleteCookie(CURRENT_USER_KEY);
}