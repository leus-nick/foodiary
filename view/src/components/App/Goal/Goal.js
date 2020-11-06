import styles from "./Goal.module.css";

const Goal = ({ goal, text }) => {
  return (
    <div className={styles.goal}>
      <h1>{text}</h1>
      <h2 className={styles.goalText}>{goal}</h2>
    </div>
  );
};

export { Goal };
