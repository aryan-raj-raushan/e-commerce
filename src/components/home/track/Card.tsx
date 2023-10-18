const FeatureCard = ({ title, description, icon, mode }:any) => {
    return (
      <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
        <div
          className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"
          style={{
            backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          {icon}
          <h2
            className="title-font font-medium text-lg text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {title}
          </h2>
          <p className="leading-relaxed">{description}</p>
        </div>
      </div>
    );
  }
  
  export default FeatureCard;