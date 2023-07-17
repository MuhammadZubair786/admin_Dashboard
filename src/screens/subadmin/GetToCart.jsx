import { Checkbox, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'
import UploadImg from '../../components/UploadImg';
import useAuth from '../../hooks/useAuth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Routesaddress} from '../../utils/api'
import Table from '../../components/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const GetToCart = () => {
  const { auth,theme } = useAuth();
const [edit,setEdit] = React.useState([])
const [selected,setSelected] = React.useState(false)
const [DeliveredValue,setDeliveredValue] = React.useState({id:'',value:'Confirmed'})
const [getData,setGetData] = React.useState([])

let arry = []
  React.useEffect(()=>{
    var myHeaders = new Headers();
myHeaders.append("Authorization", `bearer ${auth.token}`);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${Routesaddress}/order/`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    for(let i=0;i<result.data.order.length;i++){
      arry.push({
        email:result.data.order[i].email,
        name:result.data.order[i].name,
        orderAmount:result.data.order[i].orderAmount,
        isDelivered:result.data.orderItems[i].isDelivered,
        price:result.data.orderItems[i].price,
        quantity:result.data.orderItems[i].quantity,
        address:result.data.shippingAddress[i].address,
        city:result.data.shippingAddress[i].city,
        country:result.data.shippingAddress[i].country,
        postalCode:result.data.shippingAddress[i].postalCode,
        id:result.data.shippingAddress[i].id,
        action:result.data.shippingAddress[i].id})
    }
    const rows = arry.map((items)=>createData(
      items.id,
      items.name,
      items.email,
      items.orderAmount,
      items.isDelivered,
      items.price,
      items.quantity,
      items.address,
      items.city,
      items.country,
      items.postalCode,
      items.action
      ),)
      setGetData(rows)
    setLoading(false)
  })
  .catch(error => console.log('error', error));
  },[])
  
  
  const handlerCLick = (value,id)=>{
    setDeliveredValue({...DeliveredValue,id})
    let filter  = getData.find((items)=>items.id === id)
        setEdit(filter)
  }
  const handlerSub = ()=>{
    console.log(DeliveredValue)
    var requestOptions = {
      method: 'PATCH',
      redirect: 'follow'
    };
    fetch(`${Routesaddress}/order/orderstatusupdate/${DeliveredValue.id}/${DeliveredValue.value}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status == true ){
          toast.success("Successfully Updated Status",{
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
          
          fetch(`${Routesaddress}/order/`, requestOptions)
            .then(response => response.json())
            .then(result =>{
              for(let i=0;i<result.data.order.length;i++){
                arry.push({
                  email:result.data.order[i].email,
                  name:result.data.order[i].name,
                  orderAmount:result.data.order[i].orderAmount,
                  isDelivered:result.data.orderItems[i].isDelivered,
                  price:result.data.orderItems[i].price,
                  quantity:result.data.orderItems[i].quantity,
                  address:result.data.shippingAddress[i].address,
                  city:result.data.shippingAddress[i].city,
                  country:result.data.shippingAddress[i].country,
                  postalCode:result.data.shippingAddress[i].postalCode,
                  id:result.data.shippingAddress[i].id,
                  action:result.data.shippingAddress[i].id})
              }
              const rows = arry.map((items)=>createData(
                items.id,
                items.name,
                items.email,
                items.orderAmount,
                items.isDelivered,
                items.price,
                items.quantity,
                items.address,
                items.city,
                items.country,
                items.postalCode,
                items.action
                ),)
                setGetData(rows)
                setEdit([])
            })
            .catch(error => console.log('error', error));
        }else {
          alert('someting wrong')
        }
      })
      .catch(error => console.log('error', error));
  }
const [loading,setLoading]=React.useState(true)
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
    label: 'name',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'email',
  },
  {
    id: 'orderAmount',
    numeric: true,
    disablePadding: false,
    label: 'orderAmount',
  },
  {
    id: 'isDelivered',
    numeric: true,
    disablePadding: false,
    label: 'isDelivered',
    
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'price',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'quantity',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'address',
  },
  {
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'city',
  },
  {
    id: 'country',
    numeric: true,
    disablePadding: false,
    label: 'country',
  },
  {
    id: 'postalCode',
    numeric: true,
    disablePadding: false,
    label: 'postalCode',
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
email,
orderAmount,
isDelivered,
price,
quantity,
address,
city,
country,
postalCode,
action
  ) {
return {
  id,
  name,
  email,
  orderAmount,
  isDelivered,
  price,
  quantity,
  address,
  city,
  country,
  postalCode,
  action
};
}
const HandlerEdit =()=>{
  return(
    <div className="w-full flex justify-center items-center h-full fixed top-0 left-40">
      <div className="bg-cardColor px-4 py-4 rounded-md">
      <div className="flex justify-between py-2 px-2 items-center">
          <h1 className="text-xl font-bold text-mainTextColor">GetData Info</h1>
          <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={()=>setEdit([])}>
            <FontAwesomeIcon icon={faXmark}/>
          </h1>
          </div>
       <div className="flex gap-2 mt-4">
       <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Status"
          sx={{color:'white',backgroundColor:'#292929','& .css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
            border:'none',
          },width:'100%','& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
            color:theme=='light'?'':'white'
          }}}
          value={DeliveredValue.value}
          onChange={(e)=>setDeliveredValue({...DeliveredValue,value:e.target.value})}
        >
          <MenuItem value={'Pending'}>Pending</MenuItem>
          <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
          <MenuItem value={'Packing'}>Packing</MenuItem>
          <MenuItem value={'Ready to pickup'}>Ready to pickup</MenuItem>
          <MenuItem value={'Picked up'}>Picked up</MenuItem>
        </Select>
        <button onClick={handlerSub} className={`uppercase px-4 cursor-pointer ${theme =='light'?'text-white bg-[#82b012]':'text-white bg-background'} py-3 rounded font-[SF-Pro-Display-Regular]`}>Submit</button>
        
       </div>
      </div>
    </div>
  )
}
  return (
    <div className='relative'>
      {edit !=''&&<HandlerEdit/>}
          <div className="">
          <div className="flex mb-6 justify-between my-4 mr-4">
          <div className="px-4 ">
            <h1 className={`border-b border-t-0 border-x-0 border-4 border-white inline ${theme=='light'?'text-[#82b012] border-[#82b012]':'border-white text-white'} text-5xl font-bold font-[SF-Pro-Display-Regular] tracking-wide`}>GetToCart</h1>
          </div>
        </div>
           <div className="px-4">
           <Table headCells={headCells} rows={getData} handlerCLick={handlerCLick} loading={loading} skeletonNo={12}/>
           </div>
        </div>

    </div>
  )
}

export default GetToCart

