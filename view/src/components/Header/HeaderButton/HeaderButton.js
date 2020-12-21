import { ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: 32,
    cursor: "pointer",
    transition: "color .3s ease",
    "&:hover": {
      color: "#58d68d",
    },
  },
}));

const HeaderButton = ({ logout }) => {
  const styles = useStyles();

  return <ExitToApp className={styles.icon} onClick={logout} />;
};

export { HeaderButton };
