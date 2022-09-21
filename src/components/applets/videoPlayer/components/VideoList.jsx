import VideoItem from './VideoItem';

const VideoList = ({videos , handleVideoSelect}) => {
    const renderedVideos =  videos.map((video) => {
        return (
            <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
        )
    });

    return <div className="d-flex justify-content-start gap-5 flex-wrap videoList mb-3">{renderedVideos}</div>;
};

export default VideoList;