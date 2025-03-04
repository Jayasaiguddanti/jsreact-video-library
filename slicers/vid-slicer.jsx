import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    Videos:[],
    Videoscount:0
}

const videoSlicer = createSlice({
    name: 'Videoslice',
    initialState,
    reducers: {
        addToviewlater:(state, action)=>{
            state.Videos.push(action.payload);
            state.Videoscount = state.Videos.length;
        }
    }
})
export const {addToviewlater} = videoSlicer.actions;
export default videoSlicer.reducer;