import NavBar from "../components/NavBar";
import "./FunHome.css";

export default function FuncionarioHome() {
  return (
    <div className="func-container">
      <NavBar />

      <div className="func-content">
        <div className="banner-func"></div>

        <h1 className="title-func">Bem-Vindo a Lustrious</h1>

        <footer className="footer-func">
          <div>
            <p>(55) 11 14323-2342</p>
            <p>LUSTROUS@GMAIL.COM</p>
          </div>

          <p>DIREITOS AUTORAIS</p>

          <div className="social">
            <i className="ri-instagram-fill"></i>
            <i className="ri-linkedin-box-fill"></i>
            <i className="ri-whatsapp-fill"></i>
          </div>
        </footer>
      </div>
    </div>
  );
}
