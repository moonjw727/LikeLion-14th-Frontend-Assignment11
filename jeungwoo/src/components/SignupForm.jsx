import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/auth-context";

function SignupForm({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDone, setIsDone] = useState(false);
  const { signup } = useAuth();
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const success = signup(username, password);
    if (!success) {
      setIsDone(false);
      setMessage("이미 존재하는 아이디입니다.");
      return;
    }

    setIsDone(true);
    setMessage("가입이 완료되었습니다! 로그인 화면으로 이동합니다.");
    timerRef.current = setTimeout(() => onSwitchToLogin(), 1000);
  }

  return (
    <div className="auth-card p-6">
      <h1 className="text-lg font-semibold text-white">회원가입</h1>
      <p className="text-sm text-slate-400 mt-1 mb-6">
        사용할 아이디와 비밀번호를 정해 주세요.
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
          가입하기
        </button>
        {message && (
          <p
            className={`text-sm mt-3 ${
              isDone ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <p className="text-sm text-slate-400 mt-5">
        이미 계정이 있으신가요?{" "}
        <button type="button" className="auth-link" onClick={onSwitchToLogin}>
          로그인
        </button>
      </p>
    </div>
  );
}

export default SignupForm;
