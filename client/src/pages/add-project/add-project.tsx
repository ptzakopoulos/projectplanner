import { useState } from "react";

type CustomLink = {
  id: string;
  name: string;
  url: string;
};

type Colleague = {
  id: string;
  role: string;
  name: string;
  email: string;
};

const colleaguePrototype = {
  role: "colleague-role",
  name: "colleague-name",
  email: "colleague-email",
};

export default function AddProject() {
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [currentLink, setCurrentLink] = useState<CustomLink>();
  const [linkId, setLinkId] = useState(0);
  const [colleagues, setColleagues] = useState<Colleague[]>([]);
  const [currentColleague, setCurrentColleague] = useState<Colleague>();
  const [colleagueId, setcolleagueId] = useState(0);
  const [savedColleagues, setSavedColleagues] = useState<Colleague[]>([]);

  const updateCurrentLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;
    const id = target.id;
    if (id == "link-url") {
      setCurrentLink(() => {
        return {
          id: `link-${linkId}`,
          name: currentLink?.name ?? value,
          url: value,
        };
      });
    }
    if (id == "link-name") {
      setCurrentLink(() => {
        return {
          id: `link-${linkId}`,
          name: value,
          url: currentLink?.url ?? "",
        };
      });
    }
  };

  const addLink = () => {
    console.log("hi");
    if (currentLink && currentLink.url != "") {
      setLinks((links) => [
        ...links,
        {
          id: `link-${linkId}`,
          name: currentLink.name !== "" ? currentLink.name : currentLink.url,
          url: currentLink.url,
        },
      ]);
      setCurrentLink(() => {
        return {
          id: "",
          name: "",
          url: "",
        };
      });
      setLinkId((prev) => (prev += 1));
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
      id: `c-${colleagueId}`,
      role: currentColleague?.role ?? "",
      name: currentColleague?.name ?? "",
      email: currentColleague?.email ?? "",
    };
    switch (id) {
      case colleaguePrototype.role:
        newColleague.role = value;
        break;
      case colleaguePrototype.name:
        console.log(value);
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
      currentColleague.name.trim() != ""
    ) {
      setColleagues((prev) => {
        return [...prev, currentColleague];
      });
      setCurrentColleague(() => {
        return {
          id: `c-` + (colleagueId + 1),
          role: "",
          name: "",
          email: "",
        };
      });
      setcolleagueId((prev) => (prev += 1));
    }
  };

  const deleteColleague = (colleagueId: string) => {
    if (colleagueId && colleagueId.trim() != "") {
      setColleagues((prev) => prev.filter((c) => c.id !== colleagueId));
    }
  };

  const saveColleague = (colleagueEmail: string) => {
    if (!colleagueEmail)
      alert("You need to add email in order to save the colleague");
    const targetColleague = colleagues.filter(
      (c) => c.email === colleagueEmail,
    );
    const isSaved = savedColleagues.some((c) => c.email === colleagueEmail);
    if (targetColleague.length > 0 && !isSaved) {
      setSavedColleagues((prev) => [...prev, targetColleague[0]]);
    }
  };

  return (
    <>
      <h1>Add Project</h1>

      <form>
        <div className="input-block">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="input-block">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" />
        </div>
        <div className="input-block">
          <span>Add Link</span>
          <label htmlFor="link-name">Display name</label>
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
          />
          <label htmlFor="link-url">URL</label>
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
          />
          <button type="button" onClick={addLink}>
            add
          </button>
          {links?.map((link) => {
            const pKey = link.id;
            return (
              <div key={pKey} className="link-block">
                <a href={link.url} target="_blank">
                  {link.name}
                </a>
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
          <label htmlFor="deadline">Deadline</label>
          <input type="datetime-local" name="deadline" id="deadline" />
        </div>
        <div className="input-block">
          <label htmlFor={colleaguePrototype.role}>Colleague Role</label>
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
          <label htmlFor={colleaguePrototype.name}>Colleague Name</label>
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
          />
          <label htmlFor={colleaguePrototype.email}>Colleague Email</label>
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
          />
          <button type="button" onClick={addColleague}>
            Add
          </button>
        </div>
        <div className="input-block">
          <span>Colleagues</span>
          {colleagues.map((colleague) => {
            const isSaved = savedColleagues.some(
              (c) => c.email === colleague.email,
            );
            return (
              <div key={colleague.id} className="colleague">
                <span className={colleague.role}>
                  {colleague.role.toUpperCase()} :{" "}
                </span>
                <span>{colleague.name}</span>
                <a href={"mailto:" + colleague.email}>{colleague.email}</a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteColleague(colleague.id);
                  }}
                >
                  Delete
                </button>
                {!isSaved && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      saveColleague(colleague.email);
                    }}
                  >
                    Save Colleague
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="input-block">
          <label htmlFor="client">Client</label>
          <input type="text" name="client" id="client" />
        </div>
        <div className="input-block">
          <label htmlFor="report">Project Report</label>
          <input type="file" name="report" id="report" />
        </div>
      </form>
    </>
  );
}
