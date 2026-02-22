import { useNavigate } from "react-router";
import { useLogin } from "../../hooks/useAuth";
type Creds = {
  email: string;
  password: string;
  stayLogedin: boolean;
};
export default function Login() {
  const navigate = useNavigate();
  const mutation = useLogin();
  const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
    const form = e.target;
    const creds: Creds = {
      email: form.email.value,
      password: form.password.value,
      stayLogedin: form.stayLogedin.checked,
    };
    await mutation.mutateAsync(creds);
    navigate("/");
  };

  return (
    <form onSubmit={login}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <input type="submit" value="Login" />
    </form>
  );
}
