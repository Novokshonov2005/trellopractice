import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { AppHeader } from "./components/header/AppHeader";
import { Wrapper } from "./components/wrapper";
import { BoardPage } from "./pages/BoardPage";
import { HomePage } from "./pages/HomePage";

function BoardRoute() {
  const { boardId } = useParams();
  return <BoardPage key={boardId} />;
}

function App() {
  return (
    <BrowserRouter>
      <Wrapper className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex min-h-0 flex-1 flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/board/:boardId" element={<BoardRoute />} />
          </Routes>
        </main>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
