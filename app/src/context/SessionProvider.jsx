import React, { useState } from "react";

export const Session = React.createContext();
function SessionProvider({ children }) {
  const userData = JSON.parse(window.localStorage.getItem("POSession"));
  const [user, setUser] = useState(userData);

  const closeSession = () => {
    window.localStorage.removeItem("POSession");
    setUser(null);
  };

  return (
    <Session.Provider value={{ user, setUser, closeSession }}>
      {children}
    </Session.Provider>
  );
}

export default SessionProvider;
