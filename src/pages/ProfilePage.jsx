import { useState } from "react";
import { useAuth } from "../components/AuthContext"
import { FilesAsDataUrls } from "../utils/FilesAsDataUrls";

export function ProfilePage() {
  const { user, changePassword, appBackground, setAppBackground } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [nextPassword2, setNextPassword2] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });

  async function handleBackgroundPick(e) {
    const { files } = e.target;
    if (!files?.length) return;
    const [url] = await FilesAsDataUrls([files[0]]);
    setAppBackground(typeof url === "string" ? url : "");
    setStatus({ type: "success", text: "Фон приложения обновлен." });
    e.target.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    if (nextPassword !== nextPassword2) {
      setStatus({ type: "error", text: "Новые пароли не совпадают." });
      return;
    }

    const result = changePassword(currentPassword, nextPassword);
    if (!result.ok) {
      setStatus({ type: "error", text: result.error });
      return;
    }

    setCurrentPassword("");
    setNextPassword("");
    setNextPassword2("");
    setStatus({ type: "success", text: "Пароль успешно обновлен." });
  }

  return (
    <div className="relative flex flex-1 flex-col items-center px-4 py-10 sm:px-6 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/40"
        aria-hidden
      />
      <div className="relative z-1 w-full max-w-2xl">
        <div className="rounded-2xl border border-white/15 bg-[#1d2125]/55 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:rounded-3xl md:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Личный кабинет
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80">
            Email: <span className="font-medium text-white">{user?.email}</span>
          </p>

          <section className="mt-6 max-w-lg rounded-xl border border-white/10 bg-black/20 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Фон приложения
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Можно загрузить свою картинку для заднего фона.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <label className="cursor-pointer rounded-md bg-[#579dff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6cabff]">
                Выбрать изображение
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBackgroundPick}
                />
              </label>
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm text-white/85 hover:bg-white/10"
                onClick={() => {
                  setAppBackground("");
                  setStatus({ type: "success", text: "Фон сброшен к стандартному." });
                }}
              >
                Сбросить фон
              </button>
            </div>
            {appBackground ? (
              <p className="mt-2 text-xs text-white/60">Пользовательский фон активен.</p>
            ) : (
              <p className="mt-2 text-xs text-white/60">Используется стандартный фон.</p>
            )}
          </section>

          <form className="mt-8 flex max-w-lg flex-col gap-4" onSubmit={handleSubmit}>
            {status.text ? (
              <p
                className={
                  status.type === "error"
                    ? "rounded-lg border border-red-400/40 bg-red-500/15 px-3 py-2 text-sm text-red-200"
                    : "rounded-lg border border-emerald-400/35 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200"
                }
                role="status"
              >
                {status.text}
              </p>
            ) : null}

            <label className="flex flex-col gap-1.5 text-sm text-white/90">
              Текущий пароль
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="min-h-11 rounded-xl border border-white/15 bg-black/35 px-4 text-[15px] text-white outline-none ring-0 transition placeholder:text-white/45 focus:border-[#579dff]/55 focus:ring-2 focus:ring-[#579dff]/25"
                required
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-white/90">
              Новый пароль
              <input
                type="password"
                value={nextPassword}
                onChange={(e) => setNextPassword(e.target.value)}
                className="min-h-11 rounded-xl border border-white/15 bg-black/35 px-4 text-[15px] text-white outline-none ring-0 transition placeholder:text-white/45 focus:border-[#579dff]/55 focus:ring-2 focus:ring-[#579dff]/25"
                minLength={6}
                required
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm text-white/90">
              Повторите новый пароль
              <input
                type="password"
                value={nextPassword2}
                onChange={(e) => setNextPassword2(e.target.value)}
                className="min-h-11 rounded-xl border border-white/15 bg-black/35 px-4 text-[15px] text-white outline-none ring-0 transition placeholder:text-white/45 focus:border-[#579dff]/55 focus:ring-2 focus:ring-[#579dff]/25"
                minLength={6}
                required
              />
            </label>

            <button
              type="submit"
              className="mt-2 min-h-12 rounded-xl bg-[#579dff] px-4 text-[15px] font-semibold text-white shadow-lg shadow-[#579dff]/20 transition hover:bg-[#6cabff] hover:shadow-[#579dff]/30 active:scale-[0.98]"
            >
              Сменить пароль
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}