import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ProtectRoute from "./util/ProtectRoute";
import NavBar from "./components/NavBar";
const Home = lazy(() => import("./page/Home"));
const Contact = lazy(() => import("./page/Contact"));
const SignIn = lazy(() => import("./page/SignIn"));
const SignUp = lazy(() => import("./page/SignUp"));
const Schedule = lazy(() => import("./page/Schedule"));
const About = lazy(() => import("./page/About"));
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ProtectRoute />}>
          <Route path="/schedule/:userId" element={<Schedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
