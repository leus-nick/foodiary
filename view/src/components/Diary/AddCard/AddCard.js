import { Card, ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    flexBasis: "16.666%",
  },
  noneContainer: {
    display: "none",
  },
  base: {
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

const AddCard = ({ handleClick, expanded }) => {
  const styles = useStyles();
  console.log("render AddCard");
  return (
    <Card
      className={expanded ? styles.noneContainer : styles.container}
      onClick={handleClick}
      elevation={3}
    >
      <ButtonBase
        className={styles.base}
        TouchRippleProps={{ classes: { root: styles.rippleVisible } }}
      >
        <Add className={styles.icon} />
      </ButtonBase>
    </Card>
  );
};

export { AddCard };
