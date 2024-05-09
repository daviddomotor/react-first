import { FC } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import styles from "./Navbar.module.css";

/* Does not depend anything from the component, so let't move it outside.
   For constants like this, we are using Screaming Snake Case
*/
const HEADER_ROUTES = [
  {
    url: "/sandbox",
    title: "Sandbox",
  },
  {
    url: "/movies",
    title: "Movies",
  },
];

const Navbar: FC = () => {
  return (
    <nav
      /* Since the project already contains the classnames package, let's use it, for a more readable code. */
      className={classNames(
        "navbar bg-dark justify-content-start gap-3 px-3",
        styles.Navbar
      )}
    >
      {/* We can use destructuring here, also since it's an arrow function, that only contains a return statement, 
        we can leave out the return. */}
      {HEADER_ROUTES.map(({ title, url }) => (
        <NavLink className="nav-item" to={url} key={url}>
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
