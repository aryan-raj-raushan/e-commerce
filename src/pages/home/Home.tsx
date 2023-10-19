import Layout from "../../components/layout/layout";
import HeroSection from "../../components/home/heroSection/HeroSection";
// import Filter from "../../components/filter/Filter";
import Categories from "../../components/home/categories/Categories";
import ProductCard from "../../components/home/productCard/ProductCard";
import Trending from "../../components/home/trending/Trending";
import Track from "../../components/home/track/Track";
import Testimonial from "../../components/home/testimonial/Testimonial";
import BeautyCare from "../../components/home/beauty/BeautyCare";
import { useContext } from "react";
import myContext from "../../context/myContext";
import FashionDesign from "../../components/home/fashion/FashionDesign";

const Home = () => {
  const context = useContext(myContext);
  const { mode, product } = context;
  return (
    <Layout>
      <HeroSection />
      {/* <Filter />  */}
      <Categories/>
      <ProductCard mode={mode} productData={product} title="New Arrivals"/>
      <Trending/>
      <BeautyCare/>
      <ProductCard mode={mode} productData={product} title="Beauty Care"/>
      <FashionDesign />
      <Track />
      <Testimonial />
    </Layout>
  );
};
export default Home;
