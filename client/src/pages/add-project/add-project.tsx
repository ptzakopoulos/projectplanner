import type { NewProject, MyProject, ColleagueType } from "../../types/models";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useCreateProject,
  useGetProjectById,
  useEditProject,
  useGetColleagues,
} from "../../hooks/useProject";
import Colleague from "../../components/Colleague";
type CustomLink = NonNullable<NewProject["links"]>[number] & {
  id: string;
  copied: boolean;
};
type Domain = NonNullable<NewProject["domains"]>[number];
type SingleClient = NonNullable<NewProject["clients"]>[number];

const colleaguePrototype = {
  role: "colleague-role",
  name: "colleague-name",
  email: "colleague-email",
};
export default function AddProject() {
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [currentLink, setCurrentLink] = useState<CustomLink>();
  const [colleagues, setColleagues] = useState<ColleagueType[]>([]);
  const [currentColleague, setCurrentColleague] = useState<ColleagueType>();
  const [currentEnvironment, setCurrentEnvironment] = useState<Domain>();
  const [environments, setEnvironments] = useState<Domain[]>([]);
  const [hasCredentials, setHasCredentials] = useState(false);
  const [currentClient, setCurrentClient] = useState<SingleClient>();
  const [clients, setClients] = useState<NewProject["clients"]>([]);
  const navigate = useNavigate();
  const createProjectMutation = useCreateProject();
  const editrojectMutation = useEditProject();
  const { projectId } = useParams<{ projectId: string }>();
  const { data: projectData } = useGetProjectById(projectId ?? "");
  const [title, setTitle] = useState(projectData?.title ?? "");
  const [description, setDescription] = useState(
    projectData?.description ?? "",
  );
  const [date, setdate] = useState("");
  const { data: storedColleagues, isLoading: colleaguesLoading } =
    useGetColleagues();

  useEffect(() => {
    const setEditProjectValues = () => {
      setLinks(() => {
        const customLinks: CustomLink[] = [];
        projectData?.links?.forEach((link, i) => {
          customLinks.push({
            id: `link-${i}`,
            name: link.name,
            url: link.url,
            copied: false,
            AIIcon: link.AIIcon,
          });
        });
        return customLinks;
      });
      setColleagues(() => {
        const customColleagues: ColleagueType[] = [];
        projectData?.colleagues?.forEach((colleague, i) => {
          customColleagues.push({
            _id: `colleague-${i}`,
            role: colleague.role,
            name: colleague.name,
            email: colleague.email,
          });
        });
        return customColleagues;
      });
      setEnvironments(() => {
        const dommains: Domain[] = [];
        projectData?.domains?.forEach((domain) => {
          dommains.push({
            name: domain.name,
            url: domain.url,
            username: domain.username,
            password: domain.password,
          });
        });
        return dommains;
      });
      setClients(() => {
        const clients: SingleClient[] = [];
        projectData?.clients?.forEach((client) => {
          clients.push({
            icon: client.icon,
            name: client.name,
            email: client.email,
          });
        });
        return clients;
      });
      setdate(() => {
        if (!projectData?.deadline) return "";
        const d = new Date(projectData.deadline);
        const offset = d.getTimezoneOffset() * 60000;
        const localISOTime = new Date(d.getTime() - offset)
          .toISOString()
          .slice(0, 16);
        return localISOTime;
      });
    };
    setEditProjectValues();
  }, [projectData]);

  const updateCurrentLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;
    if (id == "link-url") {
      setCurrentLink(() => {
        return {
          id: `link-${Date.now()}`,
          name: currentLink?.name ?? value,
          url: value,
          copied: false,
        };
      });
    }
    if (id == "link-name") {
      setCurrentLink(() => {
        return {
          id: `link-${Date.now()}`,
          name: value,
          url: currentLink?.url ?? "",
          copied: false,
        };
      });
    }
  };

  const addLink = () => {
    if (currentLink && currentLink.url != "") {
      setLinks((links) => [
        ...links,
        {
          id: `link-${Date.now()}`,
          name: currentLink.name !== "" ? currentLink.name : currentLink.url,
          url: currentLink.url,
          copied: false,
        },
      ]);
      setCurrentLink(() => {
        return {
          id: "",
          name: "",
          url: "",
          copied: false,
        };
      });
    }
  };

  const deleteLink = (linkId: string) => {
    if (linkId && linkId.trim() != "") {
      setLinks((links) => links.filter((l) => l.id !== linkId));
    }
  };

  const updateCurrentColleague = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;
    const newColleague = {
      _id: `c-${Date.now()}`,
      role: currentColleague?.role ?? "",
      name: currentColleague?.name ?? "",
      email: currentColleague?.email ?? "",
    };
    switch (id) {
      case colleaguePrototype.role:
        newColleague.role = value;
        break;
      case colleaguePrototype.name:
        newColleague.name = value;
        break;
      case colleaguePrototype.email:
        newColleague.email = value;
        break;
      default:
        break;
    }
    setCurrentColleague(() => newColleague);
  };

  const addColleague = () => {
    if (
      currentColleague &&
      currentColleague.role &&
      currentColleague.name &&
      currentColleague.name.trim() != "" &&
      currentColleague.email &&
      currentColleague.email.trim() != ""
    ) {
      const isAssigned = colleagues.some(
        (c) =>
          c._id === currentColleague._id || c.email === currentColleague.email,
      );
      if (isAssigned) return;
      setColleagues((prev) => {
        return [...prev, currentColleague];
      });
      setCurrentColleague(() => {
        return {
          _id: "",
          role: "",
          name: "",
          email: "",
        };
      });
    }
  };

  const addSavedColleague = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const value = target.value;
    if (!value) return;
    const targetSavedColleague = storedColleagues?.find((c) => c._id === value);
    if (!targetSavedColleague) return;
    const isAssigned = colleagues.some(
      (c) =>
        c._id === targetSavedColleague._id ||
        c.email === targetSavedColleague.email,
    );
    if (isAssigned) return;
    setColleagues((prev) => {
      return [...prev, targetSavedColleague];
    });
  };

  const deleteColleague = (colleagueId: string) => {
    if (colleagueId && colleagueId.trim() != "") {
      setColleagues((prev) => prev.filter((c) => c._id !== colleagueId));
    }
  };

  const copyOnClipBoard = async (linkId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setLinks((links) => {
        const linksClone = [...links];
        linksClone.map((l) => (l.copied = false));
        const targetLink = linksClone.find((link) => link.id === linkId);
        if (targetLink) targetLink.copied = true;
        return [...linksClone];
      });
    } catch (err) {
      console.error("Αποτυχία αντιγραφής" + err);
    }
  };

  const updateCurrentEnvironment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const inputName = target.name;
    const newEnv: Domain = {
      name: currentEnvironment?.name.trim() ?? "",
      url: currentEnvironment?.url.trim() ?? "",
      username: currentEnvironment?.username.trim() ?? "",
      password: currentEnvironment?.password.trim() ?? "",
    };
    switch (true) {
      case inputName === "environemt":
        newEnv.name = value;
        break;
      case inputName === "environmentUrl":
        newEnv.url = value;
        break;
      case inputName === "envUsername":
        newEnv.username = value;
        break;
      case inputName === "envPassword":
        newEnv.password = value;
        break;
    }
    setCurrentEnvironment(() => newEnv);
  };

  const addEnvironment = () => {
    if (
      currentEnvironment &&
      currentEnvironment.name !== "" &&
      currentEnvironment.url !== ""
    ) {
      setEnvironments((envs) => {
        return [...envs, currentEnvironment];
      });
      setCurrentEnvironment(() => {
        return {
          name: "",
          url: "",
          username: "",
          password: "",
        };
      });
    }
  };

  const toggleCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const isChecked = target.checked;
    setHasCredentials(isChecked);
  };

  const updateFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imgUrl = URL.createObjectURL(file);
      setCurrentClient(() => {
        return {
          icon: imgUrl,
          name: currentClient?.name ?? "",
          email: currentClient?.email ?? "",
        };
      });
    }
  };

  const updateCurrentClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    if (name === "clientName") {
      return setCurrentClient(() => {
        return {
          icon: currentClient?.icon ?? "",
          name: value,
          email: currentClient?.email ?? "",
        };
      });
    }
    if (name === "clientEmail") {
      return setCurrentClient(() => {
        return {
          icon: currentClient?.icon ?? "",
          name: currentClient?.name ?? "",
          email: value,
        };
      });
    }
  };

  const addClient = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentClient && currentClient.name !== "") {
      setClients((prevClients) => {
        if (prevClients) {
          return [...prevClients, currentClient];
        }
        return [currentClient];
      });
    }
  };

  const onFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const properLinks: NewProject["links"] = [];
    links.forEach((link) => {
      properLinks.push({
        name: link.name,
        url: link.url,
        AIIcon: link.AIIcon,
      });
    });
    const properColleagues: NewProject["colleagues"] = [];
    colleagues.forEach((colleague) => {
      properColleagues.push({
        _id: colleague._id,
        role: colleague.role,
        name: colleague.name,
        email: colleague.email,
      });
    });
    const formData: NewProject = {
      title: title,
      description: description,
      links: properLinks,
      colleagues: properColleagues,
      clients: clients,
      domains: environments,
      deadline: new Date(date),
    };
    try {
      if (projectData) {
        const editFormData: MyProject = {
          _id: projectData._id,
          ...formData,
        };
        const res = await editrojectMutation.mutateAsync(editFormData);
        console.log(res);
        return navigate(`/project/${projectData._id}`);
      }
      const res = await createProjectMutation.mutateAsync(formData);
      console.log(res);
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Create New Project</h1>

      <form onSubmit={onFormSubmit}>
        <div className="input-block">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            type="text"
            name="projectTitle"
            id="projectTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-block">
          <span>Add Link</span>
          <div className="flex-box">
            <input
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key.toLowerCase() === "enter") {
                  e.preventDefault();
                  addLink();
                }
              }}
              onChange={updateCurrentLink}
              value={currentLink?.name ?? ""}
              type="text"
              name="link-name"
              id="link-name"
              placeholder="Display Name"
            />
            <input
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key.toLowerCase() === "enter") {
                  e.preventDefault();
                  addLink();
                }
              }}
              onChange={updateCurrentLink}
              value={currentLink?.url ?? ""}
              type="text"
              name="link-url"
              id="link-url"
              placeholder="URL"
            />
            <button className="add-bt" type="button" onClick={addLink}>
              Add
            </button>
          </div>
          {links?.map((link) => {
            const pKey = link.id;
            return (
              <div key={pKey} className="link-block">
                <div className="name">{link.name}</div>
                <div className="link-url">
                  <a href={link.url} target="_blank">
                    {link.url}
                  </a>
                  <span
                    onClick={() => copyOnClipBoard(link.id, link.url)}
                    className="material-symbols-outlined"
                  >
                    {link.copied ? "check" : "content_copy"}
                  </span>
                </div>
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    deleteLink(link.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="input-block">
          <span>Asign Colleague</span>
          {!colleaguesLoading && (
            <select onChange={addSavedColleague}>
              <option value="">Stored Colleagues</option>
              {storedColleagues?.map((colleague) => {
                return <option value={colleague._id}>{colleague.name}</option>;
              })}
            </select>
          )}
          <div className="flex-box">
            <select
              onChange={updateCurrentColleague}
              name={colleaguePrototype.role}
              id={colleaguePrototype.role}
              value={currentColleague?.role ?? ""}
            >
              <option value="">--Role--</option>
              <option value="pm">PM</option>
              <option value="designer">Designer</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
            </select>
            <input
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key.toLowerCase() === "enter") {
                  e.preventDefault();
                  addColleague();
                }
              }}
              onChange={updateCurrentColleague}
              type="text"
              name={colleaguePrototype.name}
              id={colleaguePrototype.name}
              value={currentColleague?.name ?? ""}
              placeholder="Colleague Name"
            />
            <input
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key.toLowerCase() === "enter") {
                  e.preventDefault();
                  addColleague();
                }
              }}
              onChange={updateCurrentColleague}
              type="email"
              name={colleaguePrototype.email}
              id={colleaguePrototype.email}
              value={currentColleague?.email ?? ""}
              placeholder="Colleague Email"
            />
            <button className="add-bt" type="button" onClick={addColleague}>
              Add
            </button>
          </div>
        </div>
        <div className="input-block">
          <span>Colleagues</span>
          {colleagues.map((colleague) => {
            return (
              <Colleague
                key={colleague._id}
                colleague={colleague}
                getId={deleteColleague}
              />
            );
          })}
        </div>
        <div className="input-block">
          <span className="block-title">Environment Domains</span>
          <div className="flex-box">
            <input
              type="text"
              name="environemt"
              id="environment"
              placeholder="Environment Name e.g. Live"
              value={currentEnvironment?.name ?? ""}
              onChange={updateCurrentEnvironment}
            />
            <input
              type="text"
              name="environmentUrl"
              id="environmentUrl"
              placeholder="Environment Url"
              value={currentEnvironment?.url ?? ""}
              onChange={updateCurrentEnvironment}
            />
          </div>
          <div className="flex-box">
            <label htmlFor="hasCreds">Has Credentials</label>
            <input
              onChange={toggleCredentials}
              type="checkbox"
              name="hasCreds"
              id="hasCreds"
            />
          </div>
          {hasCredentials && (
            <div className="flex-box">
              <input
                type="text"
                name="envUsername"
                id="envUsername"
                placeholder="Username"
              />
              <input
                type="text"
                name="envPassword"
                id="envPassword"
                placeholder="Password"
              />
            </div>
          )}
          <button onClick={addEnvironment} className="add-bt" type="button">
            Add
          </button>
        </div>
        <div className="input-block">
          {environments.map((environment, i) => {
            return (
              <div key={i}>
                <div className="flex-box">
                  <div className="name">{environment.name}</div>
                  <div className="url">
                    <a href={environment.url} target="_blank">
                      {environment.url}
                    </a>
                  </div>
                  <div className="creds">
                    <div className="username">{environment.username}</div>
                    <div className="password">{environment.password}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="input-block">
          <label htmlFor="client">Client</label>
          <div className="flex-box">
            <label htmlFor="clientIcon">
              <div className="checkmark">
                {currentClient?.icon && currentClient?.icon !== "" && (
                  <img src={currentClient?.icon} alt="Client img" />
                )}
              </div>
              <input
                onChange={updateFileInput}
                accept="image/png, image/jpg, image/svg, image/avif"
                type="file"
                name="clientIcon"
                id="clientIcon"
              />
            </label>
            <input
              onChange={updateCurrentClient}
              type="text"
              name="clientName"
              id="clientName"
              placeholder="Client Name"
              value={currentClient?.name ?? ""}
            />
            <input
              onChange={updateCurrentClient}
              type="email"
              name="clientEmail"
              id="clientEmail"
              placeholder="Client Email"
              value={currentClient?.email ?? ""}
            />
            <button onClick={addClient} className="add-bt">
              Add
            </button>
          </div>
        </div>
        <div className="input-block">
          {clients?.map((client, i) => {
            return (
              <div key={`cl-${i}`} className="client">
                <div className="flex-box">
                  <img
                    src={
                      client.icon || client.icon !== ""
                        ? client.icon
                        : "../../public/images.jpg"
                    }
                    alt={client.name}
                  />
                  <span className="name">{client.name}</span>
                  <div className="email">
                    <a href={`mailto:${client.email}`}>{client.email}</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="input-block">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            id="deadline"
            value={date ?? ""}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className="input-block">
          <input
            type="submit"
            value={projectData ? "Save Changes" : "Add Project"}
          />
        </div>
      </form>
    </>
  );
}
