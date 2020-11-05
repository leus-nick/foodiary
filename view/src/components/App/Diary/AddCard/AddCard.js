import { AddCardButton } from "./AddCardButton";
import styles from "./AddCard.module.css";

const AddCard = ({ onclick }) => {
  return (
    <div className={styles.addCard}>
      <div className={styles.addCardInner}>
        <AddCardButton onclick={onclick} />
      </div>
    </div>
  );
};

export { AddCard };
