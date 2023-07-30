import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {  ref, get } from "firebase/database";
import { db } from '../Config/firebase';


import 'bootstrap/dist/css/bootstrap.min.css';
function Oders() {

const [data,setdata] = useState([])

useEffect(()=>{

  
  // get all data
  const db_ref= ref(db,"user")
  get(db_ref).then((snap)=>{
    console.log(snap.val())
    if(snap.val()!=null){
      setdata(Object.values(snap.val()))

    }
  })



},[])




  return (
    <div style={{marginLeft:'25%',position: 'relative' }}>
      

<h1 style={{color:"GrayText",padding:"5%"}}>All Itmes</h1>



     <Table responsive="lg">
     <thead>
          <tr>
            <th>S No</th>
            <th>Title</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>category</th>
            <th>condition</th>
          </tr>
        </thead>
<tbody>

  {
    data!=null ?
    <>
    
    {
  data.map((v,i)=>{
return(
  <>
      <tr>
    <td>{i}</td>
    <td>{v.title}</td>
    <td><img  style={{height:"50px",width:"100px",objectFit:"cover"}} src={v.imagelink}/></td>
    <td style={{color:"blue"}}>{v.name}</td>
    <td style={{color:"green"}}>{v.price}</td>
    <td style={{color:"Highlight"}}>{v.category}</td>
    <td style={{color:"InactiveCaptionText"}}>{v.condition}</td>

  </tr>
  </>
)

  })
}
    
    </>
    :
    <>
    <h1 style={{color:"GrayText",padding:"5%"}}>Data Not fetch ! plese chak your internat conaction</h1>

    
    </>
  }




</tbody>




      
      </Table>

     

    
    </div>
  )
}


// class ShowCards extends React.Component{
//   constructor(){
//     super();
//     this.setState={
//       tableData:[]
//     }
//   }







// componentDidMount(){
//   let data1 = ref(db,"user")

// onValue(data1,(snapshot)=>{
// let record =[];
// snapshot.forEach(childSnapshot=>{
//   let keyName = childSnapshot.key;
//   let data = childSnapshot.val();
//   record.push({"key":keyName,"data":data})

// this.setState({
//   tableData: record
// })

// })  
// })
// }



// render(){
//   return(
//         <div style={{marginLeft:'25%',position: 'relative' }}>
      
//      <fieldset style={{border:'1px solid black',width:'75%',marginTop:'5%',position: 'absolute'}}>
//      <Table responsive="lg">
//      <thead>
//           <tr>
//             <th>S No</th>
//             <th>Title</th>
//             <th>Image</th>
//             <th>Table heading</th>
//             <th>Table heading</th>
//             <th>Table heading</th>
//             <th>Table heading</th>
//           </tr>
//         </thead>
// <tbody>
// {



//  this.state.tableData.map((v,i)=>{
// return(
//       <tr>
//     <td>{i}</td>
//     <td>{v.data.title}</td>
//     <td><img  style={{height:"50px",width:"100px",objectFit:"contain"}} src={v.data.Image}/></td>
//     <td>{v.data.size38}</td>
//     <td>{v.data.size39}</td>
//     <td>{v.data.size40}</td>
//     <td>{v.data.size41}</td>
//     <td>{v.data.price}</td>

//   </tr>
// )

//   })
// }



// </tbody>




      
//       </Table>

// {/* <button onClick={()=>chak()}>
// show card
// </button> */}
//      </fieldset>

    
//     </div>
//   )
// }










// }
























export default Oders
