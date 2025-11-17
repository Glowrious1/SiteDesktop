import "./Navbar.css";
import { FaBoxes, FaUsers, FaUserTie, FaShoppingBag, FaCog } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <FaBoxes />, path: "/funcionario/home" },
    { icon: <FaUsers />, path: "/funcionario/clientes" },
    { icon: <FaUserTie />, path: "/funcionario/usuarios" },
    { icon: <FaShoppingBag />, path: "/funcionario/pedidos" },
    { icon: <FaCog />, path: "/funcionario/config" },
  ];

  return (
    <nav className="sidebar-func">
      <div className="logo-func">
        L
      </div>

      <div className="icons-func">
        {navItems.map((item, i) => (
          <button
            key={i}
            className={`icon-btn ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </nav>
  );
}
