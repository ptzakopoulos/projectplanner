import type { MyProject, NewProject } from "../types/models";
const protocol = location.origin.split(":")[0];
const domain = location.origin.split(":")[1];
const port = 3002;
const endPoints = {
  getMyProjects: "getMyProjects",
  createProject: "createProject",
};
export const getMyProjects = async () => {
  const url = `${protocol}://${domain}:${port}/${endPoints.getMyProjects}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("status : " + response.status);
    return (await response.json()) as MyProject[];
  } catch (err) {
    console.error(err);
    return [];
  }
};
export const createProject = async (formData: NewProject) => {
  const url = `${protocol}://${domain}:${port}/${endPoints.createProject}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("status : " + response.status);
    return response.json();
  } catch (err) {
    console.error(err);
    return {};
  }
};
