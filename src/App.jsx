import "./App.css";
import { Box, Button, Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabitForm from "./components/add-habit-form";
import AddHabitList from "./components/habit-list";
import { useEffect } from "react";

function App() {
  const store = useHabitStore();
  console.log("store", store);

  const { fetchHabits } = useHabitStore();
  useEffect(() => {
    fetchHabits();
  }, []);
  return (
    <div>
      <Container>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Habit Tracker
          </Typography>
          <AddHabitForm />
          <AddHabitList />
        </Box>
      </Container>
    </div>
  );
}

export default App;
