import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowRight } from 'react-icons/fi';
import Button from './Button';
import './Hero.css';

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
            Hallo, ich bin
          </motion.span>
          
          <motion.h1 
            className="hero-title"
            variants={itemVariants}
          >
            <span className="highlight">Martin Neubauer</span>
          </motion.h1>
          
          <motion.h2 
            className="hero-subtitle"
            variants={itemVariants}
          >
            <span className="typing-text">Softwareentwickler & Technologie-Enthusiast</span>
          </motion.h2>
          
          <motion.p 
            className="hero-description"
            variants={itemVariants}
          >
            Ich erstelle moderne Webanwendungen mit Fokus auf Benutzererlebnis und Performance. 
            Spezialisiert auf React, TypeScript und moderne Web-Technologien.
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
              Kontakt aufnehmen
            </Button>
            <Button 
              variant="outline" 
              href="#projects"
            >
              Meine Projekte
            </Button>
          </motion.div>
          
          <motion.div 
            className="social-links"
            variants={itemVariants}
          >
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="mailto:your.email@example.com" aria-label="Email">
              <FiMail />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              delay: 0.5, 
              type: 'spring', 
              stiffness: 100,
              damping: 15,
            } 
          }}
        >
          <div className="image-container">
            <div className="profile-image">
              {/* Replace with your image */}
              <div className="placeholder-text">
                <span>Ihr Bild hier</span>
              </div>
            </div>
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
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
