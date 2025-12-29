import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0);
const [step, setStep] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND;

  // Load credits when token changes
  useEffect(() => {
    console.log("Token changed:", token ? "exists" : "empty");
    if (token) {
      loadcreditData();
    } else {
      setUser(null);
      setCredit(0);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
    toast.info("Logged out successfully");
  };

  const generateImage = async (prompt) => {
   

    if (!token) {
      toast.error("Please login first!");
      setShowLogin(true);
      return null;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        {
          headers: { 
            token: token,
            'Content-Type': 'application/json'
          },
        }
      );

      if (data.success) {
        loadcreditData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadcreditData();
        if (data.creditBalance === 0) {
          toast.info("No credits left! Please purchase more.");
        }
        return null;
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(error.response?.data?.message || "Failed to generate image");
      return null;
    }
  };
// Add these functions after generateImage

const enhanceImage = async (imageFile) => {
  if (!token) {
    toast.error("Please login first!");
    setShowLogin(true);
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      backendUrl + "/api/image/enhance-image",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      loadcreditData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadcreditData();
      return null;
    }
  } catch (error) {
    console.error("Error enhancing image:", error);
    toast.error(error.response?.data?.message || "Failed to enhance image");
    return null;
  }
};

const removeBackground = async (imageFile) => {
  if (!token) {
    toast.error("Please login first!");
    setShowLogin(true);
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      backendUrl + "/api/image/remove-background",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      loadcreditData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadcreditData();
      return null;
    }
  } catch (error) {
    console.error("Error removing background:", error);
    toast.error(error.response?.data?.message || "Failed to remove background");
    return null;
  }
};

const removeText = async (imageFile) => {
  if (!token) {
    toast.error("Please login first!");
    setShowLogin(true);
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      backendUrl + "/api/image/remove-text",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      loadcreditData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadcreditData();
      return null;
    }
  } catch (error) {
    console.error("Error removing text:", error);
    toast.error(error.response?.data?.message || "Failed to remove text");
    return null;
  }
};

const uncropImage = async (imageFile) => {
  if (!token) {
    toast.error("Please login first!");
    setShowLogin(true);
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      backendUrl + "/api/image/uncrop-image",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      loadcreditData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadcreditData();
      return null;
    }
  } catch (error) {
    console.error("Error uncropping image:", error);
    toast.error(error.response?.data?.message || "Failed to uncrop image");
    return null;
  }
};

const replaceBackground = async (imageFile, prompt) => {
  if (!token) {
    toast.error("Please login first!");
    setShowLogin(true);
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      backendUrl + "/api/image/replace-background",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      loadcreditData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadcreditData();
      return null;
    }
  } catch (error) {
    console.error("Error replacing background:", error);
    toast.error(error.response?.data?.message || "Failed to replace background");
    return null;
  }
};

const cleanupImage = async (imageFile, maskFile) => {
  if (!token) {
    toast.error("Please login first!");
    setShowLogin(true);
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("mask", maskFile);

    const { data } = await axios.post(
      backendUrl + "/api/image/cleanup",
      formData,
      {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      loadcreditData();
      return data.resultImage;
    } else {
      toast.error(data.message);
      loadcreditData();
      return null;
    }
  } catch (error) {
    console.error("Error cleaning up image:", error);
    toast.error(error.response?.data?.message || "Failed to cleanup image");
    return null;
  }
};


  const loadcreditData = async () => {
    console.log("Loading credit data...");
    console.log("Backend URL:", backendUrl);
    console.log("Token:", token);

    if (!token) {
      console.log("No token available, skipping credit load");
      return;
    }

    try {
      const url = `${backendUrl}/api/user/credits`;
      console.log("Fetching from:", url);

      const { data } = await axios.get(url, {
        headers: { 
          token: token,
          'Content-Type': 'application/json'
        },
      });

      console.log("Credit data response:", data);

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
        console.log("Credits loaded:", data.credits);
        console.log("User loaded:", data.user);
      } else {
        console.warn("Failed to load credits:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error loading credits:", error);
      console.error("Error response:", error.response?.data);
      
      // If token is invalid, logout user
      if (error.response?.status === 401 || error.response?.data?.message?.includes('token')) {
        console.log("Invalid token, logging out...");
        logout();
      } else {
        toast.error(error.response?.data?.message || "Failed to load credit data");
      }
    }
  };

  const value = {
  user,
  setUser,
  showLogin,
  setShowLogin,
  token,
  setToken,
  backendUrl,
  credit,
  setCredit,
  logout,
  generateImage,
  enhanceImage,
  removeBackground,
  removeText,
  uncropImage,
  replaceBackground,
  loadcreditData,
   cleanupImage,
   step,
   setStep
};
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;