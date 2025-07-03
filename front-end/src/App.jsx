import "@mantine/core/styles.css";
import Menubar from "./components/Menubar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import { Routes,Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserSyncHandler from "./components/UserSyncHandler";
export default function App() {
  return (
    <>
    <UserSyncHandler></UserSyncHandler>
      <Menubar />
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}
