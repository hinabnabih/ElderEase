import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import HomePage from "./home/HomePage";
import AvailableDayListPage from "./availableDay/AvailableDayListPage.tsx";
import './App.css';
import { Container } from "react-bootstrap";
import NavMenu from "./shared/NavMenu";

function App() {
  return (
    <>
    <NavMenu />
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/available-days" element={<AvailableDayListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </Container>
    </>
  )
}
export default App;
