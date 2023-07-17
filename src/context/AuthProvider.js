import { createContext, useState } from "react";
import {Routesaddress} from '../utils/api'


export const THEME_CONTEXT_DEFAULT= {
  theme: "light",
  setTheme: () => null,
};
const AuthContext = createContext(THEME_CONTEXT_DEFAULT);


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const uploadIMg = async(url,file)=>{
        var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${auth.token}`);
    var formdata = new FormData();
formdata.append("file", file);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    let respon = await fetch(`${Routesaddress}/uploadfile/profile`, requestOptions)
    let result = await respon.json()
    if(result.status == true){
            // alert('img uploded')
            return result.filename
        }else {
          alert('img not uploded')
        }
      }
  const [theme, setTheme] = useState("light");

    return (
        <AuthContext.Provider value={{theme, setTheme, auth, setAuth,uploadIMg }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

