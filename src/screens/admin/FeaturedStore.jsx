import React, { useState } from "react";
import { TextField } from "@mui/material";
import UploadImg from "../../components/UploadImg";
import useAuth from "../../hooks/useAuth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Routesaddress} from '../../utils/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '../../components/Table'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const FeaturedStore = () => {
const [user, setUser] = React.useState({email:'',password:""});

    const { auth,uploadIMg,theme } = useAuth();
  const AddStore = () => {
    const [getImg, setGetImg] = React.useState({url:'',file:File});
    const [value, setValue] = React.useState({
      desc: "",
      title: "",
    });
    const handlerChange = (e) => {
      const { name, value: values } = e.target;
      setValue({
        ...value,
        [name]: values,
      });
    };
    const handlerSUbmit = () => {
      const resolveAfter3Sec = new Promise(resolve =>{

      uploadIMg(getImg.url,getImg.file).then((imgpro)=>
      {
        setTimeout(resolve, 3000)

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${auth.token}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "title": value.title,
          "description": value.desc,
          "storePicturePath": imgpro
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${Routesaddress}/createFeaturedStores/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `bearer ${auth.token}`);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          fetch(`${Routesaddress}/getFeaturedStores/`, requestOptions)
            .then(response => response.json())
            .then(result =>{
              toast.promise(
                resolveAfter3Sec,
                {
                  pending: 'FeatureStore is Creating',
                  success: 'FeatureStore is Create Successfull 👌',
                  error: 'FeatureStore is Create Failed 🤯'
                },
                {
                  position:toast.POSITION.TOP_CENTER
                }
            )
              setSelected(false)
              setGetData(result.data.featured_stores)})
            .catch(error => console.log('error', error));
        })
        .catch((error) => console.log("error", error));
      })
    })
    };

    return (
    <div className="w-[60%] ml-4 bg-cardColor px-4 py-4 rounded-xl" >
        <div className="w-full  flex flex-col">
          <div className="flex justify-between py-2 px-2 items-center">
          <h1 className="text-xl font-bold text-mainTextColor font-[SF-Pro-Display-Regular]">Feature Store Info</h1>
          <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={()=>setSelected(false)}>
            <FontAwesomeIcon icon={faXmark}/>
          </h1>
          </div>
          <div className="flex gap-4 my-2 ">
          <div className="px-2 w-full rounded bg-background">
<input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
              placeholder="Title"
              variant="standard"
              name="title"
/>

</div>
          <div className="px-2 w-full rounded bg-background">
<input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
placeholder="Description"
             name="desc"
             variant="standard"
/>

</div>
           
          </div>
        
      
          <div className="">
            <h1 className="text-xl my-4 text-mainTextColor font-bold font-[SF-Pro-Display-Regular]">Gallery</h1>
            <div className={` w-full flex items-center ${theme=='light'?'bg-white':' bg-background'} justify-center h-[200px]  rounded-md`}>
              <UploadImg setGetImg={setGetImg} />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlerSUbmit}
            className={`mt-2 uppercase font-[SF-Pro-Display-Regular] px-4 cursor-pointer ${theme=='light'?'text-white bg-[#82b012]':'text-white bg-background'} py-3 rounded`}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  };
  
  
  
  const [getData,setGetData] = React.useState([])
  const [selected,setSelected] = React.useState(false)
  const handlerCLick = (name,id)=>{
      let updateData = [...getData]
      if(name == 'Visible'){
        updateData = updateData.filter((items)=>items.id === id)
      } else if(name == 'Delete'){
        updateData = updateData.filter((items)=>items.id !== id)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${auth.token}`);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
fetch(`${Routesaddress}/deleteFeaturedStores/?id=${id}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    toast.success(result.message,{
      position:toast.POSITION.TOP_CENTER
    })
  })
  .catch(error => console.log('error', error));
      }
      setGetData(updateData)
    }
    React.useEffect(() => {
      if(getData == ''){
        setEmpty(true)
      }
    }, [])
const [loading,setLoading]=React.useState(true)

