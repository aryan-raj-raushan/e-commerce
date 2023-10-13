const TestimonialCard = ({ name, role, imageSrc, text, mode }: any) => {
  return (
    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
      <div className="h-full text-center">
        <img
          alt="User"
          className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
          src={imageSrc}
        />
        <p
          style={{ color: mode === "dark" ? "white" : "" }}
          className="leading-relaxed"
        >
          {text}
        </p>
        <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
        <h2
          style={{ color: mode === "dark" ? "#ff4162" : "" }}
          className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase"
        >
          {name}
        </h2>
        <p
          style={{ color: mode === "dark" ? "white" : "" }}
          className="text-gray-500"
        >
          {role}
        </p>
      </div>
    </div>
  );
};
export default TestimonialCard;
