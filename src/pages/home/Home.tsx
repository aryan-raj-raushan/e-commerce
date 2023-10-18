import Layout from "../../components/layout/layout";
import HeroSection from "../../components/home/heroSection/HeroSection";
// import Filter from "../../components/filter/Filter";
import Categories from "../../components/home/categories/Categories";
import ProductCard from "../../components/home/productCard/ProductCard";
import Trending from "../../components/home/trending/Trending";
import Track from "../../components/home/track/Track";
import Testimonial from "../../components/home/testimonial/Testimonial";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      {/* <Filter />  */}
      <Categories/>
      <ProductCard />
      <Trending/>
      <Track />
      <Testimonial />
    </Layout>
  );
};
export default Home;
