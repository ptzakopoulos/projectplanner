type NewProjectLink = {
  name: string;
  url: string;
  AIIcon?: string;
};
type ColleagueType = {
  _id?: string;
  key: string;
  role: string;
  name: string;
  email: string;
};
type NewProjectDomain = {
  name: string;
  url: string;
  username: string;
  password: string;
};
type NewProjectClient = {
  icon?: string;
  name: string;
  email?: string;
};
interface NewProject {
  title: string;
  description?: string;
  links?: NewProjectLink[];
  colleagues?: ColleagueType[];
  domains?: NewProjectDomain[];
  clients?: NewProjectClient[];
  deadline?: Date;
}

interface MyProject extends NewProject {
  _id?: string;
}

export type { NewProject, MyProject, ColleagueType };
