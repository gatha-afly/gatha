import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserContext from "../../../context/useUserContext";

const UserLogout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useUserContext();

  useEffect(() => {
    navigate("/");

    logoutUser();
  }, []);
  return <></>;
};

export default UserLogout;
