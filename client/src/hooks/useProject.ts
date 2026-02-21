import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProjects, createProject } from "../apis/user.api";
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
