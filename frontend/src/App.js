import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import { Notification } from "./components/ui/Notification";

function App() {
  return (
    <>
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
