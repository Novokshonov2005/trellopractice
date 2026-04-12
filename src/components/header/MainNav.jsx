import { Link } from "react-router-dom";
import { Navbar } from "../Navitems";

const dropLink =
  "block rounded py-1.5 text-left text-white/80 transition hover:bg-white/10 hover:text-white";

export function MainNav() {
  return (
    <nav className="flex shrink-0 items-center gap-1 sm:gap-3">
      <Navbar text="Рабочие пространства" showChevron>
        <span className="py-1 text-white/70">Пространство 1</span>
        <span className="py-1 text-white/70">Пространство 2</span>
      </Navbar>
      <Navbar text="Недавние">
        <Link className={dropLink} to="/board/demo">
          Доска
        </Link>
      </Navbar>
      <Navbar variant="link" text="Избранное" />
      <button
        type="button"
        className="ml-1 rounded bg-[#579dff] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#6cabff] active:scale-[0.98]"
      >
        Создать
      </button>
    </nav>
  );
}
