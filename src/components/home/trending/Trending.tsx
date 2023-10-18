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
    const data = [
      {
        imgSrc: 'https://m.media-amazon.com/images/I/51byp5tQ86L._UL1000_.jpg',
        price: 'Start with Rs. 899 only/-',
        title: 'Premium brand tshirt',
        description: 'Unique Collection to your wardrobe casuals a hit of effortless cool with this best-looking t shirt.',
        width: "300px"
      },
      {
        imgSrc: 'https://m.media-amazon.com/images/I/617Oip+2w6L._UL1500_.jpg',
        price: 'Start with Rs. 499 only/-',
        title: '100% cotton jeans',
        description: 'Skinny fit jeans that fits close to body through hip, thigh, knee, and ankle',
        width: "270px"
      },
      {
        imgSrc: 'https://m.media-amazon.com/images/I/51skGOslykL.jpg',
        price: 'Start with Rs. 599 only/-',
        title: 'Sports Shoes Collection',
        description: 'Breathable Sports Shoe',
        width: "300px"
      },
    ];
    
  return (
    <div className="flex flex-col-reverse lg:flex-row mx-2 sm:mx-10 gap-4 mb-10">
       
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-medium">Trending Fashion</h2>
        <div className="flex flex-wrap mt-4 min-h-96 max-h-[480px]">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col text-start gap-1 w-1/3 h-full">
          <img
            src={item.imgSrc}
            alt=""
            width={300}
            height={100}
            className={`max-h-[300px] min-h-[${item.width}] h-full`}
          />
          <h4 className="px-2 pt-1 text-lg text-black">{item.price}</h4>
          <p className="px-2">{item.title}</p>
          <p className="px-2 truncate">{item.description}</p>
          <Link to="/" className="underline underline-offset-2 px-2">
            View all
          </Link>
        </div>
      ))}
    </div>
      </div>
      <div className="lg:w-1/2 h-full lg:mt-5 relative">
        <video ref={videoRef} loop autoPlay muted className="rounded-lg">
          <source
            src={require("../../../assets/video/trending.mp4")}
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
