import './Footer.css';
import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';

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
            <div className="social-links" style={{ marginTop: 0 }}>
              <a href="https://github.com/martin-neubauer" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link">
                <FiInstagram />
              </a>
              <a href="https://linkedin.com/in/martin-neubauer" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
                <FiLinkedin />
              </a>
              <a href="mailto:martin.neubauer@example.com" aria-label="Email" className="social-link">
                <FiMail />
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
