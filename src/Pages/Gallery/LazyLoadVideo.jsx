import React, { useRef, useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../assets/Contexts/AppContext';

const LazyLoadVideo = ({ videoData, fetchMoreVideos }) => {
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && fetchMoreVideos) {
      setIsIntersecting(true);
      fetchMoreVideos();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust the threshold as needed
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [fetchMoreVideos]);

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ display: isIntersecting ? 'block' : 'none' }}
      >
        <source src={videoData.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>{videoData.title}</p>
    </div>
  );
};




const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
//   const [page, setPage] = useState(1);
const { dbLocation } = useContext(AppContext)

  const fetchMoreVideos = async () => {
    try {
      // Simulate an API call to fetch more videos
    //   const response = await fetch(`https://api.example.com/videos?page=${page + 1}`);
      axios.get(`${dbLocation}/videos.php/${page}/1`).then(function(res){

          const newVideos = res.data;
          console.log(res.data)
          setVideos((prevVideos) => [...prevVideos, ...newVideos]);
          setPage(page + 1);
          
        // setVideos(res.data)
    })

    } catch (error) {
      console.error('Error fetching more videos:', error);
    }
  };

  useEffect(() => {
    // Initial data fetching
    fetchMoreVideos();
  }, []);

  return (
    <div>
      {videos.map((video, index) => (
        <LazyLoadVideo
          key={index}
          videoData={video}
          fetchMoreVideos={fetchMoreVideos}
        />
      ))}
    </div>
  );
};

export default VideoList;
