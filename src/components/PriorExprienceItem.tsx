import React from "react";
import { FaBriefcase } from "react-icons/fa";

interface PriorExperience {
  company: string;
  location: string;
  title: string;
  date: string;
  description: string[];
}

interface PriorExperienceItemProps {
  experience: PriorExperience;
}

const PriorExperienceItem: React.FC<PriorExperienceItemProps> = ({
  experience,
}) => {
  return (
    <div className="mb-6 bg-indigo-50 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-indigo-700 flex items-center">
        <FaBriefcase className="mr-2" /> {experience.title} -{" "}
        {experience.company}
      </h3>
      <p className="text-gray-600">
        {experience.location} | {experience.date}
      </p>
      <ul className="list-disc list-inside mt-2">
        {experience.description.map((desc, idx) => (
          <li key={idx} className="text-gray-800">
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriorExperienceItem;
