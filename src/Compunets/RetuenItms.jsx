import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Formik,Field,Form} from 'formik'
import Button from 'react-bootstrap/Button';
import {  storage, db } from "../Config/firebase";
import { getDownloadURL, ref as Sref, uploadBytes } from "firebase/storage";
import {  ref } from "firebase/database";
import { push,set } from 'firebase/database';


function RetuenItms() {
const [imagelink,setimagelink]=useState('')

  const handleupload = (e) => {
    console.log(e.target.files[0])

    // for()

    const storegae_ref =  Sref(storage,`images/${e.target.files[0].name}`)
    uploadBytes(storegae_ref,e.target.files[0])
    .then((snap)=>{
      getDownloadURL(snap.ref).then((url)=>{
        console.log(url)
        setimagelink(url)
      })
      .catch((e)=>{
        alert(e.message)
      })
    })

  }



  return (
    <div style={{marginLeft:"27%"}}>
<h1 style={{color:"GrayText",padding:"5%"}}>Add Itmes</h1>


      
<fieldset style={{border:"1px solid black",width:"70%"}}>
<Formik
initialValues={{
  title:"",
  price:"",
  img:"",
  CATEGORY:"",
  Description:"",
  Condition:"",
  LOCATION:"",
  Name:"",
  number:""
}

}

onSubmit={async(v)=>{

try {
  let dbref = ref(db, `user/`) //ref,path
let newPostRef = push(dbref)

  let obj = {
  title:v.title,
  price:v.price,
  category:v.CATEGORY,
  description:v.Description,
  condition:v.Condition,
  address:v.LOCATION,
  name:v.Name,
  number:v.number,
  key: newPostRef.key,
  imagelink:imagelink

  };
set(newPostRef,obj)
alert("user add ")

} catch (e) {
  alert(e);
}
}}


>

<Form  className=' m-5'>
 <Field type="text"  placeholder="title" name="title"   className="form-control" />
<br /> <br /> 
<Field type="text" placeholder="price" name="price" className="form-control" />
<br /> <br /> 
<Field type="text" placeholder="CATEGORY" name="CATEGORY" className="form-control" />
<br /> <br /> 
<Field type="text" placeholder="Description" name="Description" className="form-control" />
<br /> <br /> 
<Field type="text" placeholder="Condition right only new or used" name="Condition" className="form-control" /> 
<br /> <br /> 
<Field type="text" placeholder="LOCATION" name="LOCATION" className="form-control" />
<br /> <br /> 
<Field type="text" placeholder="Name" name="Name" className="form-control" />
<br /> <br /> 
<Field type="number" placeholder="number" name="number" className="form-control" />
<br /> <br />

<Field type="file" name="img" className="form-control"  accept="image/*" onChange={(e) => handleupload(e)}/> 
<br /> <br /> 
<Button variant="outline-success" type='submit'>Submit</Button>{' '}





</Form>


</Formik>




</fieldset>

    </div>
  )
}

export default RetuenItms
