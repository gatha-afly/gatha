import { useNavigate } from "react-router-dom";
import useUserContext from "../../../context/useUserContext";
import { useEffect } from "react";

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
