import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  themeColor: string; // Tailwind text color class
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, themeColor, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onClick(project)}
      className="flex flex-col bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden group hover:border-white/10 transition-all cursor-pointer"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies.map((tech) => (
            <span 
              key={tech} 
              className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-white/5 rounded text-neutral-500"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <h3 className={`text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform ${themeColor}`}>
          {project.title}
        </h3>
        
        <p className="text-sm text-neutral-400 font-light leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
