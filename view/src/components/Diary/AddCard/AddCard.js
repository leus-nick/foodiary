import { Card, ButtonBase } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./AddCard.module.css";

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

const AddCard = ({ handleClick }) => {
  const classes = useStyles();
  console.log("render AddCard");
  return (
    <div className={styles.addCard}>
      <Card className={styles.addCardInner} onClick={handleClick} elevation={3}>
        <ButtonBase
          classes={{ root: classes.root }}
          TouchRippleProps={{ classes: { root: classes.rippleVisible } }}
        >
          <Add classes={{ root: classes.icon }} />
        </ButtonBase>
      </Card>
    </div>
  );
};

export { AddCard };
