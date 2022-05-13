import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { green, grey, indigo, red } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import React, { useState } from "react";

export default function FormComponents() {
  const [inputData, setInputData] = useState("");
  const [inputError, setInputError] = useState("");

  const [remainingTaskList, setRemainingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");

    if (inputData.length > 5 && inputData !== "") {
      const tasklist = {
        id: Math.random(),
        title: inputData,
      };

      const list = [...remainingTaskList];
      list.push(tasklist);

      // updating the task list
      setRemainingTaskList(list);
      setInputData("");
    }
  };

  const handleOnChange = ({ target }) => {
    target.value.length <= 5
      ? setInputError("Task must have atleast 5 characters")
      : setInputError("");
    setInputData(target.value);
  };

  const handleCheck = (id) => {
    const initial = [...remainingTaskList];
    const initialCompleteTask = [...completedTaskList];
    const currentTime = getCurrentTime(new Date());

    const Index = initial.findIndex((item) => item.id === id);
    // currentTime
    remainingTaskList[Index].currentTime = currentTime;
    initialCompleteTask.push(remainingTaskList[Index]);

    //deleting item from remaining
    const updatedRemainingTask = initial.filter((item) => item.id !== id);

    // update the complete task state
    setRemainingTaskList(updatedRemainingTask);
    setCompletedTaskList(initialCompleteTask);
  };

  const handleDelete = (id) => {
    const initial = [...remainingTaskList];
    const updated = initial.filter((item) => item.id !== id);
    setRemainingTaskList(updated);
  };

  const getCurrentTime = (date = new Date()) => {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let amPm = hour >= 12 ? "PM" : "AM";

    // Formatting date
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour "0" should be "12"
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let currentTime = hour + ":" + minutes + " " + amPm;
    return currentTime;
  };

  return (
    <Box mt={3} sx={styles.container}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3} sx={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" color="primary" sx={styles.heading}>
                React To-Do List App
              </Typography>
              <Grid container justifyContent="center">
                <Grid item xs={8}>
                  <TextField
                    id="inputTaskField"
                    label="Press Enter to add a Task"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    value={inputData}
                    onChange={handleOnChange}
                    error={inputError ? true : false}
                    helperText={inputError}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* task grid container */}
        <Grid item xs={12} sx={styles.secondColumn}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <List sx={styles.listContainer} dense={true}>
                <Typography
                  sx={styles.listContainerTitle}
                  variant="h5"
                  align="left"
                >
                  Remaining Task
                </Typography>
                {/* mapping remainingTaskList */}
                {remainingTaskList.length > 0 ? (
                  remainingTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar sx={styles.remainTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          style={{ color: green[500] }}
                          onClick={() => handleCheck(item.id)}
                        >
                          <DoneOutlineIcon />
                        </IconButton>
                        <IconButton
                          style={{ color: red[600] }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={styles.emptyMessage}>
                    No Task added yet!!
                  </Typography>
                )}
              </List>
            </Grid>

            <Grid item xs={12} sm={6}>
              <List sx={styles.listContainer} dense={true}>
                <Typography
                  sx={styles.listContainerTitle}
                  variant="h5"
                  align="left"
                >
                  Completed Task
                </Typography>
                {/* mapping completedTaskList */}
                {completedTaskList.length > 0 ? (
                  completedTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar sx={styles.completeTaskAvatar}>
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.currentTime}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={styles.emptyMessage}>
                    No Task completed yet!!
                  </Typography>
                )}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  container: {
    margin: "0 auto",
    padding: 4,
    maxWidth: "1140px",
  },
  formContainer: {
    padding: 6,
  },
  heading: {
    textAlign: "center",
    color: indigo[500],
    marginBottom: 4,
  },
  secondColumn: {
    marginTop: 3,
  },
  listContainer: {
    backgroundColor: "#fff",
    padding: 8,
    minHeight: "300px",
    height: "auto",
  },
  listContainerTitle: {
    paddingLeft: 2,
    marginBottom: 4,
    color: indigo[500],
  },
  remainTaskAvatar: {
    backgroundColor: indigo["A400"],
    color: "white",
  },
  emptyMessage: {
    color: grey[400],
    marginTop: 12,
  },
  completeTaskAvatar: {
    backgroundColor: green["600"],
    color: "white",
  },
};
