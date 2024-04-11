import React from "react";
// import { useCountdown, formatTime } from "../../hooks/useCount";

const CountDownTimer = ({ expires, onResend }) => {
  // const timeLeft = useCountdown(expires);

  // return (
  //   <div className="mt-[20px] text-xl">
  //     {timeLeft > 0 ? (
  //       <p>Did't get the code ? {formatTime(timeLeft)}</p>
  //     ) : (
  //       <p>
  //         Didn't get the code?{" "}
  //         <span
  //           className="cursor-pointer text-customGreen hover:text-customGreen"
  //           onClick={onResend}
  //         >
  //           Resend
  //         </span>
  //       </p>
  //     )}
  //   </div>
  // );

  return (
    <div className="mt-[20px] text-xl">
      <p>
        Didn't get the code?{" "}
        <span
          className="cursor-pointer text-customGreen hover:text-customGreen"
          onClick={onResend}
        >
          Resend
        </span>
      </p>
    </div>
  );
};

export default CountDownTimer;
