import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import React from 'react'
import { RootState } from '../store';


export interface JwtType{
    jwtToken:string;
    refreshToken:string
}

    const initialState:JwtType={
        jwtToken:'',
    refreshToken:''}

export const jwtSlice = createSlice({

    name: 'jwt',
    initialState,
    reducers: {
        setJwtToken(state, action: PayloadAction<string>) {
            state.jwtToken = action.payload;
           
        },
        setRefreshToken(state, action: PayloadAction<string>) {
            state.refreshToken = action.payload;
        }
       
    }
})
export const { setJwtToken, setRefreshToken } = jwtSlice.actions
export default jwtSlice.reducer
export const selecJwt = (state: RootState) => state.jwt.jwtToken