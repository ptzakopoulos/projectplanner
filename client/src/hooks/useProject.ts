import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyProjects,
  createProject,
  getProjectById,
  editProject,
  deleteProject,
  saveColleague,
  getColleagues,
  deleteColleague,
} from "../apis/user.api";
const QUERIES = {
  myProjects: "myProjects",
  projectById: "projectById",
  colleagues: "colleagues",
};
export const useMyProjects = () => {
  return useQuery({
    queryKey: [QUERIES.myProjects],
    queryFn: getMyProjects,
  });
};
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.myProjects] });
      console.log("Project was succesfully created!");
    },
  });
};
export const useGetProjectById = (id: string) => {
  return useQuery({
    queryKey: [QUERIES.projectById, id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });
};
export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.myProjects, QUERIES.projectById],
      });
    },
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.myProjects],
      });
    },
  });
};
export const useSaveColleague = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveColleague,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.colleagues],
      });
    },
  });
};
export const useGetColleagues = () => {
  return useQuery({
    queryKey: [QUERIES.colleagues],
    queryFn: getColleagues,
  });
};
export const useDeleteColleague = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteColleague,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES.colleagues],
      });
    },
  });
};
