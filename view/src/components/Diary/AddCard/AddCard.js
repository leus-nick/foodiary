import { Card, ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    flexBasis: "20%",
    padding: "7px",
  },
  noneContainer: {
    display: "none",
  },
  card: {
    height: "100%",
    minHeight: "100%",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  icon: {
    fontSize: 128,
    color: "#58d68d",
  },
  rippleVisible: {
    color: "#58d68d",
    borderRadius: "none",
  },
}));

const AddCard = ({ handleClick, expanded }) => {
  const styles = useStyles();
  return (
    <div className={expanded ? styles.noneContainer : styles.container}>
      <Card
        onClick={handleClick}
        elevation={3}
        square={true}
        className={styles.card}
      >
        <ButtonBase
          className={styles.button}
          TouchRippleProps={{ classes: { root: styles.rippleVisible } }}
        >
          <Add className={styles.icon} />
        </ButtonBase>
      </Card>
    </div>
  );
};

export { AddCard };
