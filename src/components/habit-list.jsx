import React from "react";
import useHabitStore from "../store/store";
import {
  Box,
  Button,
  LinearProgress,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { CheckCircle, DeleteOutline } from "@mui/icons-material";

const AddHabitList = () => {
  const { habits, removeHabit, toggleHabit } = useHabitStore();
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit) => {
    let streak = 0;
    const currentDate = new Date();

    // Loop through consecutive days in reverse
    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1); // Move to the previous day
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <Box>
      {habits.map((habit) => (
        <Paper
          elevation={2}
          key={habit.id}
          sx={{ marginTop: 3, padding: "20px" }}
        >
          <ListItem>
            <ListItemText primary={habit.name} />
            <ListItemText primary={habit.frequency} />
            <ListItemText>
              <Button
                variant="outlined"
                color={
                  habit.completedDates.includes(today) ? "success" : "primary"
                }
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: habit.completedDates.includes(today)
                    ? "success.main"
                    : "primary.main",
                  "&:hover": {
                    backgroundColor: habit.completedDates.includes(today)
                      ? "success.dark"
                      : "primary.dark",
                  },
                }}
                onClick={() => toggleHabit(habit.id, today)}
                startIcon={<CheckCircle />}
              >
                {habit.completedDates.includes(today)
                  ? "Mark as Incomplete"
                  : "Mark as Complete"}
              </Button>
            </ListItemText>
            <ListItemText>
              <Button
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "red",
                  "&:hover": { backgroundColor: "darkred" },
                }}
                onClick={() => removeHabit(habit.id)} // Wrap in an arrow function
                startIcon={<DeleteOutline />}
              >
                Remove Habit
              </Button>
            </ListItemText>
          </ListItem>
          <Box sx={{ mt: 2 }}>
            <Typography>Current streak: {getStreak(habit)}</Typography>
            <LinearProgress
              variant="determinate"
              sx={{ mt: 2 }}
              value={(getStreak(habit) / 30) * 100}
            />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default AddHabitList;
