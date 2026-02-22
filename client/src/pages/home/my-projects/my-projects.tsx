import { useMyProjects, useDeleteProject } from "../../../hooks/useProject";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import STYLES from "./my-projects.module.scss";

export default function MyProjects() {
  const mutation = useDeleteProject();
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
  const { data, isLoading, isError, error } = useMyProjects();
  const [projects, setProjects] = useState(data);

  useEffect(() => {
    const updateProjects = () => {
      setProjects(data);
    };
    updateProjects();
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error {(error as Error).message}</p>;

  const filterProjects = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const option = target.value?.toLowerCase();
    if (!option) {
      return setProjects(data);
    }
    setProjects(() => {
      return data?.filter((prj) => prj.title.toLowerCase() === option);
    });
  };

  const deleteProject = async (id: string) => {
    const res = await mutation.mutateAsync(id);
    console.log(res);
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
        {projects?.map((project, i) => {
          return (
            <Link
              key={`project-${i}`}
              to={`/project/${project?._id}`}
              className={STYLES.card}
            >
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteProject(project._id);
                  }}
                >
                  Delete
                </button>
                <div className={STYLES.title}>{project.title}</div>
                <div className={STYLES.description}>
                  <p>{project.description}</p>
                </div>
                <div className={STYLES.description}>
                  <span>{project.deadline?.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
