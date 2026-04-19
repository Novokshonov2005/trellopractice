import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { AppHeader } from "./components/header/AppHeader";
import { Wrapper } from "./components/wrapper";
import { BoardPage } from "./pages/BoardPage";
import { HomePage } from "./pages/HomePage";
import { AuthGuestLayout } from "./components/Auth/AuthGuestLayout";
import { AuthPrivateLayout } from "./components/Auth/AuthPrivateLayout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthProvider } from "./components/AuthContext";

function BoardRoute() {
  const { boardId } = useParams();
  return <BoardPage key={boardId} />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Wrapper className="flex min-h-screen flex-col">
          <Routes>
            <Route
              path="/login"
              element={
                <AuthGuestLayout>
                  <LoginPage />
                </AuthGuestLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthGuestLayout>
                  <RegisterPage />
                </AuthGuestLayout>
              }
            />
            <Route path="/" element={<AuthPrivateLayout />}>
              <Route index element={<HomePage />} />
              <Route path="board/:boardId" element={<BoardRoute />} />
            </Route>
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
