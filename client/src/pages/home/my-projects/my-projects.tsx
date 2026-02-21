import { Link } from "react-router";
import { useState } from "react";
import STYLES from "./my-projects.module.scss";

export default function MyProjects() {
  const projectData = [
    {
      id: "1",
      title: "Project 1",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam hic commodi consequatur quo corporis in alias. Laboriosam vero voluptatibus eveniet eos molestiae, rerum error repellat praesentium expedita, libero, illo exercitationem accusantium sapiente ducimus blanditiis delectus eius hic similique animi vitae.",
      deadline: new Date(),
    },
    {
      id: "2",
      title: "Project 2",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam hic commodi consequatur quo corporis in alias. Laboriosam vero voluptatibus eveniet eos molestiae, rerum error repellat praesentium expedita, libero, illo exercitationem accusantium sapiente ducimus blanditiis delectus eius hic similique animi vitae.",
      deadline: new Date(),
    },
    {
      id: "3",
      title: "Project 3",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam hic commodi consequatur quo corporis in alias. Laboriosam vero voluptatibus eveniet eos molestiae, rerum error repellat praesentium expedita, libero, illo exercitationem accusantium sapiente ducimus blanditiis delectus eius hic similique animi vitae.",
      deadline: new Date(),
    },
    {
      id: "4",
      title: "Project 4",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam hic commodi consequatur quo corporis in alias. Laboriosam vero voluptatibus eveniet eos molestiae, rerum error repellat praesentium expedita, libero, illo exercitationem accusantium sapiente ducimus blanditiis delectus eius hic similique animi vitae.",
      deadline: new Date(),
    },
  ];
  const filters = [
    {
      title: "Name",
      slug: "name",
      options: ["project 1", "project 2", "project 3", "project 4"],
    },
    {
      title: "Priority",
      slug: "priority",
      options: ["project 1", "project 2", "project 3", "project 4"],
    },
    {
      title: "Deadline",
      slug: "deadline",
      options: ["project 1", "project 2", "project 3", "project 4"],
    },
    {
      title: "Colleague",
      slug: "colleague",
      options: ["project 1", "project 2", "project 3", "project 4"],
    },
    {
      title: "Client",
      slug: "colleague",
      options: ["project 1", "project 2", "project 3", "project 4"],
    },
  ];
  const [projects, setProjects] = useState(projectData);

  const filterProjects = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const option = target.value?.toLowerCase();
    if (!option) {
      return setProjects(projectData);
    }
    setProjects(() => {
      return projectData.filter((prj) => prj.title.toLowerCase() === option);
    });
  };

  return (
    <>
      <div className={STYLES.filters}>
        <ul>
          {filters.map((filter, i) => {
            return (
              <li key={`filter-${i}`}>
                <select
                  onChange={filterProjects}
                  data-id={filter.slug}
                  name={filter.slug}
                  id={filter.slug}
                >
                  <option value="">{filter.title}</option>
                  {filter.options.map((option, i) => {
                    return (
                      <option key={`o-${i}`} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={STYLES.cardContainer}>
        {projects.map((project, i) => {
          return (
            <Link
              key={`project-${i}`}
              to={`/project/${project.id}`}
              className={STYLES.card}
            >
              <div className={STYLES.title}>{project.title}</div>
              <div className={STYLES.description}>
                <p>{project.description}</p>
              </div>
              <div className={STYLES.description}>
                <span>{project.deadline.toLocaleString()}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
