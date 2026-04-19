import { Brand } from "../header/Brand";
import { useAuth } from "../AuthContext";
export function AuthGuestLayout({ children }) {
  return (
    <>
      <header className="flex h-12 min-h-12 items-center gap-4 bg-[#16191d] px-3 text-white">
        <Brand />
      </header>
      {children}
    </>
  );
}
