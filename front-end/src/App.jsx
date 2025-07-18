import "@mantine/core/styles.css";
import Menubar from "./components/Menubar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserSyncHandler from "./components/UserSyncHandler";
import { SignedIn } from "@clerk/clerk-react";
import Result from "./Pages/Result";
import { RedirectToSignIn,SignedOut } from "@clerk/clerk-react";
export default function App() {
  return (
    <>
      <SignedIn>
        <UserSyncHandler />
      </SignedIn>
      <Menubar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/result" element={
          <>
            <SignedIn>
              <Result/>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn/>
            </SignedOut>
          </>
        }/>
      </Routes>
      <Footer></Footer>
    </>
  );
}
