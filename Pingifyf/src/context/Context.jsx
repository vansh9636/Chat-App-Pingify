import  {React, createContext,useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom';
export const Context = createContext()
const ContextProvider = ({ children }) => {
    const [showpass, setshowpass] = useState(false);
    const [userdata, setuserdata] = useState(null);
    const contextValue = {
        showpass,setshowpass,
        userdata,setuserdata
    }
  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider 