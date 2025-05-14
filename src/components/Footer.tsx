import './Footer.css';

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
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Über mich</a></li>
              <li><a href="#projects">Projekte</a></li>
              <li><a href="#contact">Kontakt</a></li>
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
