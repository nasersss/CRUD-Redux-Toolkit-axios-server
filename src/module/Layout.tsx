import { Outlet } from "react-router-dom";
import GlobalNav from "./GlobalNav";
import Styles from "./LayoutStyle.module.css";
const Layout = () => {
  return (
    <>
      <article className={Styles.header}>
        <header>
          <h1>Welcome</h1>
        </header>
      </article>
      <section className={Styles["content-section"]}>
        <GlobalNav />
        <main>
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default Layout;
