import { useState } from "react";
import { AddCard } from "./AddCard";
import { Card } from "./Card";
import styles from "./Diary.module.css";

const Diary = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.diary}>
      <AddCard onclick={() => setCount(count + 1)} />
      {[...Array(count)].map((c, i) => {
        return <Card key={i} />;
      })}
    </div>
  );
};

export { Diary };
