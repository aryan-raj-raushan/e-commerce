import React, { useEffect, useRef, useState } from "react";
import { BsPause, BsPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiVolumeMute, BiVolumeFull} from "react-icons/bi";


const Trending = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
  
    const togglePlayPause = () => {
      const video:any = videoRef.current;
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    const toggleMuteUnmute = () => {
      const video:any = videoRef.current;
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    };
  
    useEffect(() => {
      const video:any = videoRef.current;
      video.play().catch((error:any) => {
      });
    }, []);
    
  return (
    <div className="flex flex-col-reverse lg:flex-row mx-2 sm:mx-10 gap-4 mb-10">
       
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-medium">Trending Fashion</h2>
        <div className="flex flex-wrap mt-4 min-h-96 max-h-[480px]">
            <div className="flex flex-col text-start gap-1 w-1/3">
                <img src="https://m.media-amazon.com/images/I/51byp5tQ86L._UL1000_.jpg" alt="" width={300} height={100} className="min-h-[280px] max-h-[300px]"/>
                <h4 className="px-2 pt-1 text-lg text-black">Start with Rs. 899 only/-</h4>
                <p className="px-2">Premium brand tshirt</p>
                <p className="px-2 truncate">
                Unique Collection to your wardrobe casuals a hit of effortless cool with this best-looking t shirt.
                </p>
                <Link to="/" className="underline underline-offset-2 px-2">View all </Link>
            </div>
            <div className="flex flex-col text-start gap-1 w-1/3">
                <img src="https://m.media-amazon.com/images/I/617Oip+2w6L._UL1500_.jpg" alt="" width={300} height={100} className="min-h-[280px] max-h-[290px]" />
                <h4 className="px-2 pt-1 text-lg text-black">Start with Rs. 499 only/-</h4>
                <p className="px-2">100% cotton jeans</p>
                <p className="px-2 truncate">
                Skinny fit jeans that fits close to body through hip, thigh, knee and ankle
                </p>
                <Link to="/" className="underline underline-offset-2 px-2">View all </Link>
            </div>
            <div className="flex flex-col text-start gap-1 w-1/3">
                <img src="https://m.media-amazon.com/images/I/51skGOslykL.jpg" alt="" width={300} height={100} className="min-h-[290px] max-h-[300px]"/>
                <h4 className="px-2 pt-1 text-lg text-black">Start with Rs. 599 only/-</h4>
                <p className="px-2">Sports Shoes Collection</p>
                <p className="px-2 truncate">
                Breathable Sports Shoe
                </p>
                <Link to="/" className="underline underline-offset-2 px-2">View all </Link>
            </div>
            
        </div>
      </div>
      <div className="lg:w-1/2 h-full lg:mt-5 relative">
        <video ref={videoRef} loop autoPlay muted className="rounded-lg">
          <source
            src={require("../../assets/video/trending.mp4")}
            type="video/mp4"
          />
        </video>        
        <div className="video-controls space-x-1 absolute top-3 right-5 opacity-70">
          <button onClick={togglePlayPause}>
            {isPlaying ?   <BsPause size={22} className="bg-gray-200 rounded-full p-1"/> : <BsPlayFill size={22} className="p-1 bg-gray-200 rounded-full "/>}
          </button>
          <button onClick={toggleMuteUnmute}>
            {isMuted ? <BiVolumeFull  size={22} className="bg-gray-200 rounded-full p-1"/> : <BiVolumeMute  size={22} className="bg-gray-200 rounded-full p-1"/>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trending;
