import type { ColleagueType } from "../types/models";
import { useSaveColleague, useGetColleagues } from "../hooks/useProject";
import { useEffect, useState } from "react";
type ColleagueProps = {
  colleague: ColleagueType;
  getId?: (text: string) => void;
};
export default function Colleague({ colleague, getId }: ColleagueProps) {
  const shareColleagueId = (e: React.MouseEvent) => {
    e.preventDefault();
    if (getId) getId(colleague._id);
  };
  const mutation = useSaveColleague();
  const { data: storedColleagues } = useGetColleagues();
  const [isStored, setIsStored] = useState(false);

  useEffect(() => {
    const findColleague = () => {
      const colleagueExists = storedColleagues?.find(
        (cl) => cl.email === colleague.email,
      );
      if (!colleagueExists) return;
      setIsStored(true);
    };
    findColleague();
  }, [storedColleagues, colleague.email]);

  const saveColleague = async () => {
    const result = await mutation.mutateAsync(colleague);
    console.log(result);
  };

  return (
    <div key={colleague._id} className="colleague flex-box">
      <span title={colleague.role} className={`role ${colleague.role}`}>
        {colleague.role[0].toUpperCase()}
      </span>
      <span className="name">{colleague.name}</span>
      <div className="email">
        <a href={"mailto:" + colleague.email}>{colleague.email}</a>
      </div>
      <button onClick={shareColleagueId}>Delete</button>
      {!isStored && (
        <button type="button" onClick={saveColleague}>
          Save Colleague
        </button>
      )}
    </div>
  );
}
