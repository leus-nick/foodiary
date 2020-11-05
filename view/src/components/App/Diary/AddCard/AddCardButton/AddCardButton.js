import { ButtonBase } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  icon: {
    fontSize: 128,
    color: "#58d68d",
  },
  rippleVisible: {
    color: "#58d68d",
    borderRadius: "10px",
  },
}));

const AddCardButton = ({ onclick }) => {
  const classes = useStyles();

  return (
    <ButtonBase
      classes={{ root: classes.root }}
      TouchRippleProps={{ classes: { root: classes.rippleVisible } }}
      onClick={onclick}
    >
      <AddCircleOutlineIcon classes={{ root: classes.icon }} />
    </ButtonBase>
  );
};

export { AddCardButton };
