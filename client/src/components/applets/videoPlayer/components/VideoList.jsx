import VideoItem from './VideoItem';

const VideoList = ({videos , handleVideoSelect}) => {
    const renderedVideos =  videos.map((video) => {
        return (
            <div className="col-12 col-md-4 mb-4">
                <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} />
            </div>
        )
    });

    return <div className="row text-center px-2">{renderedVideos}</div>;
};

export default VideoList;