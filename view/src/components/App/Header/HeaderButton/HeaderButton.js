import { ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 32,
  },
}));

const HeaderButton = () => {
  const classes = useStyles();

  const handleLogoutButtonClick = () => {
    console.log("logout");
  };

  return (
    <ExitToApp
      classes={{ root: classes.root }}
      onClick={handleLogoutButtonClick}
    />
  );
};

export { HeaderButton };
