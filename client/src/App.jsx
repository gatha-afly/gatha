import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./common/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./common/Footer/Footer";
import PageNotFoundPage from "./pages/PageNotFoundPage/PageNotFoundPage";
import UserRegistrationPage from "./pages/UserRegistrationPage/UserRegistrationPage";
import UserLoginPage from "./pages/UserLoginPage/UserLoginPage";
import AddUserPage from "./pages/AddUserPage/AddUserPage";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import MainPage from "./pages/MainPage/MainPage";
import JoinGroupPage from "./pages/JoinGroupPage/JoinGroupPage";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='*' element={<PageNotFoundPage />} />
          <Route path='/user-registration' element={<UserRegistrationPage />} />
          <Route path='/user-login' element={<UserLoginPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/add-user' element={<AddUserPage />} />
          <Route path='/create-group' element={<CreateGroupPage />} />
          <Route path='/join-group' element={<JoinGroupPage />} />
        </Routes>
        <Footer />
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
