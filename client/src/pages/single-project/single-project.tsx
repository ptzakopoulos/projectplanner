import { useParams } from "react-router";
import { useGetProjectById } from "../../hooks/useProject";
import STYLES from "./single-project.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { MyProject } from "../../types/models";
import EditButton from "../../components/EditButton";
import Colleague from "../../components/Colleague";
export default function SingleProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, isLoading, isError, error } = useGetProjectById(
    projectId ?? "",
  );
  const [dateClass, setDateClass] = useState("");
  const [project, setProject] = useState<MyProject>();

  useEffect(() => {
    const updateProjects = () => {
      if (data) setProject(data);
    };

    const comapreDeadline = () => {
      if (!data?.deadline) return;
      const deadline = new Date(data?.deadline).getTime();
      const today = new Date().getTime();
      const difference = deadline - today;
      const hour = 3600000;
      const day = hour * 24;
      const fiveDays = day * 5;
      const twoDays = day * 2;
      console.log(difference);
      switch (true) {
        case difference <= 0:
          setDateClass("red");
          break;
        case difference <= twoDays:
          setDateClass("orange");
          break;
        case difference <= fiveDays:
          setDateClass("yellow");
          break;
        default:
          setDateClass("green");
          break;
      }
    };

    updateProjects();
    comapreDeadline();
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error {(error as Error).message}</p>;

  return (
    <div className={STYLES.projectContainer}>
      <div className={STYLES.projectTitle}>
        <h1>{project?.title}</h1>
        <Link to={`/project/edit/${project?._id}`}>
          <EditButton />
        </Link>
      </div>
      <p>{project?.description}</p>
      <p className={`${STYLES.date} ${STYLES[dateClass]}`}>
        {project?.deadline
          ? new Date(project.deadline).toLocaleString()
          : "No deadline set"}
      </p>
      <div className={`${STYLES.listBox} ${STYLES.shadowBox}`}>
        <div className={STYLES.title}>
          <h2>Links</h2>
          <span className={`material-symbols-outlined ${STYLES.icon}`}>
            link
          </span>
        </div>
        <ul>
          {project?.links?.map((link, i) => {
            return (
              <li key={`link-${i}`}>
                <a href={link.url} target="_blank">
                  <div className={STYLES.icon}>
                    <span className="material-symbols-outlined">
                      {link.AIIcon}
                    </span>
                  </div>
                  <span>{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${STYLES.listBox} ${STYLES.shadowBox}`}>
        <div className={STYLES.title}>
          <h2>Colleagues</h2>
          <span className={`material-symbols-outlined ${STYLES.icon}`}>
            diversity_3
          </span>
        </div>
        <ul>
          {project?.colleagues?.map((colleague, i) => {
            return (
              <li key={`colleague-${i}`}>
                <Colleague key={i} colleague={colleague} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${STYLES.title} ${STYLES.shadowBox}`}>
        <h2>Clients</h2>
        <ul>
          {project?.clients?.map((client, i) => {
            return (
              <li key={`client-${i}`}>
                <img
                  src={
                    client.icon || client.icon !== ""
                      ? client.icon
                      : "../../public/images.jpg"
                  }
                  alt={client.name}
                />
                <span>{client.name}</span>
                <a href={`mailto:${client.email}`}>{client.email}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
