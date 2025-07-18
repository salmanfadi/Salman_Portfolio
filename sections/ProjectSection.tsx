import Image from "next/image";
import { useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";

import ProjectCard from "@/components/ProjectCard";
import { useSection } from "context/section";
import useOnScreen from "hooks/useOnScreen";
import useScrollActive from "hooks/useScrollActive";

import kedieApp from "public/projects/kedia-app.webp";
import latieApp from "public/projects/latie.webp";
import timesheetApp from "public/projects/timesheet.webp";
import dailyMart from "public/projects/dailymart.webp";

const ProjectSection: React.FC = () => {
  const { theme } = useTheme();

  const sectionRef = useRef<HTMLDivElement>(null);

  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);

  // Set active link for project section
  const projectSection = useScrollActive(sectionRef);
  const { onSectionChange } = useSection();
  useEffect(() => {
    projectSection && onSectionChange!("projects");
  }, [onSectionChange, projectSection]);

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="project-title text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 122, 122)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Featured Projects</h2>
        </RoughNotation>
      </div>
      <span className="project-desc text-center block mb-4" ref={elementRef}>
        "Talk is cheap. Show me the code"? I got you. <br />
        Here are some of my projects you shouldn't misss
      </span>
      <div className="flex flex-wrap">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} index={index} project={project} />
        ))}
      </div>
      <div className="others text-center mb-16">
        Other projects can be explored in{" "}
        <a
          href="https://github.com/salman"
          className="font-medium underline link-outline text-marrsgreen dark:text-carrigreen whitespace-nowrap"
        >
          my github profile
        </a>
      </div>
    </section>
  );
};

const projects = [
  {
    title: "Kedia Seller App",
    type: "Frontend",
    image: (
      <Image
        src={kedieApp}
        sizes="100vw"
        fill
        alt="Kedia Seller App"
        className="transition-transform duration-500 hover:scale-105 object-contain p-4 bg-cardlight dark:bg-carddark rounded-xl"
      />
    ),
    desc: "A seller app created for a client using React Native. I single-handedly was able to create and deliver the app according to the client's need",
    tags: ["React Native", "Postman API", "AWS S3"],
    liveUrl: "https://github.com/salmanfadi/Kedia_seller",
    codeUrl: "https://github.com/salmanfadi/Kedia_seller",
    bgColor: "bg-[#9FD0E3]",
    githubApi: "",
  },
  {
    title: "Latie",
    type: "Frontend",
    image: (
      <Image
        src={latieApp}
        sizes="100vw"
        fill
        alt="Latie"
        className="transition-transform duration-500 hover:scale-105 object-contain p-4 bg-cardlight dark:bg-carddark rounded-xl"
      />
    ),
    desc: "Latie is a project aimed at creating a location management application that integrates the Ola Maps SDK. ",
    tags: ["React", "Ola Maps SDK"],
    liveUrl: "https://github.com/salmanfadi/Latie",
    codeUrl: "https://github.com/salmanfadi/Latie",
    bgColor: "bg-[#B4BEE0]",
    githubApi: "",
  },
  {
    title: "My Timesheet",
    type: "Backend",
    image: (
      <Image
        src={timesheetApp}
        sizes="100vw"
        fill
        alt="My Timesheet"
        className="transition-transform duration-500 hover:scale-105 object-contain p-4 bg-cardlight dark:bg-carddark rounded-xl"
      />
    ),
    desc: "My Timesheet is a Flask-based application designed to streamline time tracking and management for professionals and teams.",
    tags: ["Flask", "MySQL"],
    liveUrl: "https://github.com/salmanfadi/timesheet",
    codeUrl: "https://github.com/salmanfadi/timesheet",
    bgColor: "bg-[#A6CECE]",
    githubApi: "",
  },
  {
    title: "Daily Mart",
    type: "Frontend",
    image: (
      <Image
        src={dailyMart}
        sizes="100vw"
        fill
        alt="DailyMart"
        className="transition-transform duration-500 hover:scale-105 object-contain p-4 bg-cardlight dark:bg-carddark rounded-xl"
      />
    ),
    desc: "A Simple Grocery website created with HTML,CSS",
    tags: ["HTML", "CSS"],
    liveUrl: "https://github.com/salmanfadi/Grocery-website",
    codeUrl: "https://github.com/salmanfadi/Grocery-website",
    bgColor: "bg-[#C5E4E7]",
    githubApi: "",
  },
];

export default ProjectSection;
