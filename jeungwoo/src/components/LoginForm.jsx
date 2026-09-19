import { useState } from "react";
import { useAuth } from "../context/auth-context";

function LoginForm({ onSwitchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const success = login(username, password);
    if (!success) {
      setMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div className="auth-card p-6">
      <h1 className="text-lg font-semibold text-white">로그인</h1>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        계정 정보를 입력해 주세요.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-1.5">아이디</label>
          <input
            className="auth-input"
            placeholder="아이디"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-xs text-slate-400 mb-1.5">비밀번호</label>
          <input
            className="auth-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className="auth-button" type="submit">
          로그인
        </button>
        {message && <p className="text-sm text-rose-400 mt-3">{message}</p>}
      </form>

      <p className="text-sm text-slate-400 mt-5">
        아직 계정이 없으신가요?{" "}
        <button type="button" className="auth-link" onClick={onSwitchToSignup}>
          회원가입
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
