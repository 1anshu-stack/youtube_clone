import { createSlice } from '@reduxjs/toolkit'
import { getHomePageVideos } from '../../store/reducer/getHomePageVideos';

const initialState = {
    video: [],
    currentPlaying: null,
    searchTerm: "",
    searchResult: [],
    nextpageToken: null,
    recommendedVideo: []
};

const youtubeSlice = createSlice({
    name: "youtubeApp",
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
            
        })
    }
});

export default youtubeSlice.reducer;