import React from "react";
import {
  DarkModeIcon,
  FullScreenIcon,
  LanguageIcon,
  LightModeIcon,
  NotificationIcon,
  SearchIcon,
} from "../../assets";
import { useThemeProvider } from "../../utils/ThemeContext";
import ProfileHeader from "../ProfileHeader";

const Header = () => {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  const toggleMode = () => {
    if (currentTheme === "light") {
      changeCurrentTheme("dark");
    } else {
      changeCurrentTheme("light");
    }
  };

  const handleFullScreen = () => {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen();
    }
  };

  const handleClickOnNotification = () => {
    
  }

  return (
    // h-[72px] flex items-center justify-between px-6  bg-white  w-full fixed z-10
    <header className="header">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center ">
          <h1 className="text-xl font-semibold text-[22px] mr-3">AI Chat</h1>
          <div className="mr-3 bg-[#F2F2F2] px-3 py-2 rounded-lg">
            <span className="text-xl font-medium">120 Token Remaining</span>
          </div>
          <button className="border border-customGreen text-xl px-3 py-2 text-customGreen rounded b">
            Upgrade
          </button>
        </div>
        {/* Switch */}

        {/* Buttons */}
        <div className="flex items-center">
          <div className="max-w-24 flex items-center justify-between bg-[#F3F3F3] p-1 rounded mr-5">
            <button
              className={`mr-2 p-1 rounded ${
                currentTheme === "light" ? "bg-white " : ""
              }`}
              onClick={() => toggleMode("lightMode")}
            >
              <LightModeIcon />
            </button>
            <button
              className={` p-1 rounded ${
                currentTheme === "dark" ? "bg-white " : ""
              }`}
              onClick={() => toggleMode("darkMode")}
            >
              <DarkModeIcon />
            </button>
          </div>
          <button className="mr-5">
            <NotificationIcon />
          </button>
          <button className="mr-5">
            <SearchIcon />
          </button>
          <button className="mr-5">
            <LanguageIcon />
          </button>
          <button className="mr-5" onClick={handleFullScreen}>
            <FullScreenIcon />
          </button>
          {/* Profile */}
          <div className="flex items-center gap-4"></div>
          <ProfileHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
