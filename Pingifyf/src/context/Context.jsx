import { React, createContext, useState, useEffect } from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';
export const Context = createContext()
const ContextProvider = ({ children }) => {
  const [showpass, setshowpass] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [loading, setloading] = useState(true);
  // for check login when user refresh/close the page
  useEffect(() => {
    const checklogin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/getLoggedInUser", {
          withCredentials: true
        });
        if (res.data.success) {
          console.log(res.data.user);
          setuserdata(res.data.user);
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setloading(false);
      }
    }
    checklogin();
  }, [])


  const contextValue = {
    showpass, setshowpass,
    userdata, setuserdata,
    loading
  }
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider 