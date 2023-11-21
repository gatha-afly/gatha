import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFoundPage from "./pages/PageNotFoundPage/PageNotFoundPage";
import UserRegistrationPage from "./pages/UserRegistrationPage/UserRegistrationPage";
import UserLoginPage from "./pages/UserLoginPage/UserLoginPage";
import UserLogoutPage from "./pages/UserLogoutPage/UserLogoutPage";
import CreateGroupPage from "./pages/CreateGroupPage/CreateGroupPage";
import MainPage from "./pages/MainPage/MainPage";
import JoinGroupPage from "./pages/JoinGroupPage/JoinGroupPage";
import UserProvider from "./provider/UserProvider";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AddUserUponGroupCreationPage from "./pages/AddUserUponGroupCreationPage/AddUserUponGroupCreationPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <UserProvider>
          <Header />
          <Routes>
            {/* Unprotected routes */}
            <Route index element={<HomePage />} />
            <Route path='*' element={<PageNotFoundPage />} />
            <Route
              path='/user-registration'
              element={<UserRegistrationPage />}
            />
            <Route path='/user-login' element={<UserLoginPage />} />
            <Route path='/user-logout' element={<UserLogoutPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path='/main' element={<MainPage />} />
              <Route
                path='/add-user/:groupId/:userId'
                element={<AddUserUponGroupCreationPage />}
              />
              <Route path='/create-group' element={<CreateGroupPage />} />
              <Route path='/join-group' element={<JoinGroupPage />} />
              <Route path='/user-profile' element={<UserProfilePage />} />
            </Route>
          </Routes>
          <Footer />
        </UserProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
