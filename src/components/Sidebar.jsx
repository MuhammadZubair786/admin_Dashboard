import React from "react";
import Logo from "../assets/logo-login - Copy.png";
import smailLogo from "../assets/smailLogo.jpeg";
import Person from "../assets/withoutcolor.png";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore,faChartLine,faTruckFast,faCartShopping,faBookmark} from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ colpass }) => {
  const { auth,theme, setTheme } = useAuth();
  const data =[
    
    {
      role: "subadmin",
      children: [
        {
          title: "Dashboard",
          icon: faStore,
          url:'dashboard'
        },
        {
          title: "About",
          icon: faStore,
          url:'About'
        },
        {
          title: "Gallery",
          icon: faStore,
          url:'Gallery'
        },
        {
          title: "Video",
          icon: faStore,
          url:'Video'
        },
        {
          title: "SeniorAdovcate",
          icon: faStore,
          url:'SeniorAdovcate'
        },
        {
          title: "SlidersImg",
          icon: faStore,
          url:'SlidersImg'
        },

        // SlidersImg
     
     
        {
          title: "Services",
          icon: faStore,
          url:'Services'
        },
        {
          title: "Contact",
          icon: faStore,
          url:'Contact'
        },
      ],
    }
  ];
  let activeStyle = {
    backgroundColor: "#ebf5d0",
    color: "#9eac71",
  };

  return (
    <div className={`${colpass ? "w-[100px]" : "w-[300px]"} px-4 py-4 ${theme=='light'?'bg-[#82b012]':'bg-cardColor'}  h-screen`}>
      <div className={`  rounded-md`}>
        {colpass ? (
          <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RUEgvlPUxDBePld_w24GjRdp0uo8Du1i1g&usqp=CAU"} width={100} height={40} alt="" />
        ) : (
          <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RUEgvlPUxDBePld_w24GjRdp0uo8Du1i1g&usqp=CAU"} width={200} height={40} style={{height:80}} alt="" />
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {data.map((items1)=>(
         
          items1.children.map((items,index) => (
            <NavLink 
            to={items.url}
            // style={({ isActive }) => (isActive ? activeStyle : undefined)}
            key={index}
            // onClick={()=>handlerClick(items1.name)}
            className={({isActive})=>`${theme=='light'?isActive?'bg-white text-[#9eb945]':'text-white':isActive?'bg-gray-900 text-white':'text-white'} py-2 px-4 cursor-pointer ${colpass&&'justify-center'} flex gap-2  rounded-md  `}>
              {!colpass ? (
                <div className={({isActive})=>`font-[SF-Pro-Display-Regular] ${theme=='light'?isActive?'text-[#9eac71]':"":'text-mainTextColor'} flex gap-2  items-center `}>
                  <FontAwesomeIcon icon={items.icon} className="text-xl mr-2"
                  />
                  {items.title}
                </div>
              ) : (
                <FontAwesomeIcon icon={items.icon} className="text-xl" />
                )}
                </NavLink>
          ))
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
