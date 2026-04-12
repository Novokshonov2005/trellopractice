import { Brand } from "./Brand";
import { BoardSearch } from "./BoardSearch";
import { MainNav } from "./MainNav";
import { UserToolbar } from "./Toolbar";

export function AppHeader() {
  return (
    <>
      <header className="flex h-12 min-h-12 items-center gap-4 bg-[#1d2125] px-3 text-white">
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <Brand />
          <MainNav />
          <div className="mx-4 hidden min-w-0 flex-1 justify-center md:flex">
            <BoardSearch className="max-w-xl" />
          </div>
        </div>
        <UserToolbar />
      </header>

      <div className="bg-[#1d2125] px-3 py-2 md:hidden">
        <BoardSearch />
      </div>
    </>
  );
}
