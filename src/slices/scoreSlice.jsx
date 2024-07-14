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
        score: 80000,
    }
];


const initialState = {
    initialScore: 100000,
    highScores: localStorage.getItem("highScores") ? JSON.parse(localStorage.getItem("highScores")) : highScoresExample,
    itemList : [],
    sounds:false,
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
        addHighScore: (state, action) => {
            state.highScores.push(action.payload);
            state.highScores.sort((a, b) => b.score - a.score);
            state.highScores = state.highScores.slice(0, 5);
            localStorage.setItem("highScores", JSON.stringify(state.highScores));
        },
        addItemList: (state, action) => {
            state.itemList.push(action.payload);
        },
        setSounds: (state, action) => {
            state.sounds = action.payload;
        }

    },
});

export const { updateScore,
     resetScore,
    addItemList,
    addHighScore,
    setSounds
    } = scoreSlice.actions;

export const selectScore = (state) => state.score.initialScore;
export const selectHighScores = (state) => state.score.highScores;
export const selectItemList = (state) => state.score.itemList;
export const selectSounds = (state) => state.score.sounds;

export default scoreSlice.reducer;