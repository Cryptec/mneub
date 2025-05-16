import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: 'idle', message: '' });

    try {
      // Use the email endpoint
      const apiUrl = 'http://localhost:3001/api/contact';

      console.log('Attempting to send request to:', apiUrl);
      console.log('Request payload:', formData);

      let response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost:3000'
          },
          mode: 'cors',
          body: JSON.stringify(formData)
        });
        console.log('Received response status:', response.status);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
        console.error('Fetch error:', error);
        throw new Error(`Verbindung zum Server fehlgeschlagen: ${errorMessage}`);
      }

      // First check if we got a response at all
      if (!response) {
        throw new Error('Keine Antwort vom Server erhalten. Bitte überprüfen Sie Ihre Internetverbindung.');
      }

      // Check if response has content before trying to parse as JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      try {
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
          console.log('Parsed response data:', data);
        } else {
          // If the response is not JSON, get the text instead
          const text = await response.text();
          console.error('Non-JSON response:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: text
          });
          throw new Error(`Unerwartetes Antwortformat: ${response.status} ${response.statusText}`);
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        throw new Error('Fehler beim Verarbeiten der Serverantwort');
      }

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Vielen Dank für Ihre Nachricht! Ich melde mich bald bei Ihnen.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || `Serverfehler: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Beim Senden der Nachricht ist ein Fehler aufgetreten.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div 
          className="contact-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Kontaktieren Sie mich</h2>
          <p className="contact-description">
            Haben Sie Fragen oder möchten Sie ein Projekt besprechen? Schreiben Sie mir eine Nachricht und ich melde mich umgehend bei Ihnen zurück.
          </p>

          {status.type === 'success' && (
            <div className="alert alert-success">
              {status.message}
            </div>
          )}

          {status.type === 'error' && (
            <div className="alert alert-error">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="btn primary"
              disabled={isLoading}
            >
              {isLoading ? 'Wird gesendet...' : 'Nachricht senden'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
