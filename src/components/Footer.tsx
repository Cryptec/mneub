import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="#home" className="logo">MN</a>
            <p>Softwareentwickler & Technologie-Enthusiast</p>
          </div>
          
          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/" className="footer-link">Über mich</Link></li>
              <li><Link to="/" className="footer-link">Projekte</Link></li>
              <li><Link to="/" className="footer-link">Kontakt</Link></li>
              <li><Link to="/impressum" className="footer-link">Impressum</Link></li>
              <li><Link to="/datenschutz" className="footer-link">Datenschutz</Link></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Social Media</h4>
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
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Martin Neubauer. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
