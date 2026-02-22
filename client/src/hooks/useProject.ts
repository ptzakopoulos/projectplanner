import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyProjects,
  createProject,
  getProjectById,
  editProject,
  deleteProject,
} from "../apis/user.api";
export const useMyProjects = () => {
  return useQuery({
    queryKey: ["myProjects"],
    queryFn: getMyProjects,
  });
};
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProjects"] });
      console.log("Project was succesfully created!");
    },
  });
};
export const useGetProjectById = (id: string) => {
  return useQuery({
    queryKey: ["projectById", id],
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
        queryKey: ["myProjects", "projectById"],
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
        queryKey: ["myProjects"],
      });
    },
  });
};
