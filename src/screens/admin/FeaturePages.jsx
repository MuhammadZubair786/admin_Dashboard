import React, { useState } from "react";
import { TextField } from "@mui/material";
import UploadImg from "../../components/UploadImg";
import useAuth from "../../hooks/useAuth";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Routesaddress} from '../../utils/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '../../components/Table'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FeaturePages = () => {
  const { auth,uploadIMg,theme } = useAuth();
  const [loading,setLoading]=React.useState(true)
  const [getData,setGetData] = React.useState([])
  const [selected,setSelected] = React.useState(false)
  const headCells = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'Id',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Title',
    },
    {
      id: 'image',
      numeric: true,
      disablePadding: false,
      label: 'Image',
    type:'image'

    },
    {
      id: 'action',
      numeric: true,
      disablePadding: false,
      label: 'Action',
      type:'action'
    },
  ];
  const AddFeaturePages = () => {
    const [getImg, setGetImg] = React.useState({url:'',file:File});

    const [value, setValue] = React.useState({
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
      console.log(loading)
      const resolveAfter3Sec = new Promise(resolve =>{
        uploadIMg(getImg.url,getImg.file).then((imgpro)=>
      {
        setTimeout(resolve, 3000)

          var myHeaders = new Headers();
          myHeaders.append("Authorization", `bearer ${auth.token}`);
          myHeaders.append("Content-Type", "application/json");
          var raw = JSON.stringify({
            title: value.title,
            storePicturePath: imgpro,
          });
          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };
          fetch(`${Routesaddress}/createFeaturePages/`, requestOptions)
            .then((response) => response.json())
            .then((result) => { 
              if(result.status == true){
                  toast.promise(
                    resolveAfter3Sec,
                    {
                      pending: 'Featurepage is Creating',
                      success: 'Featurepage is Create Successfull 👌',
                      error: 'Featurepage is Create Failed 🤯'
                    },
                    {
                      position:toast.POSITION.TOP_CENTER
                    }
                )
                }
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `bearer ${auth.token}`);
                var requestOptions = {
                  method: 'GET',
                  headers: myHeaders,
                  redirect: 'follow'
                };
                fetch(`${Routesaddress}/getFeaturePages`, requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    const rows = result.data.map((items)=>createData(items.id,items.title,items.storePicturePath,items.id),)
                    setGetData(rows)
                setSelected(false)
                setLoading(false)
              }
                )
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
          <h1 className="text-xl font-bold text-mainTextColor font-[SF-Pro-Display-Regular] tracking-wide">Feature Pages</h1>
          <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={()=>setSelected(false)}>
            <FontAwesomeIcon icon={faXmark}/>
          </h1>
          </div>
          <div className="flex gap-4 my-2 ">
          <div className="px-2 w-full rounded bg-background">
<input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
            placeholder="title"
            variant="standard"
            name="title"
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
            className={`mt-2 uppercase  font-[SF-Pro-Display-Regular] px-4 cursor-pointer ${theme=='light'?'text-white bg-[#82b012]':'text-white bg-background'} py-3 rounded`}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  };
  
  React.useEffect(() => {
    var myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${auth.token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(`${Routesaddress}/getFeaturePages`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      const rows = result.data.map((items)=>createData(items.id,items.title,items.storePicturePath,items.id),)
       setGetData(rows)
       setLoading(false)
      })
    .catch(error => console.log('error', error));
  }, [])
  function createData(id,name,
    image,
    action
    ) {
  return {
    id,
    name,
    image,
    action
  };
  }
  const handlerCLick = (name,id)=>{
    let updateData = [...getData]
    if(name == 'Visible'){
      updateData = updateData.filter((items,index)=>items.id === id)
    }else if(name == 'Edit'){
      let filter  = updateData.find((items,index)=>items.id === id)
      // setEdit(filter)
    } else if(name == 'Delete'){
      updateData = updateData.filter((items,index)=>items.id !== id)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${auth.token}`);
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };
      fetch(`${Routesaddress}/deleteFeaturePages/${id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          if(result.status == true){
            toast.success(result.message,{
              position:toast.POSITION.TOP_CENTER
            })
          }
          })
        .catch(error => console.log('error', error));
    }
    // updateData.length?setGetData(updateData):setEmpty(true)
    setGetData(updateData)
  }
  
  return (
    <div className="">
    {selected?<div className="w-full h-full flex gap-4 ">
    <AddFeaturePages />
    </div>:(
        <div className="">
        <div className="flex justify-between my-4 mr-4">
        <div className="px-4 ">
            <h1 className={`border-b border-t-0 border-x-0 border-4 border-white inline ${theme=='light'?'text-[#82b012] border-[#82b012]':'border-white text-white'} text-5xl font-bold font-[SF-Pro-Display-Regular]`}>Featured Pages</h1>
          </div>
            <button onClick={()=>(setSelected(true),setLoading(true))}  className={`mt-2 uppercase px-4 cursor-pointer ${theme =='light'?'text-white bg-[#82b012]':'text-white bg-cardColor'} py-3 rounded font-[SF-Pro-Display-Regular]`}>+ ADD FEATURE PAGES</button>
        </div>
      <div className="mx-4 ">
           <Table headCells={headCells} rows={getData} handlerCLick={handlerCLick} loading={loading} skeletonNo={4}/>
      </div>
        </div>
      )}
      <ToastContainer  />
    </div>
  )
}

export default FeaturePages