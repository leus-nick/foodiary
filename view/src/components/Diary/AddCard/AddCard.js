import { AddCardButton } from "./AddCardButton";
import styles from "./AddCard.module.css";

const AddCard = ({ handleClick }) => {
  console.log("render AddCard");
  return (
    <div className={styles.addCard}>
      <div className={styles.addCardInner} onClick={handleClick}>
        <AddCardButton />
      </div>
    </div>
  );
};

export { AddCard };
