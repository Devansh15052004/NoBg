import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [credits, setCredits] = useState(false);
  const { getToken } = useAuth();
  const loadUserCredits = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(backendUrl + "/users/credits", {
        headers: {Authorization: `Bearer ${token}`}});
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
  };
  const contextValue = {
    credits,
    setCredits,
    backendUrl,
    loadUserCredits
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
