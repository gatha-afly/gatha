import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { setupAPIInterceptors } from "@api/userAPI";
import "@styles/App.css";
import Header from "@common/Header/Header";
import Footer from "@common/Footer/Footer";
import HomePage from "@pages/HomePage/HomePage";
import PageNotFoundPage from "@pages/PageNotFoundPage/PageNotFoundPage";
import UserRegistrationPage from "@pages/UserRegistrationPage/UserRegistrationPage";
import UserLoginPage from "@pages/UserLoginPage/UserLoginPage";
import UserProvider from "@provider/UserProvider";
import ProtectedRoutes from "@auth/ProtectedRoutes/ProtectedRoutes";
import MobileMessengerPage from "@pages/MobileMessengerPage/MobileMessengerPage";
import DesktopMainPage from "@pages/DesktopMainPage/DesktopMainPage";
import MobileMainPage from "@pages/MobileMainPage/MobileMainPage";
import UserLogoutPage from "@pages/UserLogoutPage/UserLogoutPage";

/**
 * Main component serving as the entry point for the application.
 * Configures routing using React Router and provides context through UserProvider.
 * Renders header & footer, and different pages based on the current route.
 *
 * @returns {React.Component} The rendered App component.
 */
function App() {
  useEffect(() => {
    setupAPIInterceptors();
  }, []);

  return (
    <HelmetProvider>
      <UserProvider>
        <Header />
        <Routes>
          {/* Unprotected routes */}
          <Route index element={<HomePage />} />
          <Route path="*" element={<PageNotFoundPage />} />
          <Route path="/user-registration" element={<UserRegistrationPage />} />
          <Route path="/user-login" element={<UserLoginPage />} />
          <Route path="/user-logout" element={<UserLogoutPage />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoutes />}>
            {/* Render main page depending on display size */}

            <Route
              path="/main"
              element={
                window.innerWidth <= 768 ? (
                  <MobileMainPage />
                ) : (
                  <DesktopMainPage />
                )
              }
            />
            <Route path="/messenger-mobile" element={<MobileMessengerPage />} />
          </Route>
        </Routes>
        <Footer />
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;
