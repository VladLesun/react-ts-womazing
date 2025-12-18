import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
	userId: null | string;
}

const initialState: IAuthState = {
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
