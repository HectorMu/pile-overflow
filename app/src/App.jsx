import Aos from "aos";
import { useEffect } from "react";
import "../../node_modules/aos/dist/aos.css";
import "../../node_modules/sweetalert2/dist/sweetalert2.css";
import "./css/main.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Global/Layout";
import AppRoutes from "./routes";
import Index from "./pages/Index";
import SessionProvider from "./context/SessionProvider";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <SessionProvider>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<IsAlreadyLogged view={Index} />} /> */}
          {/* <Route path="/home" element={<IsLoggedIn view={Home} />} /> */}
          <Route path={"/"} element={Index} />
          {AppRoutes.dev.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
      <Toaster />
    </SessionProvider>
  );
}

export default App;
