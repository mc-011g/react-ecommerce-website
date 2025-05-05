import { User } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { value: User | null } = {
    value: null
};

export const userSliceDef = {
    name: 'user',
    initialState,
    reducers: {
        updateUserProfile: (state: { value: User | null; }, action: { payload: User; }) => {
            if (state.value) {
                state.value = { ...state.value, ...action.payload };
            }
        },
        logoutUser: (state: { value: User | null; }) => {
            state.value = null;
        },
        initializeUser: (state: { value: User | null }, action: { payload: User }) => {
            state.value = {
                ...state.value,
                ...action.payload,
            };
        }
    }
};

export const userSlice = createSlice(userSliceDef);

export const { updateUserProfile, logoutUser, initializeUser } = userSlice.actions;