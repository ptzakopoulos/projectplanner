import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "../apis/auth.api";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const { login: setAuthContext } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      if (response?.data?.token) {
        setAuthContext(response.data.token);
      }
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
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
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
