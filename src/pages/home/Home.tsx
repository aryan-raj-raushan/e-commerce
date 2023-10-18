import Layout from "../../components/layout/layout";
import HeroSection from "../../components/heroSection/HeroSection";
// import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import Categories from "../../components/categories/Categories";
import Trending from "../../components/trending/Trending";

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
