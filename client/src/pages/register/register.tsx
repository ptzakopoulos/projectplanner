import type { RegisterUser } from "../../apis/auth.api";
import { useRegister } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
const formFields = {
  name: "name",
  email: "email",
  password: "password",
  role: "role",
};
export default function Register() {
  const mutation = useRegister();
  const navigate = useNavigate();

  const onFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData) as unknown as RegisterUser;

    const res = await mutation.mutateAsync(data);

    if (res.ok) {
      navigate("/login");
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="input-block">
        <label htmlFor={formFields.name}>Full Name</label>
        <input
          type="text"
          name={formFields.name}
          id={formFields.name}
          autoComplete="true"
        />
      </div>
      <div className="input-block">
        <label htmlFor={formFields.role}>Role</label>
        <select name={formFields.role} id={formFields.role}>
          <option value="">Role</option>
          <option value="pm">PM</option>
          <option value="designer">Designer</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
      </div>
      <div className="input-block">
        <label htmlFor={formFields.email}>Email</label>
        <input
          type="email"
          name={formFields.email}
          id={formFields.email}
          autoComplete="true"
        />
      </div>
      <div className="input-block">
        <label htmlFor={formFields.password}>Password</label>
        <input
          type="password"
          name={formFields.password}
          id={formFields.password}
          autoComplete="true"
        />
      </div>
      <input type="submit" value="Εγγραφή" />
    </form>
  );
}
