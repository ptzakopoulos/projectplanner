import type { MyProject, NewProject, ColleagueType } from "../types/models";
const protocol = location.origin.split(":")[0];
const domain = location.origin.split(":")[1];
const port = 3002;
const endPoints = {
  createProject: "createProject",
  getMyProjects: "getMyProjects",
  getProjectById: "getProjectById",
  editProject: "editProject",
  deleteProject: "deleteProject",
  saveColleague: "saveColleague",
  getColleagues: "getColleagues",
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
export const getProjectById = async (id: string) => {
  const url = `${protocol}:${domain}:${port}/${endPoints.getProjectById}/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("status : " + response.status);
    return (await response.json()) as MyProject;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const editProject = async (projectData: MyProject) => {
  const url = `${protocol}:${domain}:${port}/${endPoints.editProject}/${projectData._id}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) throw new Error("status : " + response.status);
    return (await response.json()) as MyProject;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const deleteProject = async (id: string) => {
  const url = `${protocol}:${domain}:${port}/${endPoints.deleteProject}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) throw new Error("status : " + response.status);
    return (await response.json()) as MyProject;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const saveColleague = async (colleague: ColleagueType) => {
  const url = `${protocol}:${domain}:${port}/${endPoints.saveColleague}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ colleague }),
    });
    if (!response.ok) throw new Error("status : " + response.status);
    return (await response.json()) as MyProject;
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const getColleagues = async () => {
  const url = `${protocol}:${domain}:${port}/${endPoints.getColleagues}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("status : " + response.status);
    return (await response.json()) as ColleagueType[];
  } catch (err) {
    console.error(err);
    return null;
  }
};
