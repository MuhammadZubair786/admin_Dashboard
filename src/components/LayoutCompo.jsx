import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {Outlet} from 'react-router-dom'
 
const LayoutCompo = () => {

    const [colpass,setColpass] = React.useState(false)
  
  return (
    <div className=" rounded-t-xl  mb-0 w-full h-full">
    {/* Header-Topbar */}
  <div className="flex border-t border-lightgray  w-full h-full">
    {/* Sidebar*/}
    <Sidebar colpass={colpass}/>
    <div className="w-full h-full">
    <Header setColpass={setColpass} colpass={colpass}/>
    {/* Main*/}
      <div className="w-full h-full">{<Outlet />}</div>
    </div>
  </div>
</div>
  );
};

export default LayoutCompo;
