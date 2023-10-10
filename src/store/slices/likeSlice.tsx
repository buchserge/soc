import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface LikeStateType{
    isLiked:boolean
   
}
const initialState:LikeStateType={
isLiked:false,

}
export const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        setLikedTrue(state) {
            state.isLiked = true;
           
        },
        setLikedFalse(state) {
            state.isLiked = false;
        }
       
    }
})
export const { setLikedTrue, setLikedFalse } = likeSlice.actions
export default likeSlice.reducer
export const selectLike = (state: RootState) => state.like.isLiked
