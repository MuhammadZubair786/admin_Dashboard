import React, { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import UploadImg from "../../components/UploadImg";
import useAuth from "../../hooks/useAuth";
import {Routesaddress} from '../../utils/api'
import Table from '../../components/Table'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faXmark} from '@fortawesome/free-solid-svg-icons'


const Store = () => {
const [edit,setEdit] = React.useState([])
const [user, setUser] = React.useState({email:'',password:""});
    const { auth,uploadIMg,theme } = useAuth();
  const AddStore = () => {
    const [getImg, setGetImg] = React.useState({url:'',file:File});
 

    const [value, setValue] = React.useState({
      username: "",
      desc: "",
      title: "",
      address: "",
      rating: "",
    });
    const handlerChange = (e) => {
      const { name, value: values } = e.target;
      setValue({
        ...value,
        [name]: values,
      });
    };
  const [dropDon,setDropDon] = React.useState(false)

const handlerSUbmit =async () => {
  const resolveAfter3Sec = new Promise(resolve =>{
    uploadIMg(getImg.url,getImg.file).then((imgpro)=>
    {
    setTimeout(resolve, 3000)
    
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${auth.token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    full_name: "string",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${Routesaddress}/create_store_user/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        setUser({email:result.data.email,password:result.data.password})
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${auth.token}`);
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        title: value.title,
        description: value.desc,
        storePicturePath: imgpro,
        address: value.address,
        rating: value.rating,
        email: result.data.email,
        is_featured:false,
        fevourite_store:dropDon
      });

      // window.confirm('email: '+result.data.email+" "+ 'password: '+result.data.password)
      toast.promise(
        resolveAfter3Sec,
        {
          pending: 'Storing is Creating',
          success: 'Storing is Create Successfull 👌',
          error: 'Storing is Create Failed 🤯'
        },
        {
          position:toast.POSITION.TOP_CENTER
        }
    )
    toast.promise(
      resolveAfter3Sec,
      {
        pending: 'credential is Creating',
        success: 'Email: '+result.data.email+" "+ 'Password: '+result.data.password,
        error: 'credential is Create Failed 🤯',
      },
      {
        autoClose: false,
        position:toast.POSITION.TOP_CENTER
      }
  )
      // notify('email: '+result.data.email+" "+ 'password: '+result.data.password)
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${Routesaddress}/stores/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `bearer ${auth.token}`);
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          fetch(`${Routesaddress}/stores/?skip=0`, requestOptions)
            .then(response => response.json())
            .then(result =>{
  const rows = result.data.map((items)=>createData(items.id,items.title,items.storePicturePath,items.address, items.description, items.is_featured,items.rating,items.email,items.id,items.fevourite_store),)
            setGetData(rows)
            setLoading(false)
            setSelected(false) 
            })
            .catch(error => console.log('error', error));
            
            })
        .catch((error) => console.log("error", error));

    })
    .catch((error) => console.log("error", error));
  })
});

};

    return (
      <div className="w-[60%] ml-4 bg-cardColor px-4 py-4 rounded-xl" >
        <div className="w-full  flex flex-col">
          <div className="flex justify-between py-2 px-2 items-center">
          <h1 className="text-xl font-bold text-mainTextColor font-[SF-Pro-Display-Regular]">Store Info</h1>
          <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={()=>setSelected(false)}>
            <FontAwesomeIcon icon={faXmark}/>
          </h1>
          </div>
          <div className="flex gap-4 my-2 ">
          <div className="px-2 w-full rounded bg-background">
<input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
placeholder="UserName"
variant="standard"
name="username"
/>

</div>
            <div className="px-2 w-full rounded bg-background">
            <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
              placeholder="Title"
              variant="standard"
              name="title"
/>
              </div>
          </div>
          <div className="px-2 w-full mb-2 rounded bg-background">
          <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
label="Description"
placeholder="Description"
name="desc"
variant="standard"
/>
          
            </div>
            <div className="px-2 w-full rounded bg-background">
            <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
label="Address"
            placeholder="Address"
            variant="standard"
            name="address"
/>
          
</div>
          <div className="w-full mt-2 flex gap-4">
          <div className="px-2 w-full rounded bg-background">
          <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
placeholder="rating"
variant="standard"
name="rating"
/>
</div>
<div className="px-2 w-full rounded bg-background">

                    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Status"
          value={dropDon}
          className="text-white"
          sx={{color:'white','& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
            border:'none',
          },width:'100%','& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
            color:theme=='light'?'':'white'
          }}}
          onChange={(e)=>setDropDon(e.target.value)}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
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
            className={`mt-2 uppercase px-4 font-[SF-Pro-Display-Regular] cursor-pointer ${theme=='light'?'text-white bg-[#82b012]':'text-white bg-background'} py-3 rounded`}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  };
  
  const EditStore = () => {
    const [getImg, setGetImg] = React.useState(edit.image);
  const [dropDon,setDropDon] = React.useState(edit.fevourite_store)

    const [value, setValue] = React.useState({
      description: edit.description,
      title: edit.name,
      address: edit.address,
      rating: edit.rating,
    });
    const handlerChange = (e) => {
      const { name, value: values } = e.target;
      setValue({
        ...value,
        [name]: values,
      });
    };
    const handlerSUbmit = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${auth.token}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        title: value.title,
        description: value.desc,
        storePicturePath: getImg,
        address: value.address,
        rating: value.rating,
      });


      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${Routesaddress}/stores/${edit.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            toast.success(result.message,{
              position:toast.POSITION.TOP_CENTER
            })
            setEdit([])        
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${auth.token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch(`${Routesaddress}/stores/?skip=0`, requestOptions)
    .then(response => response.json())
    .then(result =>{
      const rows = result.data.map((items)=>createData(items.id,items.title,items.storePicturePath,items.address, items.description, items.is_featured,items.rating,items.email,items.id,items.fevourite_store),)
      setGetData(rows)
      setLoading(false)
      setSelected(false) 
      }
    )
    .catch(error => console.log('error', error));
        })
        .catch((error) => console.log("error", error));
    };

    return (
      
      <div className="w-[60%] ml-4 bg-cardColor px-4 py-4 rounded-xl" >
        <div className="w-full  flex flex-col">
          <div className="flex justify-between py-2 px-2 items-center">
          <h1 className="text-xl font-bold text-mainTextColor">Store Edit</h1>
          <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={()=>setEdit([])}>
            <FontAwesomeIcon icon={faXmark}/>
          </h1>
          </div>
          <div className="flex gap-4 my-2 ">
            <div className="px-2 w-full rounded bg-background">
            <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
            value={value.title}
              placeholder="Title"
              variant="standard"
              name="title"
/>
              </div>
          </div>
          <div className="px-2 w-full mb-2 rounded bg-background">
          <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
label="Description"
          value={value.description}

placeholder="Description"
name="desc"
variant="standard"
/>
          
            </div>
            <div className="px-2 w-full rounded bg-background">
            <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
label="Address"
            placeholder="Address"
            variant="standard"
            name="address"
          value={value.address}

/>
          
</div>
          <div className="w-full mt-2 flex gap-4">
          <div className="px-2 w-full rounded bg-background">
          <input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
placeholder="rating"
variant="standard"
            value={value.rating}
name="rating"
/>
</div>
<div className="px-2 w-full rounded bg-background">

                    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Status"
          value={dropDon}
          className="text-white"
          sx={{color:'white','& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
            border:'none',
          },width:'100%','& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
            color:theme=='light'?'':'white'
          }}}
          onChange={(e)=>setDropDon(e.target.value)}
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
            </div>
          </div>
          <div className="">
            <h1 className="text-xl my-4 text-mainTextColor font-bold font-[SF-Pro-Display-Regular]">Gallery</h1>
            <div className={` w-full flex items-center ${theme=='light'?'bg-white':' bg-background'} justify-center h-[200px]  rounded-md`}>
              <UploadImg setGetImg={setGetImg} getImg={getImg}/>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlerSUbmit}
            className={`mt-2 uppercase px-4 font-[SF-Pro-Display-Regular] cursor-pointer ${theme=='light'?'text-white bg-[#82b012]':'text-white bg-background'} py-3 rounded`}
          >
            SUBMIT
          </button>
        </div>
      </div>
    );
  };

  const [selected,setSelected] = React.useState(false)
  const [getData,setGetData] = React.useState([])
  const handlerCLick = (name,id)=>{
console.log(name,id)
      let updateData = [...getData]
      if(name == 'Edit'){
        let filter  = updateData.find((items)=>items.id === id)
        setEdit(filter)
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
        toast.success("Delete Successfully",{
          position:toast.POSITION.TOP_CENTER
        })
    http://127.0.0.1:8082/stores/1
    fetch(`${Routesaddress}/stores/${id}`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        if(result.status == true){
          const rows = result.data.map((items)=>createData(items.id,items.title,items.storePicturePath,items.address, items.description, items.is_featured,items.rating,items.email,items.id,items.fevourite_store),)
    setGetData(rows)
    setLoading(false)
      
    }
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
const [empty,setEmpty] = React.useState(false)
const [loading,setLoading]=React.useState(true)

React.useEffect(() => {
  var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${auth.token}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
fetch(`${Routesaddress}/stores/?skip=0`, requestOptions)
  .then(response => response.json())
  .then(result =>{
  const rows = result.data.map((items)=>createData(items.id,items.title,items.storePicturePath,items.address, items.description, items.is_featured,items.rating,items.email,items.id,items.fevourite_store),)
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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'image',
    numeric: true,
    disablePadding: false,
    label: 'Image',
    type:'image'
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'featured',
    numeric: true,
    disablePadding: false,
    label: 'Featured',
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'fevourite_store',
    numeric: true,
    disablePadding: false,
    label: 'FeaturedStore',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
    type:'action'
  },
  
];
function createData(id,name,
  image,
  address,
  description,
  featured,
  rating,
  email,
  action,
  fevourite_store) {
return {
  id,
  name,
  image,
  address,
  description,
  featured,
  rating,
  email,
  action,
  fevourite_store
};
}

  return (
      <div className="">
        
    {edit !=''?<EditStore/>:

    selected?    <div className="w-full h-full flex gap-4 ">
    <AddStore />
    </div>  :(
        <div className="">
        <div className="flex mb-6 justify-between my-4 mr-4">
          <div className="px-4 ">
            <h1 className={`border-b border-t-0 border-x-0 border-4 border-white inline ${theme=='light'?'text-[#82b012] border-[#82b012]':'border-white text-white'} text-5xl font-bold font-[SF-Pro-Display-Regular] tracking-wide`}>Store</h1>
          </div>
            <button onClick={()=>(setLoading(true),setSelected(true))} className={`mt-2 uppercase px-4 cursor-pointer ${theme =='light'?'text-white bg-[#82b012]':'text-white bg-cardColor'} py-3 rounded font-[SF-Pro-Display-Regular]`}>+ ADD STORE</button>
        </div>
           <div className="px-4">
           <Table headCells={headCells} rows={getData} handlerCLick={handlerCLick} loading={loading} skeletonNo={10}/>
           </div>
        </div>
      )
    }

      <ToastContainer  />
    </div>
  );
};

export default Store;












