import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Logoptions/Login";
import Registation from "./components/Logoptions/Registation";
import { Profile } from "./components/Profile/Profile";
import Notifications from "./components/Notifications/Notifications";
import Header from "./components/Home/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ErrorPage from "./components/Error/ErrorPage";
import ForgotPassword from "./components/Logoptions/ForgotPassword";
import ConfirmPassword from "./components/Logoptions/ConfirmPassword";

import ChatPage from "./components/Chat/ChatPage";

import MessageBody from "./components/Chat/MessageBody";
import { useSelector } from "react-redux";
import MessageBodyMobile from "./components/Chat/ChatBodyMobile";
import usePageHeight from "./components/hooks/usePageHeight";
import FixedHeader from "./components/Home/FixedHeader";
import SinglePost from "./components/Feed/SinglePost";
import AddFriend from "./components/AddFriend/AddFriend";

function App() {
  const { windowWidth } = useSelector((state) => state.tokenStatus);

  // calculate height

  const { scrollPosition } = usePageHeight();

  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              element={
                <>
                  {scrollPosition > 1000 && (
                    <FixedHeader positionH={scrollPosition} />
                  )}

                  <Header />
                  <Profile />
                </>
              }
              path="/profile/:id"
            />
            <Route
              element={
                <>
                  {scrollPosition > 1000 && (
                    <FixedHeader positionH={scrollPosition} />
                  )}
                  <Header />
                  <Home />
                </>
              }
              path="/"
              exact
            />
            <Route
              element={
                <>
                  {scrollPosition > 1000 && (
                    <FixedHeader positionH={scrollPosition} />
                  )}
                  <Header />
                  <Notifications />
                </>
              }
              path="/notifications"
            />
            <Route
              element={
                <>
                  <Header />
                  <ChatPage />
                </>
              }
              path="/chat"
            />
            <Route
              element={
                <>
                  <Header />
                  <AddFriend />
                </>
              }
              path="/add-friend"
            />
            <Route
              element={
                <>
                  <Header />
                  {windowWidth > 640 ? <MessageBody /> : <MessageBodyMobile />}
                </>
              }
              path="/chat/:id"
            />
            <Route
              element={
                <>
                  {scrollPosition > 1000 && (
                    <FixedHeader positionH={scrollPosition} />
                  )}
                  <Header />
                  <SinglePost />
                </>
              }
              path="/post/:id"
            />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<ForgotPassword />} path="/forget-password" />
          <Route element={<ConfirmPassword />} path="/confirm-password" />
          <Route element={<ErrorPage />} path="/*" />
          <Route element={<Registation />} path="/registation" />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// https://github.com/Learn-with-Sumit/rnext/tree/5.21
