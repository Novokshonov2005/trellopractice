import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const rawFrom = location.state?.from;
  const from =
    rawFrom && rawFrom !== "/login" && rawFrom !== "/register"
      ? rawFrom
      : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/40"
        aria-hidden
      />
      <div className="relative z-1 w-full max-w-md">
        <div className="rounded-2xl border border-white/15 bg-[#1d2125]/55 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:rounded-3xl md:p-10">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Вход в Tenma
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">
            Войдите, чтобы открыть личный кабинет и доски.
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            {error ? (
              <p
                className="rounded-lg border border-red-400/40 bg-red-500/15 px-3 py-2 text-sm text-red-200"
                role="alert"
              >
                {error}
              </p>
            ) : null}
            <label className="flex flex-col gap-1.5 text-sm text-white/90">
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-11 rounded-xl border border-white/15 bg-black/35 px-4 text-[15px] text-white outline-none ring-0 transition placeholder:text-white/45 focus:border-[#579dff]/55 focus:ring-2 focus:ring-[#579dff]/25"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-white/90">
              Пароль
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="min-h-11 rounded-xl border border-white/15 bg-black/35 px-4 text-[15px] text-white outline-none ring-0 transition placeholder:text-white/45 focus:border-[#579dff]/55 focus:ring-2 focus:ring-[#579dff]/25"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </label>
            <button
              type="submit"
              className="mt-2 min-h-12 rounded-xl bg-[#579dff] px-4 text-[15px] font-semibold text-white shadow-lg shadow-[#579dff]/20 transition hover:bg-[#6cabff] hover:shadow-[#579dff]/30 active:scale-[0.98]"
            >
              Войти
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Нет аккаунта?{" "}
            <Link
              to="/register"
              className="font-medium text-[#579dff] hover:underline"
            >
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}