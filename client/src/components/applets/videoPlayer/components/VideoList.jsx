import VideoItem from './VideoItem';

const VideoList = ({videos , handleVideoSelect, executeScroll}) => {
    const renderedVideos =  videos.map((video) => {
        return (
            <div className="col-12 col-md-6 mb-4 videoItem">
                <VideoItem key={video.id.videoId} executeScroll={executeScroll} video={video} handleVideoSelect={handleVideoSelect} />
            </div>
        )
    });

    return <div className="row text-center px-2">{renderedVideos}</div>;
};

export default VideoList;