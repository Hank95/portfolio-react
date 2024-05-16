import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface Project {
  name: string;
  description: string[];
}

interface Experience {
  company: string;
  location: string;
  title: string;
  date: string;
  projects: Project[];
}

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="mb-6 bg-indigo-50 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-indigo-700">
        {experience.title} - {experience.company}
      </h3>
      <p className="text-gray-600">
        {experience.location} | {experience.date}
      </p>
      {experience.projects.map((project, index) => (
        <div key={index} className="mt-4">
          <h4 className="text-lg font-semibold text-indigo-600">
            {project.name}
          </h4>
          <ul className="list-disc list-inside">
            {project.description.map((desc, idx) => (
              <li key={idx} className="text-gray-800 flex items-center">
                <FaCheckCircle className="mr-2 text-indigo-500" /> {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceItem;
