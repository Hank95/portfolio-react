import React from "react";
import { resume } from "../data/resume";
import Section from "./Section";
import ExperienceItem from "./ExperienceItem";
import ProjectItem from "./ProjectItem";
import PriorExperienceItem from "./PriorExprienceItem";
import { FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Resume: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-600">{resume.name}</h1>
        <p className="flex justify-center items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2" /> {resume.location}
        </p>
        <p className="flex justify-center items-center text-gray-700">
          <FaPhone className="mr-2" /> {resume.phone}
        </p>
        <p className="flex justify-center items-center text-gray-700">
          <FaEnvelope className="mr-2" />{" "}
          <a href={`mailto:${resume.email}`} className="underline">
            {resume.email}
          </a>
        </p>
        <p className="flex justify-center items-center text-gray-700">
          <FaGithub className="mr-2" />{" "}
          <a
            href={`https://github.com/${resume.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {resume.github}
          </a>
        </p>
        <h2 className="text-2xl mt-4 font-semibold text-gray-800">
          {resume.title}
        </h2>
        <p className="text-gray-600">{resume.summary}</p>
      </header>

      <Section title="Technical Skills">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(resume.technicalSkills).map(([skillType, skills]) => (
            <div key={skillType} className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-700">
                {skillType}
              </h3>
              <ul className="list-disc list-inside">
                {skills.map((skill) => (
                  <li key={skill} className="text-gray-800">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Professional Experience">
        {resume.professionalExperience.map((exp, index) => (
          <ExperienceItem key={index} experience={exp} />
        ))}
      </Section>

      <Section title="Technical Projects">
        {resume.technicalProjects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </Section>

      <Section title="Prior Work Experience">
        {resume.priorExperience.map((exp, index) => (
          <PriorExperienceItem key={index} experience={exp} />
        ))}
      </Section>

      <Section title="Education">
        {resume.education.map((edu, index) => (
          <div key={index} className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold text-indigo-700">
              {edu.school}
            </h3>
            <p className="text-gray-800">{edu.degree}</p>
            <p className="text-gray-600">{edu.location}</p>
            <p className="text-gray-600">{edu.date}</p>
          </div>
        ))}
      </Section>
    </div>
  );
};

export default Resume;
