import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  name: string;
  description: string[];
  demo?: string;
  github?: string;
  website?: string;
}

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <div className="mb-6 bg-indigo-50 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-indigo-700">{project.name}</h3>
      <p className="text-gray-600 flex items-center">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline flex items-center"
          >
            <FaGithub className="mr-2" /> GitHub
          </a>
        )}
        {project.github && project.demo && <span className="mx-2">|</span>}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline flex items-center"
          >
            <FaExternalLinkAlt className="mr-2" /> Demo
          </a>
        )}
      </p>
      <ul className="list-disc list-inside mt-2">
        {project.description.map((desc, idx) => (
          <li key={idx} className="text-gray-800">
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectItem;
