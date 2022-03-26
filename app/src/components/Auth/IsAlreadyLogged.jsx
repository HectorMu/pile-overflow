import { Navigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

const IsAlreadyLogged = ({ view: View }) => {
  const { user } = useContext();
  if (user !== null) return <Navigate to="/notes" replace={true} />;
  return <View />;
};

export default IsAlreadyLogged;
