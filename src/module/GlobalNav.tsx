import { NavLink } from "react-router-dom";
import Styles from "./GlobalNavStyle.module.css";
const GlobalNav = () => {
  const navLinks = [
    {
      id: 1,
      to: "/",
      value: "Dashboard",
    },
    {
      id: 2,
      to: "/add",
      value: "New Employee",
    },
  ];
  return (
    <div>
      <nav className={Styles["container"]}>
        {navLinks.map((link) => {
          return (
            <NavLink
              key={link.id}
              to={link.to}
              className={({ isActive }) =>
                isActive ? Styles.active : undefined
              }
            >
              {link.value}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default GlobalNav;
