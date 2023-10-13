import React, { useContext } from "react";
import myContext from "../../context/myContext";
import FeatureCard from "./Card";
import { cardData } from "../../const/Const";

const Track = () => {
  const context = useContext(myContext);
  const { toggleMode, mode } = context;
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 md:py-5  mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            {cardData.map((card, index) => (
              <FeatureCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                mode={mode}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Track;
