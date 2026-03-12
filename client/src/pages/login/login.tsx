import { useNavigate } from "react-router";
import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import InputBlock from "../../components/InputBlock";
import FormMessage from "../../components/formMessage/FormMessage";
import type { FormMessageInputs } from "../../components/formMessage/FormMessage";
type Creds = {
  email: string;
  password: string;
  stayLogedin: boolean;
};
export default function Login() {
  const navigate = useNavigate();
  const mutation = useLogin();
  const [messageInputs, setmessageInputs] = useState<FormMessageInputs>(null);

  const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const creds: Creds = {
      email: form.email.value,
      password: form.password.value,
      stayLogedin: form.stayLogedin.checked,
    };
    const res = await mutation.mutateAsync(creds);
    console.log(res.message);
    console.log(res.status);
    setmessageInputs((curr) => {
      if (res?.message && res?.status) {
        return {
          message: res.message,
          status: res.status,
        };
      }
      return curr;
    });
    setTimeout(() => {
      setmessageInputs(null);
    }, 2500);
    if (res.ok && res.data?.token) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={login}>
      <InputBlock type="email" name="email" label="Email" />
      <InputBlock type="password" name="password" label="Password" />
      <input type="checkbox" name="stayLogedin" id="stayLogedin" />
      <input type="submit" value="Login" />
      {messageInputs?.message && messageInputs.status && (
        <FormMessage status={messageInputs.status}>
          {messageInputs.message}
        </FormMessage>
      )}
    </form>
  );
}
