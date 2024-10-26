/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useHabitStore = create(
  devtools(
    persist(
      (set, get) => ({
        habits: [],
        isLoading: false,
        error: null,
        addHabit: (name, frequency) =>
          set((state) => ({
            habits: [
              ...state.habits,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          })),

        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),

        toggleHabit: (id, date) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((d) => d !== date)
                      : [...habit.completedDates, date],
                  }
                : habit
            ),
          })),

        fetchHabits: async () => {
          set({ isLoading: true });
          try {
            const currentHabits = get().habits;
            if (currentHabits.length > 0) {
              set({ isLoading: false });
              return
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const mockHabits = [
              {
                id: "1",
                name: "Read",
                frequency: "daily",
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
              {
                id: "2",
                name: "Exercise",
                frequency: "daily",
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ];
            set({ habits: mockHabits, isLoading: false });
          } catch (error) {
            set({ error: "Failed to fetch habits", isLoading: false });
          }
        },
      }),
      {
        name: "HabitStore", // Name for local storage
      }
    ),
    { name: "HabitStoreDevtools" } // Name for Redux DevTools
  )
);

export default useHabitStore;
