import { HeaderButton } from "./HeaderButton";
import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    backgroundColor: "white",
    height: "70px",
    minHeight: "70px",
    maxHeight: "70px",
    padding: "0px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 5px 8px -9px rgba(133, 146, 158, 0.95)",
  },
  link: {
    color: "#85929e",
    fontSize: "3rem",
    fontWeight: "700",
    "@media (max-width:960px)": {
      fontSize: "2rem",
    },
    "& span": {
      color: "#58d68d",
    },
  },
});

const Header = ({ logout }) => {
  const styles = useStyles();
  return (
    <header className={styles.header}>
      <Link href="/" variant="h1" underline="none" className={styles.link}>
        Foo<span>diary</span>
      </Link>
      <HeaderButton logout={logout} />
    </header>
  );
};

export { Header };
