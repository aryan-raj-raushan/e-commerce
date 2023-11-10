import Navbar from "../../components/navbar/Navbar";
import Header from "./Header";
import Login from "./Login";

const LoginPage = () => {
  return (
    <>
    <Navbar/>
     <div className="w-full bg-white pt-14 flex justify-center items-center">
      <div className="bg-white flex flex-col border border-gray-200 rounded-lg shadow-sm justify-center w-[360px] px-6 pt-4 pb-7">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>
    </>
   
  );
};

export default LoginPage;