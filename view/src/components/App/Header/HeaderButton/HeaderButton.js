import { ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { authMiddleWare } from "../../../../util/auth";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 32,
  },
}));

const HeaderButton = ({ logout }) => {
  const classes = useStyles();

  return <ExitToApp classes={{ root: classes.root }} onClick={logout} />;
};

export { HeaderButton };
