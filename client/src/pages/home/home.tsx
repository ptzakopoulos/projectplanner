import { Link, Outlet } from "react-router";
import STYLES from "./home.module.scss";
export default function Home() {
  return (
    <>
      <nav className={STYLES.tabsNav}>
        <ul>
          <li>
            <Link to={"/my-projects"}>My Projects</Link>
          </li>
          <li>
            <Link to={"/my-colleagues"}>My Colleagues</Link>
          </li>
          <li>
            <Link to={"/my-Clients"}>My Clients</Link>
          </li>
        </ul>
      </nav>
      <div className="tab-container">
        <Outlet />
      </div>
    </>
  );
}
