import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import CommonLayout from "../../layout/AuthLayout";
import InputWithIcon from "../../components/InputWithIcon";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import signInSchema from "../../validators/signInSchema";
import { Toast } from "../../utils/Toasts";

import { ReactComponent as BackArrow } from "../../assets/back.svg";
import { ReactComponent as EmailSvg } from "../../assets/email.svg";
import { ReactComponent as PasswordSvg } from "../../assets/password.svg";
import { signin } from "../../redux/slices/authSlice";
import { useUnauth } from "../../hooks/useAuth";

const SignIn = () => {
  useUnauth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    dispatch(signin(data)).then((response) => {
      if (
        response.payload.success === "True" ||
        response.payload.success === true
      ) {
        localStorage.setItem("accessToken", response.payload.data.access);
        Toast.success(response.payload.message);
        navigate("/dashboard");
      }
    });
  };

  return (
    <CommonLayout>
      <div className="col-span-7 lg:col-span-3  bg-black text-white flex justify-center items-center lg:items-start flex-col h-screen order-0 lg:order-1 px-3 lg:px-0">
        <div className="w-full max-w-[430px] pl-[0px] lg:ml-[40px] 2xl:ml-[140px] pr-0 md:pr-10 xl:pr-0">
          <div className="mb-8">
            <button className="mb-4" onClick={() => navigate(-1)}>
              <BackArrow />
            </button>
            <h1 className="text-4xl text-center lg:text-left font-extrabold mb-2">
              Ready to Use AI50?
            </h1>
            <p className="text-lg text-center lg:text-left">Sign In</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithIcon
              icon={EmailSvg}
              placeholder="Email Address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <InputWithIcon
              icon={PasswordSvg}
              placeholder="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
            <p className="text-base text-end text-customGreen  ">
              <span
                className="cursor-pointer"
                onClick={() => navigate("/forgot-password")}
              >
                {" "}
                Forgot Password?
              </span>
            </p>
            <ButtonWithLoader isLoading={loading} disabled={loading}>
              Sign In
            </ButtonWithLoader>
          </form>
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
          <p className="my-10 border-t border-gray-400 text-sm text-center"></p>
          <p className="text-xl font-semibold text-center lg:text-left">
            <Link
              to="/signup"
              className="underline text-customGreen text-center lg:text-left "
            >
              Sign up
            </Link>
            &nbsp;If you don’t have an account
          </p>
        </div>
      </div>
    </CommonLayout>
  );
};

export default SignIn;
