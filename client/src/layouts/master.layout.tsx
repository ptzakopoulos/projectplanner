import { Outlet, Link } from "react-router";
import STYLES from "./style.module.scss";
export default function MasterLayout({ token }: { token: string | null }) {
  if (!token)
    return (
      <div className={STYLES.appContainer}>
        <header className={STYLES.header}>
          <p>Navigation</p>
          <br />
          <nav>
            <ul>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className={STYLES.wrapper}>
          <Outlet />
        </div>
      </div>
    );

  return (
    <div className={STYLES.appContainer}>
      <header className={STYLES.header}>
        <p>Navigation</p>
        <br />
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/new-project"}>New Project</Link>
            </li>
            <li>
              <Link to={"/logs"}>Logs</Link>
            </li>
          </ul>
        </nav>
        <br />
        <br />
        <br />
        <p>Settings</p>
        <br />
        <nav>
          <ul>
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <Link to={"/preferences"}>Preferences</Link>
            </li>
            <li>
              <Link to={"/logout"}>Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className={STYLES.wrapper}>
        <Outlet />
      </div>
    </div>
  );
}
