import { BrowserRouter, Routes, Route } from "react-router-dom";

const VideoPlayer = () => (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Feed />} />
        </Routes>
    </BrowserRouter>
  );
  
  export default VideoPlayer;