const [empty,setEmpty] = React.useState(false)
React.useEffect(() => {
  var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${auth.token}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
fetch(`${Routesaddress}/getFeaturedStores/`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    const rows = result.data.featured_stores.map((items)=>createData(
items.id,
items.title,
items.storePicturePath,
items.description,
items.is_featured,
items.is_active,
items.id,
    ),)
    setGetData(rows)
    setLoading(false)
  })
  .catch(error => console.log('error', error));
}, [])


const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'storePicturePath',
    numeric: true,
    disablePadding: false,
    label: 'Image',
    type:'image'

  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'is_featured',
    numeric: true,
    disablePadding: false,
    label: 'Featured',
  },
  {
    id: 'is_active',
    numeric: true,
    disablePadding: false,
    label: 'Active',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    type:'action'
  },
];
function createData(
  id,
  title,
  storePicturePath,
  description,
  is_featured,
  is_active,
  action,
  ) {
return {
id,
title,
storePicturePath,
description,
is_featured,
is_active,
action,
};
}

  return (
      <div className="">
    {selected?    <div className="w-full h-full flex gap-4 ">
    <AddStore />
    </div>  :(
        <div className="">
        <div className="flex justify-between my-4 mr-4">
        <div className="px-4 ">
            <h1 className={`border-b border-t-0 border-x-0 border-4 border-white inline ${theme=='light'?'text-[#82b012] border-[#82b012]':'border-white text-white'} text-5xl font-bold font-[SF-Pro-Display-Regular] tracking-wide`}>Featured Store</h1>
          </div>
            <button onClick={()=>setSelected(true)}  className={`mt-2 uppercase px-4 cursor-pointer ${theme =='light'?'text-white bg-[#82b012]':'text-white bg-cardColor'} py-3 rounded font-[SF-Pro-Display-Regular]`}>+ ADD FavouriteStore</button>
        </div>
        <div className="mx-4">
              <Table headCells={headCells} rows={getData} handlerCLick={handlerCLick} loading={loading} skeletonNo={7}/>
        </div>
        </div>
      )}
      <ToastContainer  />

    </div>
  );
};

export default FeaturedStore;



// <table className='w-full '>
// <thead>
//   <tr>
//     <th className='text-start px-4 py-4 bg-gray-200 border-b border-gray-300'>Title</th>
//     <th className='text-start px-4 py-4 bg-gray-200 border-b border-gray-300'>Image</th>
//     <th className='text-start px-4 py-4 bg-gray-200 border-b border-gray-300'>Description</th>
//     <th className='text-start px-4 py-4 bg-gray-200 border-b border-gray-300'>Featured</th>
//     <th className='text-start px-4 py-4 bg-gray-200 border-b border-gray-300'>Active</th>
//     <th className='text-start px-4 py-4 bg-gray-200 border-b border-gray-300'>Action</th>
//   </tr>
// </thead>

// {empty?<div className="flex justify-center  items-center w-full h-full">
//   {/* <img width={100} height={100} src={Nodata} alt="" /> */}
// </div>:(
// <tbody>
//   {getData.map((items,index)=>(
//   <tr key={items.id}>
//     <td className='px-4 py-4 border-b border-gray-300'>{items.title}</td>
//     <td className='px-4 py-4 border-b border-gray-300'>
//         <img src={items.storePicturePath} className='w-20' alt="" />
//     </td>
//     <td className='px-4 py-4 border-b border-gray-300'>{items.description}</td>
//     <td className='px-4 py-4 border-b border-gray-300'>{`${items.is_featured}`}</td>
//     <td className='px-4 py-4 border-b border-gray-300'>{`${items.is_active}`}</td>
//     <td className='px-4 py-4 border-b border-gray-300 '>
//     <div className="flex gap-2  items-center">
//       <span className='cursor-pointer' onClick={()=>handlerCLick('Edit',items.id)}><EditIcon  style={{ color: "#9cb651" }}/></span>
//       <span className='cursor-pointer' onClick={()=>handlerCLick('Delete',items.id)}>
//         <DeleteIcon  style={{ color: "#9cb651" }}/>
//       </span>
//     </div>
//     </td>
//   </tr>
//   ))}
// </tbody>
// )}

// </table>