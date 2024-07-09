import { createSlice } from "@reduxjs/toolkit";

const highScoresExample = [
    {
        name: "John Doe",
        score: 100000,
    },
    {
        name: "Jane Doe",
        score: 90000,
    },
    {
        name: "John Smith",
        score: 80000,
    },
    {
        name: "Jane Smith",
        score: 70000,
    }
];


const initialState = {
    initialScore: 100000,
    highScores: localStorage.getItem("highScores") ? JSON.parse(localStorage.getItem("highScores")) : highScoresExample,
};

export const scoreSlice = createSlice({
    name: "score",
    initialState,
    reducers: {
        updateScore: (state, action) => {
            state.initialScore = action.payload;
        },
        resetScore: (state) => {
            state.initialScore = 100000;
        },
    },
});

export const { updateScore, resetScore } = scoreSlice.actions;

export const selectScore = (state) => state.score.initialScore;

export default scoreSlice.reducer;