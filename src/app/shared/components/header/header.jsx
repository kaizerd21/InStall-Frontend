import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="bg-green-700 h-12 flex justify-end items-center px-5">
      <div>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}
