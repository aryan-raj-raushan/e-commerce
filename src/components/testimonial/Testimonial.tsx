import React, { useContext } from "react";
import myContext from "../../context/myContext";
import { testimonialData } from "../../const/Const";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <div>
      <section className="text-gray-600 body-font mb-10">
        <div className="container px-5 py-10 mx-auto">
          <h1
            className=" text-center text-3xl font-bold text-black"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Testimonial
          </h1>
          <h2
            className=" text-center text-2xl font-semibold mb-10"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            What our <span className=" text-pink-500">customers</span> are
            saying
          </h2>
          <div className="flex flex-wrap -m-4">
      {testimonialData.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          name={testimonial.name}
          role={testimonial.role}
          imageSrc={testimonial.imageSrc}
          text={testimonial.text}
          mode={mode}
        />
      ))}
    </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
