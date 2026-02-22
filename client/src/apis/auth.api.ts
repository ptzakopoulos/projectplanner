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
};
export const login = async (creds: LoginCreds) => {
  const url = `${protocol}://${domain}:${port}/${endPoints.login}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    if (!response.ok) return response;
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
