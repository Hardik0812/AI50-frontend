import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="layout-content-wrapper ">
        <Header />
        <main className="bg-customGray h-full">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
