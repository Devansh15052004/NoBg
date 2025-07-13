import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [credits, setCredits] = useState(false);
  const { getToken } = useAuth();
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const loadUserCredits = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(backendUrl + "/users/credits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetching credits...");
      console.log("credits response:", response.data);

      if (response.data.success) {
        setCredits(response.data.data.credits);
      } else {
        toast.error("Error in loading credits");
      }
    } catch (error) {
      toast.error("Error in loading credits: " + error.message);
    }
  }
  const removeBg = async (selectedImage) => {
    try {
      if (!isSignedIn) {
        return openSignIn();
      }
      setImage(selectedImage);
      setResultImage(false);
      navigate("/result");
      const token = await getToken();
      const formData = new FormData();
      selectedImage && formData.append("image_file", selectedImage);
      const { data: base64Image} = await axios.post("http://localhost:8080/api/images/remove-background",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setResultImage(`data:image/png;base64,${base64Image}`);
      setCredits(credits - 1);
    } catch (error) {
      console.log(error);
      toast.error("Error removeing the background image.");
    }
  };
  const contextValue = {
    credits,
    setCredits,
    image,
    setImage,
    resultImage,
    setResultImage,
    backendUrl,
    loadUserCredits,
    removeBg,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
