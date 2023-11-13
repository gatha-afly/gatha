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
import InviteUserPage from "./pages/InviteUserPage/InviteUserPage";

function App() {
  return (
    <BrowserRouter>
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
        <Route path='/invite-user' element={<InviteUserPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
