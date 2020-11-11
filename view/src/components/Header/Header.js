import { HeaderButton } from "./HeaderButton";
import styles from "./Header.module.css";

const Header = ({ logout }) => {
  console.log("redner Header");
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        <a href="/">
          Foo<span>diary</span>
        </a>
      </h1>
      <HeaderButton logout={logout} />
    </header>
  );
};

export { Header };
