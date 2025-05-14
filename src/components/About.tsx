import './About.css';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML5', 'CSS3',
    'Git', 'Responsive Design', 'UI/UX', 'Python', 'SQL', 'Docker'
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">Über mich</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Ich bin ein leidenschaftlicher Softwareentwickler mit Fokus auf moderne Webtechnologien. 
              Mit meiner Erfahrung in der Entwicklung benutzerzentrierter Anwendungen strebe ich danach, 
              intuitive und effiziente Lösungen für komplexe Probleme zu schaffen.
            </p>
            <p>
              Meine Reise in der Softwareentwicklung begann vor mehreren Jahren und seitdem habe ich 
              kontinuierlich meine Fähigkeiten erweitert, um mit den neuesten Technologien und Best 
              Practices Schritt zu halten.
            </p>
            <p>
              Wenn ich nicht gerade Code schreibe, verbringe ich gerne Zeit damit, neue Technologien 
              zu lernen, an Open-Source-Projekten zu arbeiten oder mich mit Gleichgesinnten auszutauschen.
            </p>
          </div>
          <div className="skills">
            <h3>Meine Fähigkeiten</h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
