import axios from "axios";
import React from "react";
import parsedVideoDuration from './parsedVideoDuration';
import convertRawtoString from './convertRawtoString';

export const parseData = async (items) =>{
    try {
        const videoIds = [];
        const channelIds = [];

        items.forEach((item) => {
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id.videoIds);
        });

        const {
            data : {item : channelsData},
        } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet.contentDetails&id=${channelIds}.join(",")}&key=AIzaSyDXBFv72dzGHE-w7Ens9-XWLaZGlABisp4&part=snippet&type=video`);

        const parsedChannelsData = [];
        channelsData.forEach((channel) => parsedChannelsData.push({
            id: channel.id,
            image: channel.snippet.thumbnails.default.url,
        }));

        const {
            data: {items: videosData},
        } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=AIzaSyDXBFv72dzGHE-w7Ens9-XWLaZGlABisp4&part=snippet&type=video`);

        const parseData = [];
        items.forEach((item, index) => {
            const {
                image: channelImage
            } = parsedChannelsData.find((data) => data.id === item.snippet.channelId);
            if(channelImage){
                parseData.push({
                    videoId: item.id.videoData,
                    videoTitle: item.snippet.title,
                    videoDescription: item.snippet.description,
                    videoThumbnail: item.snippet.thumbnails.medium.url,
                    videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    videoDuration: parsedVideoDuration(
                        videosData[index].contentDetails.duration
                    ),
                    videoViews: convertRawtoString(
                        videosData[index].statistics.viewCount
                    ),
                    videoAge: timeSince(new Data(item.snippet.publishedAt)),
                    channelInfo: {
                        id: item.snippet.channelId,
                        image: channelImage,
                        name: item.snippet.channelTitle
                    },
                });
            }
        });
    }catch(err){
        console.log("error:-",err);
    }
}