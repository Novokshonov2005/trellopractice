import { useNavigate } from "react-router-dom";
import {
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { IconWithTooltip } from "./IconWithTooltip";
import { useAuth } from "../AuthContext";

const iconBtn =
  "rounded p-2 text-white/70 transition hover:bg-white/10 hover:text-white";

const HELP_TOOLTIP =
  "Подсказка: доски создаются на главной. Колонки и карточки редактируются на доске. Поиск досок — в поле сверху.";

const NOTIFY_TOOLTIP =
  "Уведомлений пока нет. Здесь будут упоминания и события по вашим доскам.";

function initialFromEmail(email) {
  if (!email || typeof email !== "string") return "?";
  const ch = email.trim().charAt(0);
  return ch ? ch.toUpperCase() : "?";
}
export function UserToolbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const initial = initialFromEmail(user?.email);

  function handleLogout() {
    if (!window.confirm("Выйти из аккаунта?")) return;
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      <IconWithTooltip text={NOTIFY_TOOLTIP}>
        <button
          type="button"
          className={iconBtn}
          aria-label="Уведомления"
        >
          <IoNotificationsOutline size={20} aria-hidden />
        </button>
      </IconWithTooltip>
      <IconWithTooltip text={HELP_TOOLTIP}>
        <button type="button" className={iconBtn} aria-label="Справка">
          <IoHelpCircleOutline size={20} aria-hidden />
        </button>
      </IconWithTooltip>
      <span className="mx-1 hidden h-6 w-px bg-white/15 sm:block" aria-hidden />
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#579dff] text-sm font-semibold text-white"
        title={user?.email ?? "Профиль"}
      >
        {initial}
      </div>
      <button
        type="button"
        className={iconBtn}
        aria-label="Выйти из аккаунта"
        onClick={handleLogout}
      >
        <IoLogOutOutline size={20} aria-hidden />
      </button>
    </div>
  );
}
