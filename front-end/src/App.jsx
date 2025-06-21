// import { useState } from "react";
import "@mantine/core/styles.css";
import Menubar from "./components/Menubar";
import Home from "./Pages/Home";
// import { Slider } from '@mantine/core';
export default function App() {
  return (
    <>
      <Menubar />
      <Home></Home>
    </>
  );
}
