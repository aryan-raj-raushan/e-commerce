// import React, { useContext } from "react";
import Signup from "./SignUp";
import Header from "./Header";

const SignUpPage = () => {
  return (
   
    <div className="w-full bg-white pt-6 flex justify-center items-center">
      <div className="bg-white flex flex-col border border-gray-200 rounded-lg shadow-sm drop-shadow-md justify-center w-96 px-6 pt-4 pb-7">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/login"
        />
        <div className="min-h-[40vh]">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
