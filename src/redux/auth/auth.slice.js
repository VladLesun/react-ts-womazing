import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userId: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.userId = action.payload;
		},
	},
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
