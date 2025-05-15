import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiInstagram, FiFacebook, FiMail, FiArrowRight, FiImage } from 'react-icons/fi';
import Button from './Button';
import './Hero.css';
import BannerImage from '../assets/hero-banner.jpg'; // Make sure to add your banner image to this path

const Hero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-banner">
        <img src={BannerImage} alt="" aria-hidden="true" />
      </div>
      <div className="hero-pattern" aria-hidden="true"></div>
      <div className="container">
        <motion.div 
          className="hero-content"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.span 
            className="hero-greeting"
            variants={itemVariants}
          >
            Willkommen in meiner
          </motion.span>
          
          <motion.h1 
            className="hero-title"
            variants={itemVariants}
          >
            <span className="highlight">Schreinerei</span>
          </motion.h1>
          
          <motion.h2 
            className="hero-subtitle"
            variants={itemVariants}
          >
            <span className="typing-text">Handgefertigte Möbel & individuelle Holzarbeiten</span>
          </motion.h2>
          
          <motion.p 
            className="hero-description"
            variants={itemVariants}
          >
            Als leidenschaftlicher Schreiner mit jahrelanger Erfahrung fertige ich einzigartige Möbelstücke 
            und Holzarbeiten in höchster Qualität. Jedes Stück wird mit Liebe zum Detail und unter Verwendung 
            ausgewählter Hölzer in meiner Werkstatt gefertigt.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <Button 
              variant="primary" 
              href="#contact"
              endIcon={<FiArrowRight />}
            >
Anfrage senden
            </Button>
            <Button 
              variant="outline" 
              href="#projects"
            >
Meine Arbeiten
            </Button>
          </motion.div>
          
          <motion.div 
            className="social-links"
            variants={itemVariants}
          >
            <a href="https://www.instagram.com/ihr_benutzername" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <FiInstagram />
            </a>
            <a href="https://www.pinterest.de/ihr_benutzername" target="_blank" rel="noopener noreferrer" aria-label="Bildergalerie" title="Bildergalerie">
              <FiImage />
            </a>
            <a href="https://www.facebook.com/ihr_benutzername" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
              <FiFacebook />
            </a>
            <a href="mailto:ihre.email@beispiel.com" aria-label="Email" title="Email">
              <FiMail />
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 1.5 }
        }}
      >
        <span>Scrollen</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
