import { useContext } from "react";
import Layout from "../../components/layout/layout";
import myContext from "../../context/myContext";

const Home = () => {
  const context = useContext(myContext);
  console.log(context); // {name: 'Kamal Nayan', class: '9 C'}
  // Destructure
  // const { state } = context;
  // console.log(state); // Kamal Nayan
  return (
    <Layout>
      {/* <h1>Name : {state.name}</h1> */}
      Home
    </Layout>
  );
};
export default Home;
