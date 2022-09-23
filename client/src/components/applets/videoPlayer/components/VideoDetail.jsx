const VideoDetail = ({ video, setShare, socket }) => {
    if (!video) {
      return <div className ="d-flex flex-column align-items-center">
         <h1>Enter search keyword to load...</h1>
         <br></br>
         <p style={{fontSize:'25px'}}>
         Search up some videos and stuff. Go ahead.       
  
         </p>
      </div>;
    }
  
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
      <div className="container">
        <iframe src={videoSrc} className="videoFrame w-100 px-2" allowFullScreen/>
    
        <div className="container-fluid mt-1">
          <h4>{video.snippet.title}</h4>

          <div className="row">
            <div className="col-9">
              <p className="lead">{video.snippet.description}</p>
            </div>
            <div className="col-3 text-center">
              <button
                className="btn btn-success mt-3"
                onClick={() => socket.emit("chat_message", {name: 'Brandon', content: videoSrc, type: 'share'})}
              >
              Share Video!
              </button>
            </div>
          </div>
        </div>
        
      </div>
    );
  };
  
  export default VideoDetail;