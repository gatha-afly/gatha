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
import UserProvider from "./provider/UserProvider";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import ProtectedRoutes from "./components/auth/ProtectedRoutes/ProtectedRoutes";
import MobileMessengerPage from "./pages/MobileMessengerPage/MobileMessengerPage";
import DesktopMainPage from "./pages/DesktopMainPage/DesktopMainPage";
import MobileMainPage from "./pages/MobileMainPage/MobileMainPage";

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
              <Route
                path='/main'
                element={
                  window.innerWidth <= 768 ? (
                    <MobileMainPage />
                  ) : (
                    <DesktopMainPage />
                  )
                }
              />
              <Route path='/user-profile' element={<UserProfilePage />} />
              <Route
                path='/messenger-mobile'
                element={<MobileMessengerPage />}
              />
            </Route>
          </Routes>
          <Footer />
        </UserProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
