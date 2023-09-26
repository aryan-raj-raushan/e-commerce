// import { useContext } from "react";
import Layout from "../../components/layout/layout";
// import myContext from "../../context/myContext";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const Home = () => {
  // const context = useContext(myContext);
  const dispatch = useDispatch();
  const cartItem = useSelector((state:any)=> state.cart)

  // console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
  return (
    <Layout>
        <div className="flex gap-5 justify-center">
        {/* <button className=' bg-gray-300 p-5' onClick={()=> addCart()}>add</button>
        <button className=' bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button> */}
      </div>
      <HeroSection />
      <Filter /> 
      <ProductCard />
      <Track />
      <Testimonial />
    </Layout>
  );
};
export default Home;
