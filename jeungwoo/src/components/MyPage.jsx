import { useAuth } from "../context/auth-context";

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-white/5 last:border-b-0">
      <dt className="text-slate-400 whitespace-nowrap">{label}</dt>
      <dd className="text-slate-100 whitespace-nowrap">{value}</dd>
    </div>
  );
}

function MyPage() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  const loginAt = formatDate(currentUser.loginAt);

  return (
    <div className="auth-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-white">마이페이지</h1>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 whitespace-nowrap">
          로그인 중
        </span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white bg-gradient-to-br from-indigo-500 to-sky-500 shadow-lg shadow-indigo-500/30">
          {currentUser.username.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-base font-medium text-white truncate">
            {currentUser.username}
          </p>
          <p className="text-sm text-slate-400">환영합니다!</p>
        </div>
      </div>

      <dl className="text-sm rounded-xl bg-white/5 border border-white/5 px-3.5 py-1 mb-6">
        <InfoRow label="아이디" value={currentUser.username} />
        {loginAt && <InfoRow label="로그인 시각" value={loginAt} />}
        <InfoRow label="로그인 유지" value="1일" />
      </dl>

      <button className="auth-button ghost" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
}

export default MyPage;
