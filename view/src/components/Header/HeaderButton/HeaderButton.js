import { ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 32,
  },
}));

const HeaderButton = ({ logout }) => {
  console.log("render HeaderButton");
  const classes = useStyles();

  return <ExitToApp classes={{ root: classes.root }} onClick={logout} />;
};

export { HeaderButton };
