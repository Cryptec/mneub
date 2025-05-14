import { useState } from 'react';
import './Projects.css';

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github: string;
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Projekt 1',
      description: 'Eine kurze Beschreibung des ersten Projekts. Dies ist ein Beispiel für ein Projekt, das ich entwickelt habe.',
      tags: ['React', 'TypeScript', 'Node.js'],
      image: 'https://via.placeholder.com/600x400',
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Projekt 2',
      description: 'Eine kurze Beschreibung des zweiten Projekts. Dies ist ein weiteres Beispiel für meine Arbeit.',
      tags: ['Vue.js', 'Firebase', 'SCSS'],
      image: 'https://via.placeholder.com/600x400',
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Projekt 3',
      description: 'Eine kurze Beschreibung des dritten Projekts. Dies zeigt meine Fähigkeiten in der Webentwicklung.',
      tags: ['Next.js', 'MongoDB', 'Tailwind'],
      image: 'https://via.placeholder.com/600x400',
      link: '#',
      github: '#'
    },
  ];

  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Meine Projekte</h2>
        
        <div className="filters">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${activeFilter === tag ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
