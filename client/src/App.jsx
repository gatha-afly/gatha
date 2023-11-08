import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./common/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./common/Footer/Footer";
import PageNotFoundPage from "./pages/PageNotFoundPage/PageNotFoundPage";
import UserRegistrationPage from "./pages/UserRegistrationPage/UserRegistrationPage";
import UserLoginPage from "./pages/UserLoginPage/UserLoginPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='*' element={<PageNotFoundPage />} />
        <Route path='/user-registration' element={<UserRegistrationPage />} />
        <Route path='/user-login' element={<UserLoginPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
