import React from "react";

import CommonLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { EmailBlackIcon, GoogleIcon } from "../../assets";
import { useUnauth } from "../../hooks/useAuth";

const SocialSignIn = () => {
  useUnauth();
  const navigate = useNavigate();
  return (
    <CommonLayout>
      <div className="col-span-7 lg:col-span-3  bg-black text-white flex justify-center items-center lg:items-start flex-col h-screen order-0 lg:order-1 px-3 lg:px-0">
        <div className="w-full max-w-[430px] pl-[0px] lg:ml-[40px] 2xl:ml-[140px] pr-0 md:pr-10 xl:pr-0">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold mb-2">Ready to Use AI50?</h1>
            <p className="text-lg text-center lg:text-left ">Sign In</p>
          </div>
          <button
            className="bg-white  hover:bg-grey text-black text-xl font-bold py-2 px-4 rounded  w-full mb-5 icon-btn"
            onClick={() => navigate("/signin")}
          >
            <div className="inline-flex  items-center">
              <EmailBlackIcon />
              <span className="text-black ml-3 ">Sign In with Email</span>
            </div>
          </button>

          <button
            className="bg-white  hover:bg-grey text-black text-xl font-bold py-2 px-4 rounded  w-full mb-5  "
            onClick={() => console.log("google")}
          >
            <div className="inline-flex items-center">
              <GoogleIcon className="ml-3" />
              <span className="text-black ml-6 ">Sign In with Google</span>
            </div>
          </button>

          <p className="mt-8 text-xl ">
            By signing up, you agree to the{" "}
            <Link to="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="underline">
              Privacy Policy
            </Link>
            .
          </p>

          <p className="my-10 border-t border-gray-400 text-sm text-center mt-5"></p>
          <p className="text-xl font-semibold text-center lg:text-left">
            <Link to="/signin" className="underline text-customGreen">
              {""}
              Sign in{""}
            </Link>{" "}
            &nbsp;If you have an account
          </p>
        </div>
      </div>
    </CommonLayout>
  );
};

export default SocialSignIn;
