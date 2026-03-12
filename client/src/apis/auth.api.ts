type RegisterUser = {
  name: string;
  role: string;
  email: string;
  password: string;
};
type LoginCreds = {
  email: string;
  password: string;
  stayLogedin: boolean;
};
const protocol = location.origin.split(":")[0];
const domain = location.origin.split(":")[1];
const port = 3002;
const endPoints = {
  login: "login",
  register: "register",
};
const HTTPPostRequest = async (
  url: string,
  creds: LoginCreds | RegisterUser,
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    if (!response.ok) return { status: response.status, message: data.message };
    return data;
  } catch {
    return { ok: false, message: "Something went wrong" };
  }
};
export const register = async (creds: RegisterUser) => {
  const url = `${protocol}://${domain}:${port}/${endPoints.register}`;
  return await HTTPPostRequest(url, creds);
};
export const login = async (creds: LoginCreds) => {
  const url = `${protocol}://${domain}:${port}/${endPoints.login}`;
  return await HTTPPostRequest(url, creds);
};

export type { RegisterUser };
