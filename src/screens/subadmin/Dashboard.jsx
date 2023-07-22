import React, { useEffect, useState } from 'react'
// import Store from '../assets/store.jpeg'

// import Content from './Content'
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Routesaddress } from '../../utils/api'

import {ref as Sref,uploadBytes,getDownloadURL}  from 'firebase/storage'
import {database,storage} from '../../context/Firebase'

import { ref,push,set,get,update } from 'firebase/database';
const Dashboard = () => {
  const [data, setData] = React.useState([])
  const { auth, theme } = useAuth();

  const [editinp,seteditinp] = useState("")


  const [editbtn,seteditbtn]=useState(false)

  const [currentdata,setcurrentdata]= useState()

  const [product,setproduct]=useState([])

  const navigate = useNavigate()

  const [down,setdownurl]=useState()

  React.useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${auth.token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${Routesaddress}/getProdCategoryStore/?store_id=${auth.store_id}&category_id=1`, requestOptions)
      .then(response => response.json())
      .then(result => setData(result.data))
      .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
    let usercheck = localStorage.getItem("userlogin")
    if (!usercheck) {
      navigate("/")

    }
  })



  const uploadimage=(e)=>{
    console.log(e.target.files[0])

    // for()

    const storegae_ref =  Sref(storage,`images/${e.target.files[0].name}`)
    uploadBytes(storegae_ref,e.target.files[0])
    .then((snap)=>{
      getDownloadURL(snap.ref).then((url)=>{
        console.log(url)
        setdownurl(url)
      })
    })

  }

  const uploadData=async()  =>{



    const db_ref= ref(database,"subcat")
    const pushkey = push(db_ref)

    const db_ref1= ref(database,`subcat/${pushkey.key}`)


    var obj = {
      name :"etets",
      imagelink:down,
      key:pushkey.key

    }

  await   set(db_ref1,obj)




  

  }

  useEffect(()=>{
    // get all data
    const db_ref= ref(database,"subcat")
    get(db_ref).then((snap)=>{
      console.log(snap.val())
      setproduct(Object.values(snap.val()))
    })

    // get spefic data
    // const db_ref= ref(database,"subcat/${id}")
    // get(db_ref).then((snap)=>{
    //   console.log(snap.val())
    //   setproduct(snap.val())
    // })

    // car =>search 

    // car
  },[])

  //edit function 
  const editbtnfunc =(val)=>{
    console.log(val)
    setcurrentdata(val)
    seteditbtn(true)

  }

  //update function

  const updatedata = async ()=>{
    console.log(currentdata)

    const db_ref= ref(database,`subcat/${currentdata.key}`)

    currentdata.imagelink = down

    // var obj ={
    //   name : currentdata.name ==  name  ?name : currentdata.name
    // }

    await update(db_ref,currentdata)
    getdata()
    seteditbtn(false)



  }


  //get database again 
 const getdata= ()=>{
    const db_ref= ref(database,"subcat")
    get(db_ref).then((snap)=>{
      console.log(snap.val())
      setproduct(Object.values(snap.val()))
    })
  }

  return (
    <div className="">

      <center>
        <input type="text" />
        <br />
        <br />

        <input type="file" onChange={(e)=>uploadimage(e)} />
        <br />
        <br />
       <input type="button" value="Add data" onClick={()=>uploadData()}/>

      </center>
      <div className='bg-background h-screen w-full px-4 py-4'>
      <div className="flex  ">
      {
        editbtn ==false ?
        product.map((v,i)=>{
          return (
         
            <div className={`${theme == 'light' ? 'bg-[#82b012]' : 'bg-cardColor'}  rounded-lg w-[100%] flex justify-between  items-center px-4 py-8 `}>
              <div className="">
                {/* <h1 className='text-xl font-bold text-white font-[SF-Pro-Display-Regular]'>{data.length}</h1> */}
                <p className='text-[12px] text-gray-300 font-bold font-[SF-Pro-Display-Regular]'>{v.name}</p>
              </div>
              <div className="">
                {/* <StorefrontIcon style={{ color: "white", fontSize: '3rem' }} /> */}
                <img src={v.imagelink} alt="" />
              </div>
              <br />

              <button className='border-2 mt-2 text-red-500' onClick={()=>editbtnfunc(v)} >edit</button>
              <button className='border-2 mt-2 text-red-500'>delete</button>

            </div>

           
          )}
        )
        :
       <>
       <input type="text" className='border-2 border-red-500' value={currentdata.name} onChange={(e)=>setcurrentdata({
        name:e.target.value,
        key : currentdata.key,
        imagelink:currentdata.imagelink
        })}  />

        <input type='file' onChange={(e)=>uploadimage(e)}/>
       <button  className='border-2 border-green-500' onClick={()=>updatedata()} >update</button>
       </>
          }
          
          </div>  
          
     
      




      
       
         
         
        
        </div>
        </div>
     
  )
}

export default Dashboard
