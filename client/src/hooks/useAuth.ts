import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../apis/auth.api";
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
    },
    onError: (err) => {
      console.error(err);
      return err;
    },
  });
};
