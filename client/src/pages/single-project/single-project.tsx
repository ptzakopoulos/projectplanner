import { useParams } from "react-router";
import { useGetProjectById } from "../../hooks/useProject";
import STYLES from "./single-project.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { MyProject } from "../../types/models";
import AddButton from "../../components/AddButton";
export default function SingleProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isError, error } = useGetProjectById(
    projectId ?? "",
  );
  const [project, setProject] = useState<MyProject>();

  useEffect(() => {
    const updateProjects = () => {
      if (data) setProject(data);
    };
    updateProjects();
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error {(error as Error).message}</p>;

  const test = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target;
    console.log(target);
  };

  return (
    <div className={STYLES.projectContainer}>
      <Link to={`/project/edit/${project?._id}`}>Edit</Link>
      <div className={STYLES.projectTitle}>
        <h1>{project?.title}</h1>
      </div>
      <p>{project?.description}</p>
      <p>{project?.deadline?.toLocaleString()}</p>
      <div className={`${STYLES.title} ${STYLES.shadowBox}`}>
        <h2>Links</h2>
        <ul>
          {project?.links?.map((link, i) => {
            return (
              <li key={`link-${i}`}>
                <span>{link.name}</span>
                <a href={link.url}>{link.url} </a>
              </li>
            );
          })}
        </ul>
        <AddButton onClick={test} color="blue">
          + Add Link
        </AddButton>
      </div>
      <div className={`${STYLES.title} ${STYLES.shadowBox}`}>
        <h2>Colleagues</h2>
        <ul>
          {project?.colleagues?.map((colleague, i) => {
            return (
              <li key={`colleague-${i}`}>
                <span>{colleague.role}</span>
                <span>{colleague.name}</span>
                <a href={`mailto:${colleague.email}`}>{colleague.email}</a>
              </li>
            );
          })}
        </ul>
        <AddButton onClick={test} color="blue">
          + Add Colleague
        </AddButton>
      </div>
      <div className={`${STYLES.title} ${STYLES.shadowBox}`}>
        <h2>Clients</h2>
        <ul>
          {project?.clients?.map((client, i) => {
            return (
              <li key={`client-${i}`}>
                <img src={client.icon} alt={client.name} />
                <span>{client.name}</span>
                <a href={`mailto:${client.email}`}>{client.email}</a>
              </li>
            );
          })}
        </ul>
        <AddButton onClick={test} color="blue">
          + Add Colleague
        </AddButton>
      </div>
    </div>
  );
}
