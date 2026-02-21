type NewProjectLink = {
  name: string;
  url: string;
};
type NewProjectColleague = {
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
type NewProject = {
  title: string;
  description?: string;
  links?: NewProjectLink[];
  colleagues?: NewProjectColleague[];
  domains?: NewProjectDomain[];
  clients?: NewProjectClient[];
  deadline?: Date;
};

type MyProject = NewProject & { _id: string };

export type { NewProject, MyProject };
