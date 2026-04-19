import { AppHeader } from "../header/AppHeader";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

export function AuthPrivateLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return (
    <>
      <AppHeader />
      <main className="flex min-h-0 flex-1 flex-col">
        <Outlet/>
      </main>
    </>
  );
}