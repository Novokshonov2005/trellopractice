import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "./Navitems";
import {
  selectAllBoards,
  selectFavoriteBoards,
  selectRecentBoards,
  toggleFavoriteAsync,
  touchRecentAsync,
} from "../../slices/boardSlice";

const dropLink =
  "block rounded py-1.5 text-left text-white/80 transition hover:bg-white/10 hover:text-white";
const starBtn =
  "ml-2 rounded px-1.5 py-0.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white";

export function MainNav() {
  const dispatch = useDispatch();
  const allBoards = useSelector(selectAllBoards);
  const recentBoards = useSelector(selectRecentBoards);
  const favoriteBoards = useSelector(selectFavoriteBoards);

  function openBoard(boardId) {
    dispatch(touchRecentAsync({ boardId }));
  }

  return (
    <nav className="flex shrink-0 items-center gap-1 sm:gap-3">
      <Navbar text="Рабочие пространства" showChevron>
        <span className="py-1 text-white/70">Личный кабинет</span>
        <span className="py-1 text-white/70">
          Всего досок: {allBoards.length}
        </span>
      </Navbar>
      <Navbar text="Недавние" showChevron>
        {recentBoards.length > 0 ? (
          recentBoards.map((board) => (
            <Link
              key={board.id}
              className={dropLink}
              to={`/board/${board.id}`}
              onClick={() => openBoard(board.id)}
            >
              {board.title || "Без названия"}
            </Link>
          ))
        ) : (
          <span className="py-1 text-white/70">Пока пусто</span>
        )}
      </Navbar>
      <Navbar variant="link" text="Избранное" showChevron>
        {allBoards.length > 0 ? (
          allBoards.map((board) => {
            const isFav = favoriteBoards.some((fav) => fav.id === board.id);
            return (
              <div key={board.id} className="flex items-center justify-between">
                <Link
                  className={dropLink}
                  to={`/board/${board.id}`}
                  onClick={() => openBoard(board.id)}
                >
                  {board.title || "Без названия"}
                </Link>
                <button
                  type="button"
                  className={starBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleFavoriteAsync({ boardId: board.id }));
                  }}
                >
                  {isFav ? "+" : "-"}
                </button>
              </div>
            );
          })
        ) : (
          <span className="py-1 text-white/70">Пока пусто</span>
        )}
      </Navbar>
    </nav>
  );
}
