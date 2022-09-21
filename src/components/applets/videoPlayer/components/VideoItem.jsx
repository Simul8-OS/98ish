const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <div onClick={ () => handleVideoSelect(video)}>
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div>{video.snippet.title.slice(0, 70)}</div>
        </div>
    )
};
export default VideoItem;