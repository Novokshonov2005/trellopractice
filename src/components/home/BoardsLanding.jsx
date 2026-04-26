import { BoardCreateBar } from "./BoardCreateBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllBoards, touchRecentAsync } from "../../slices/boardSlice";

export function BoardsLanding() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/40"
        aria-hidden
      />

      <div className="relative z-1 w-full max-w-xl md:max-w-2xl">
        <div className="rounded-2xl border border-white/15 bg-[#1d2125]/55 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10 md:rounded-3xl">
          <header className="sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl text-center">
              Доски
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/80 sm:mx-0 md:text-base">
              Выберите доску или создайте новую.
            </p>
          </header>

          <div className="mt-8 md:mt-10">
            <BoardCreateBar />
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Созданные доски
            </h2>
            {boards.length > 0 ? (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {boards.map((board) => (
                  <Link
                    key={board.id}
                    to={`/board/${board.id}`}
                    className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                    onClick={() => dispatch(touchRecentAsync({ boardId: board.id }))}
                  >
                    {board.title || "Без названия"}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-white/50">
                Пока нет созданных досок.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
