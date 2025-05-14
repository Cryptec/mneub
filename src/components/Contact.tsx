import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<{
    status: 'idle' | 'sending' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ status: 'sending', message: 'Nachricht wird gesendet...' });

    try {
      // Replace with your form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({ 
        status: 'success', 
        message: 'Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.' 
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      setFormStatus({ 
        status: 'error', 
        message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.' 
      });
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Kontakt</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Lassen Sie uns in Kontakt treten</h3>
            <p>
              Haben Sie Fragen oder möchten Sie ein Projekt besprechen? Zögern Sie nicht, 
              mich zu kontaktieren. Ich freue mich darauf, von Ihnen zu hören!
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <i className="icon">✉️</i>
                <div>
                  <h4>E-Mail</h4>
                  <a href="mailto:ihre.email@beispiel.com">ihre.email@beispiel.com</a>
                </div>
              </div>
              
              <div className="contact-item">
                <i className="icon">🔗</i>
                <div>
                  <h4>LinkedIn</h4>
                  <a href="https://linkedin.com/in/ihr-profil" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/ihr-profil
                  </a>
                </div>
              </div>
              
              <div className="contact-item">
                <i className="icon">💻</i>
                <div>
                  <h4>GitHub</h4>
                  <a href="https://github.com/ihr-username" target="_blank" rel="noopener noreferrer">
                    github.com/ihr-username
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            {formStatus.status !== 'idle' && (
              <div className={`form-message ${formStatus.status}`}>
                {formStatus.message}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Nachricht</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn"
              disabled={formStatus.status === 'sending'}
            >
              {formStatus.status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
