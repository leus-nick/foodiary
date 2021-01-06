import { useState } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    height: "70px",
    maxHeight: "70px",
    minHeight: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    maxWidth: "150px",
    "& .MuiInputBase-root": {
      "&:before": { border: "none" },
      "& input": {
        appearance: "textfield",
        textAlign: "center",
        fontWeight: "700",
        lineHeight: "1.2",
        fontSize: "3rem",
        "@media (max-width:960px)": {
          fontSize: "2rem",
        },
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
          appearance: "none",
        },
      },
    },
    "& .MuiInput-underline:hover:before": {
      border: "none",
    },
    "& .MuiInput-underline:after": {
      border: "none",
    },
  },
  goal: {
    cursor: "pointer",
    fontSize: "3rem",
    fontWeight: "700",
    "@media (max-width:960px)": {
      fontSize: "2rem",
    },
  },
  goalButton: {
    fontSize: "1rem",
    borderColor: "#58d68d",
    width: "100px",
    padding: "5px 20px",
    transition: "all .4s ease-in-out",
    "&:hover": {
      color: "white",
      backgroundColor: "#58d68d",
      borderRadius: "0px",
    },
    "@media (max-width:960px)": {
      fontSize: "0.8rem",
      padding: "5px 40px",
    },
  },
});

const Goal = ({ goal, submitGoal, changeGoal }) => {
  const styles = useStyles();
  const [edit, setEdit] = useState(false);
  const [goalError, setGoalError] = useState("");

  const handleGoalChange = (e) => {
    e.target.value
      ? setGoalError(changeGoal(e.target.value))
      : setGoalError("Enter your goal");
    console.log("error", goalError);
  };

  return (
    <div className={styles.container}>
      {edit ? (
        <Container maxWidth="xs" className={styles.inner}>
          <TextField
            error={goalError ? true : false}
            id="goalInput"
            type="number"
            defaultValue={goal}
            helperText={goalError}
            className={styles.input}
            autoFocus
            onChange={handleGoalChange}
          />
          <Button
            onClick={() => {
              submitGoal();
              setEdit(false);
            }}
            variant="outlined"
            disabled={goalError ? true : false}
            className={styles.goalButton}
          >
            save
          </Button>
        </Container>
      ) : (
        <Typography
          variant="h2"
          onClick={() => setEdit(true)}
          className={styles.goal}
        >
          {goal}
        </Typography>
      )}
    </div>
  );
};

export { Goal };
