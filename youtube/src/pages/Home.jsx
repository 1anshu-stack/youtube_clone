import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Slidebar from "../components/Slidebar";
import {useAppDispatch, useAppSelector} from "../hooks/useApp";
import { getHomePageVideos } from "../store/reducer/getHomePageVideos";

function Home(){
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);
    useEffect(()=>{
      dispatch(getHomePageVideos(false));
    },[dispatch])

    return (
        <>
          <Navbar />
          <Slidebar />
        </>
    )
}

export default Home;