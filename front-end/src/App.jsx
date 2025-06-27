// import { useState } from "react";
import "@mantine/core/styles.css";
import Menubar from "./components/Menubar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import { Routes,Route } from "react-router-dom";
// imprt {Routes}
import { Toaster } from "react-hot-toast";
// import { Slider } from '@mantine/core';
export default function App() {
  return (
    <>
      <Menubar />
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}
