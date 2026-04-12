import { BoardCreateBar } from "./BoardCreateBar";

export function BoardsLanding() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/40"
        aria-hidden
      />

      <div className="relative z-1 w-full max-w-xl md:max-w-2xl">
        <div className="rounded-2xl border border-white/15 bg-[#1d2125]/55 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10 md:rounded-3xl">
          <header className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm md:text-4xl">
              Доски
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/80 sm:mx-0 md:text-base">
              Выберите доску или создайте новую. Звезда — в избранное. Поиск — в
              шапке.
            </p>
          </header>

          <div className="mt-8 md:mt-10">
            <BoardCreateBar />
          </div>

          <p className="mt-8 text-center text-sm text-white/50 sm:text-left">
            Пока нет досок — создайте первую.
          </p>
        </div>
      </div>
    </div>
  );
}
