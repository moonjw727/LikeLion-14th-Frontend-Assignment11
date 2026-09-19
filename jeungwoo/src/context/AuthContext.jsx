import { useState } from "react";
import { AuthContext } from "./auth-context.js";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../utils/auth.js";

export function AuthProvider({ children }) {
    // 쿠키를 첫 렌더 전에 읽어야 로그인 상태로 새로고침할 때 로그인 폼이 깜빡이지 않는다.
    const [currentUser, setCurrentUser] = useState(getCurrentUser);

    function login(username, password) {
        const success = loginUser(username, password);
        if (success) {
            setCurrentUser(getCurrentUser());
        }
        return success;
    }

    function signup(username, password) {
        return registerUser(username, password);
    }

    function logout() {
        logoutUser();
        setCurrentUser(null);
    }

    const value = { currentUser, login, signup, logout };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
