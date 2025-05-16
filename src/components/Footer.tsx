import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; {currentYear} Martin Neubauer</p>
          </div>
          
          <div className="footer-center">
            <div className="social-links">
              <a href="https://github.com/ihr-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/ihr-profil" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com/ihr-username" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-right">
            <nav className="footer-nav">
              <Link to="/impressum" className="footer-link">Impressum</Link>
              <Link to="/datenschutz" className="footer-link">Datenschutz</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
