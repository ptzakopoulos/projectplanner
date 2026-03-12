import type { MyProject, NewProject, ColleagueType } from "../types/models";
const protocol = location.origin.split(":")[0];
const domain = location.origin.split(":")[1];
const port = 3002;
interface CustomResponse {
  ok: boolean;
  message: string;
}
interface GetProjectByIdResponse extends CustomResponse {
  data: MyProject;
}
interface GetMyProjectsResponse extends CustomResponse {
  data: MyProject[];
}
const endPoints = {
  createProject: "createProject",
  getMyProjects: "getMyProjects",
  getProjectById: "getProjectById",
  editProject: "editProject",
  deleteProject: "deleteProject",
  saveColleague: "saveColleague",
  getColleagues: "getColleagues",
  deleteColleague: "deleteColleague",
};
type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  message?: string;
  status?: number;
};

const apiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
): Promise<ApiResponse<T>> => {
  const url = `${protocol}://${domain}:${port}/${endpoint}`;
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: data?.message || `Error: ${response.statusText}`,
      };
    }

    return data;
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Network Error",
    };
  }
};
export const getMyProjects = () =>
  apiRequest<MyProject[]>(endPoints.getMyProjects);

export const getProjectById = (id: string) =>
  apiRequest<MyProject>(`${endPoints.getProjectById}/${id}`);

export const createProject = (formData: NewProject) =>
  apiRequest<MyProject>(endPoints.createProject, "POST", formData);

export const deleteProject = (id: string) =>
  apiRequest<{ success: boolean }>(endPoints.deleteProject, "POST", { id });
export const editProject = async (projectData: MyProject) =>
  apiRequest<{ success: boolean }>(
    `${endPoints.editProject}/${projectData._id}`,
    "POST",
    projectData,
  );
export const saveColleague = async (colleague: ColleagueType) =>
  apiRequest<{ success: boolean }>(endPoints.saveColleague, "POST", {
    colleague,
  });

export const getColleagues = async () =>
  apiRequest<ColleagueType[]>(endPoints.getColleagues);

export const deleteColleague = async (colleagueId: ColleagueType["key"]) =>
  apiRequest<{ success: boolean }>(endPoints.deleteColleague, "POST", {
    colleagueId,
  });
