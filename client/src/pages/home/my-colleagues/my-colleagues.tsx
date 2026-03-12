import { useGetColleagues, useSaveColleague } from "../../../hooks/useProject";
import Colleague from "../../../components/Colleague";
import type { ColleagueType } from "../../../types/models";
export default function MyColleagues() {
  const { data, isLoading, isError, error } = useGetColleagues();
  const mutation = useSaveColleague();

  if (isLoading) return <p>Loading . . .</p>;
  if (isError) {
    return <p>{error.message}</p>;
  }

  const postColleague = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const targetForm = e.target as HTMLFormElement;
    const newColleague: ColleagueType = {
      key: Date.now().toString(),
      role: targetForm.colleagueRole.value,
      name: targetForm.fullName.value,
      email: targetForm.email.value,
    };
    const res = await mutation.mutateAsync(newColleague);
    console.log(res);
  };

  return (
    <>
      <ul>
        {data?.map((colleague) => {
          return (
            <li key={colleague._id}>
              <Colleague colleague={colleague} />
            </li>
          );
        })}
      </ul>
      <form onSubmit={postColleague}>
        <div className="input_block">
          <label htmlFor="colleagueRole">Role</label>
          <select name="colleagueRole" id="colleagueRole">
            <option value="pm">PM</option>
            <option value="designer">Designer</option>
            <option value="frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
        <div className="input_block">
          <label htmlFor="fullName">Name</label>
          <input type="text" name="fullName" id="fullName" />
        </div>
        <div className="input_block">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <input type="submit" value="Assign Colleague" />
      </form>
    </>
  );
}
