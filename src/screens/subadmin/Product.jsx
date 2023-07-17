import React,{useCallback} from 'react'
import UploadImg from '../../components/UploadImg'
// import Nodata from '../assets/noData.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useAuth from '../../hooks/useAuth';
import {Routesaddress} from '../../utils/api'
import Table from '../../components/Table'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const Product = () => {
  const { auth,uploadIMg ,theme} = useAuth();
  const [selected,setSelected] = React.useState(false)
  const AddPRoduct = ()=>{
    const [active, setActive] = React.useState(false);
    const [value, setValue] = React.useState({
      name:'',
      productPicturePath:'',
      description:'',
      stock:'5',
      price:0,
      currencyCode:'USD',
      category:'rice'
    });
    const [getImg, setGetImg] = React.useState({url:'',file:File});

      const handlerChange = (e)=>{
        const {value:values,name} = e.target;
        setValue({
          ...value,
          [name]:values
        })
      }
      let [getTitle,setTitle] = React.useState([])
  const [dropDon, setDropDon] = React.useState(false);
      
      const handlerSUbmit = ()=>{
      uploadIMg(getImg.url,getImg.file).then((imgpro)=>
        {
        var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${auth.token}`);
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
      };
      fetch(`${Routesaddress}/getCategoryStore/?store_id=${auth.store_id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          let datatdf = result.data.find((items)=>items.title.toLowerCase() == value.category.toLowerCase()?items:'')
          if(datatdf == undefined){
            alert('category not found')
          }else {
            var raw = JSON.stringify({
              "store_id": auth.store_id,
              "name": value.name,
              "productPicturePath": imgpro,
              "description": value.description,
              "is_active": active,
              "is_featured": dropDon,
              "stock": value.stock,
              "price": parseFloat(value.price),
              "category_id": datatdf.id,
              "currencyCode": value.currencyCode,
              "CategoryName": value.category
            })
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            fetch(`${Routesaddress}/CreateProductInCategory/`, requestOptions)
              .then(response => response.json())
              .then(result => {
                if(result.status == true){
                  setSelected(false)
                  toast.success(result.message,{
                    position:toast.POSITION.TOP_CENTER
                  })
                }
              })
              .catch(error => console.log('category is not found'));
            
          }
          
        })
        .catch(error => console.log('error', error));

      })
     
      }

        React.useEffect(()=>{
    var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${auth.token}`);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
fetch(`${Routesaddress}/getCategoryStore/?store_id=${auth.store_id}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    let filerData = [...result.data.map((items)=>items.title)]
    setTitle(filerData)
  })
  .catch(error => console.log('error', error));
  },[])

        return(
      <div className="w-[60%] ml-4 bg-cardColor px-4 py-4 rounded-xl" >
        <div className="w-full  flex flex-col">
          <div className="flex justify-between py-2 px-2 items-center">
          <h1 className="text-xl font-bold text-mainTextColor">Product Info</h1>
          <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={()=>setSelected(false)}>
            <FontAwesomeIcon icon={faXmark}/>
          </h1>
          </div>
          <div className="flex gap-4 my-2 ">
          <div className="px-2 w-full rounded bg-background">
<input type="text" 

className={`${theme=='light'?'':'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text-white rounded-md  w-full mt-2`}
onChange={handlerChange}
                placeholder='Product Name'
                name='name'
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
                placeholder='Price'
                name='price'
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
            
<div className="px-2 w-full rounded bg-background">

                    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Status"
          name='stock'
          value={value.stock}
          onChange={handlerChange}
          className="text-white"
          sx={{color:'white','& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
            border:'none',
          },width:'100%','& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
            color:theme=='light'?'':'white'
          }}}
        >
      <MenuItem value="">
            <em>Out of Stock</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={200}>200</MenuItem>
        </Select>
            </div>
