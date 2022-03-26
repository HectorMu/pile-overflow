import Aos from "aos";
import { useEffect } from "react";
import "../../node_modules/aos/dist/aos.css";
import "../../node_modules/sweetalert2/dist/sweetalert2.css";
import "./css/main.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Global/Layout";
import Template from "./routes/Template";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<IsAlreadyLogged view={Index} />} /> */}
          {/* <Route path="/home" element={<IsLoggedIn view={Home} />} /> */}
          {Template.dev.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
      <Toaster />
    </div>
  );
}

export default App;
