import { useParams } from "react-router";
const projects = [
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
export default function SingleProject() {
  const { id } = useParams();
  const targetProject = projects.find((prj) => prj.id === id);
  if (!targetProject) {
    return (
      <>
        <h1>404</h1>
        <p>Project not found.</p>
      </>
    );
  }
  return (
    <div className="projectContainer">
      <div className="title">{targetProject?.title}</div>
      <p>{targetProject.description}</p>
      <p>{targetProject.deadline.toLocaleString()}</p>
    </div>
  );
}