<div className="px-2 w-full rounded bg-background">
                    <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Status"
          value={value.category}
          name='category'
          onChange={handlerChange}
          className="text-white"
          sx={{color:'white','& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
            border:'none',
          },width:'100%','& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
            color:theme=='light'?'':'white'
          }}}
        >
      {getTitle.map((items)=>(
          <MenuItem value={items} className='capitalize'>{items}</MenuItem>
          ))}
        </Select>
            </div>

          </div>
          <div className="">
            <h1 className="text-xl my-4 text-mainTextColor font-bold">Gallery</h1>
            <div className={` w-full flex items-center ${theme=='light'?'bg-white':' bg-background'} justify-center h-[200px]  rounded-md`}>
              <UploadImg setGetImg={setGetImg} />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handlerSUbmit}
            className={`mt-2 uppercase px-4 cursor-pointer ${theme=='light'?'text-white bg-[#82b012]':'text-white bg-background'} py-3 rounded`}
          >
            SUBMIT
          </button>
        </div>
      </div>
        )
    }

    let data =[
      {
        name:'Basmati Rice',
        stock:'In Stock',
        price:1200,
        category:'Rice',
        date:'2021/02/02',
      },
      {
        name:'Beef Boneless Meat',
        stock:'In Stock',
        price:1200,
        category:'Rice',
        date:'2021/02/02',
      },
      {
        name:'Beef Boneless CHawal',
        stock:'In Stock',
        price:1200,
        category:'Rice',
        date:'2021/02/02',
      },
    ]
  const [getData,setGetData] = React.useState([])
  const [edit,setEdit] = React.useState([])
  const [empty,setEmpty] = React.useState(false)

  const handlerCLick = (name,id)=>{
      let updateData = [...getData]
      if(name == 'Visible'){
        updateData = updateData.filter((items,index)=>id === items.id)
      }else if(name == 'Edit'){
        let filter  = updateData.find((items,index)=>id === items.id)
        setEdit(filter)
      } else if(name == 'Delete'){
        updateData = updateData.filter((items,index)=>id !== items.id)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${auth.token}`);
                    var requestOptions = {
                      method: 'DELETE',
                      headers: myHeaders,
                      redirect: 'follow',
                    };
                    
                    fetch(`${Routesaddress}/deleteProduct/?id=${id}`, requestOptions)
                      .then(response => response.json())
                      .then(result =>{
                        if(result.status == true){
                          toast.success("Delete Successfully",{
                            position:toast.POSITION.TOP_CENTER
                          })
                          var myHeaders = new Headers();
                          myHeaders.append("Authorization", `bearer ${auth.token}`);
                          myHeaders.append("Content-Type", "application/json");
                      
                          var requestOptions = {
                            method: 'GET',
                            headers: myHeaders,
                            redirect: 'follow'
                          };
                          
                          fetch(`${Routesaddress}/getProductWithStoreID/?store_id=${auth.store_id}`, requestOptions)
                            .then(response => response.json())
                            .then(result =>{
                              console.log(result.data,'afsdsfd')
                              const rows = result.data.map((items)=>createData(
                                items.id,
                                items.name,
                                items.price,
                                items.description,
                                items.productPicturePath,
                                items.CategoryName,
                                items.currencyCode,
                                items.date_added,
                                items.is_active,
                                items.is_featured,
                                items.stock,
                                items.id,
                                  ),)
                            
                                  setGetData(rows)
                                  setLoading(false)
                            })
                            .catch(error => console.log('error', error));
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
const [loading,setLoading]=React.useState(true)

    React.useEffect(() => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `bearer ${auth.token}`);
      myHeaders.append("Content-Type", "application/json");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`${Routesaddress}/getProductWithStoreID/?store_id=${auth.store_id}`, requestOptions)
        .then(response => response.json())
        .then(result =>{
          console.log(result.data,'afsdsfd')
          const rows = result.data.map((items)=>createData(
            items.id,
            items.name,
            items.price,
            items.description,
            items.productPicturePath,
            items.CategoryName,
            items.currencyCode,
            items.date_added,
            items.is_active,
            items.is_featured,
            items.stock,
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
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'price',
      numeric: false,
      disablePadding: true,
      label: 'Price',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: true,
      label: 'Description',
    },
    {
      id: 'productPicturePath',
      numeric: true,
      disablePadding: false,
      label: 'Image',
      type:'image'
    },
    {
      id: 'CategoryName',
      numeric: true,
      disablePadding: false,
      label: 'CategoryName',
    },
    {
      id: 'currencyCode',
      numeric: true,
      disablePadding: false,
      label: 'currencyCode',
    },
    {
      id: 'date_added',
      numeric: true,
      disablePadding: false,
      label: 'Date',
    },
    {
      id: 'is_active',
      numeric: true,
      disablePadding: false,
      label: 'Active',
    
    },
    {
      id: 'is_featured',
      numeric: true,
      disablePadding: false,
      label: 'Featured',
    
    },
    {
      id: 'stock',
      numeric: true,
      disablePadding: false,
      label: 'Stock',
    
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
name,
price,
description,
productPicturePath,
CategoryName,
currencyCode,
date_added,
is_active,
is_featured,
stock,
action,
    ) {
  return {
    id,
    name,
    price,
    description,
    productPicturePath,
    CategoryName,
    currencyCode,
    date_added,
    is_active,
    is_featured,
    stock,
    action,
  };
  }
  
  return (
    <div className='px-4 py-4 bg-background'>
      {/* <EditPRoduct/> */}
      {selected?<AddPRoduct/>:(
        <div className="">
        <div className="flex mb-6 justify-between my-4 mr-4">
          <div className="px-4 ">
            <h1 className={`border-b border-t-0 border-x-0 border-4 border-white inline ${theme=='light'?'text-[#82b012] border-[#82b012]':'border-white text-white'} text-5xl font-bold font-[SF-Pro-Display-Regular] tracking-wide`}>PRODUCT</h1>
          </div>
            <button onClick={()=>(setLoading(true),setSelected(true))} className={`mt-2 uppercase px-4 cursor-pointer ${theme =='light'?'text-white bg-[#82b012]':'text-white bg-cardColor'} py-3 rounded font-[SF-Pro-Display-Regular]`}>+ ADD PRODUCT</button>
        </div>
      <div className="px-4">
           <Table headCells={headCells} rows={getData} handlerCLick={handlerCLick} loading={loading} skeletonNo={12}/>
           </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  )
}

export default Product