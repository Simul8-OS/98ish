import {useState} from "react"
import youtube from './apis/youtube'
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const VideoPlayer = () => {
    const [videos, setVideos] = useState([])
    const [selectedVideo, setSelectedVideo] = useState(null)

    const handleSubmit = async (termFromSearchBar) => {
      const response = await youtube.get('/search', {
          params: {
              q: termFromSearchBar
          }
      })

      setVideos(response.data.items)
    };

    const handleVideoSelect = (video) => {
      setSelectedVideo(video)
    }

    return (
      <div>
          <SearchBar handleFormSubmit={handleSubmit}/>
          <VideoDetail video={selectedVideo}/>
          <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
      </div>
  )
}
  
export default VideoPlayer;