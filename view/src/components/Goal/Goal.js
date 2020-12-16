import { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    height: "70px",
    maxHeight: "70px",
    minHeight: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  goal: {
    cursor: "pointer",
  },
});

const Goal = () => {
  const styles = useStyles();
  const [userGoal, setUserGoal] = useState(0);
  const [edit, setEdit] = useState(false);
  const [goalError, setGoalError] = useState("");
  const authToken = localStorage.getItem("AuthToken");
  axios.defaults.headers.common = { Authorization: `${authToken}` };

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setUserGoal(response.data.userCredentials.goal);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUserGoal]);

  const handleGoalInputChange = (e) => {
    if (e.target.value && e.target.value != null) {
      setUserGoal(e.target.value);
      setGoalError("");
    } else {
      setGoalError("Enter your goal");
    }
  };

  const handleGoalSubmit = () => {
    let goal = document.getElementById("goalInput");
    if (goal.value && goal.value != null) {
      axios
        .post("/user", { goal: userGoal })
        .then((response) => {
          console.log(response);
          setEdit(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setGoalError("Enter your goal");
    }
  };

  return (
    <div className={styles.container}>
      {edit ? (
        <>
          <TextField
            error={goalError ? true : false}
            id="goalInput"
            type="number"
            defaultValue={userGoal}
            helperText={goalError}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleGoalInputChange}
          />
          <Button
            variant="contained"
            onClick={handleGoalSubmit}
            disabled={goalError ? true : false}
          >
            set
          </Button>
        </>
      ) : (
        <Typography
          variant="h2"
          onClick={() => setEdit(true)}
          className={styles.goal}
        >
          {userGoal}
        </Typography>
      )}
    </div>
  );
};

export { Goal };
