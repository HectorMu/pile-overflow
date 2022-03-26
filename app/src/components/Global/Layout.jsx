import { useState } from "react";
import Navbar from "../../components/Navigation/Navbar";
import Sidebar from "../../components/Navigation/Sidebar";

export const Layout = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Navbar isActive={isActive} setIsActive={setIsActive} />
      <div className="wrapper">
        <Sidebar isActive={isActive} setIsActive={setIsActive} />

        <div className="content">{children}</div>
      </div>
    </>
  );
};
