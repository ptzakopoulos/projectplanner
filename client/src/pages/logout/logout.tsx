import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
export default function Logout() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return <p>Loging out...</p>;
}
