const VideoDetail = ({ video }) => {
    if (!video) {
      return <div>
         <h1>Enter search keyword to load...</h1>
         <br></br>
         <p style={{fontSize:'25px'}}>
         Search up some videos and stuff. Go ahead.       
  
         </p>
      </div>;
    }
  
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
      <div>
        <iframe src={videoSrc} className="videoFrame w-100" allowFullScreen/>
    
        <div>
          <h4>{video.snippet.title}</h4>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    );
  };
  
  export default VideoDetail;