const VideoItem = ({video , handleVideoSelect, executeScroll}) => {
    return (
        <div onClick={ () =>{ 
            handleVideoSelect(video)
            executeScroll()
            }}>
            <img className="videoPreview" src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className="lead">{video.snippet.title.slice(0, 70)}</div>
        </div>
    )
};
export default VideoItem;