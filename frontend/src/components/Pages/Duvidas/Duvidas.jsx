import { ShoppingCart, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Duvidas() {

    return (
        <div className="pagina-duvida">
        {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>

      <nav>
          <ul className="menu">
             <li>
            <Link to="/">INÍCIO</Link>
            </li>
            <li>
              <Link to="/produtos" >PRODUTOS</Link>
            </li>
            <li>
              <Link to="/duvidas">DUVIDAS</Link></li>
          </ul>
        </nav>

        <div className="icons">
          <Link to="/favoritos">
            <Heart size={22} strokeWidth={1.5} />
          </Link>
          <ShoppingCart size={22} strokeWidth={1.5} />
          <Link to="/login">
          <User size={22} strokeWidth={1.5} />
          </Link>
          
        </div>
      </header>
      {/* BANNER */}
      <div className="banner">
        <img src="/banner3.png" alt="banner" />
      </div>
              {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="lado-esquerdo">
            <p>(55) 11 14323-2342</p>
            <p>LUSTRIOUS@GMAIL.COM</p>
          </div>

        <div className="footer-icons">
          <a href="https://www.instagram.com/lustriousskincare/">
            <img src="/instagram.png" alt="Instagram" />
          </a>
          <a href="#">
            <img src="/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="#">
            <img src="/whatsapp.png" alt="WhatsApp" />
          </a>
        </div>
      </div>

        <div className="direitos-autorais">
          <p>&copy;DIREITOS AUTORAIS 2025</p>
        </div>
      </footer>
        </div>
    );
}