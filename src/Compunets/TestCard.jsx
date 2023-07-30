import { ref,get } from "firebase/database"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../Config/firebase"

function Card1(){
    // let {id} = useParams()
    let data =useParams()
    console.log(data)

    let [currentdata,setcurrentdata]=useState([])

    useEffect(()=>{

        let dbref = ref(db,`Main_Cat/${data.id}`)

        get(dbref).then((snap)=>{
            if(snap.val()!=null){
                console.log(snap.val())
            

                setcurrentdata(snap.val()) //map 
            }
          
            // setcurrentdata([snap.val()]) //map 


        })


    },[])

    return(
        <div style={{marginLeft:"25%"}}>

            {
                currentdata.length == 0 ? 
                <h1>Loading ......</h1>
                :
                <>
        
                 <img src={currentdata["image"]} alt="" style={{width:130+"px",height:140+"px"}} />
                <b>{currentdata["name"]}</b> 
                <b>{currentdata["time"]}</b> 

                {/* <img src={currentdata[0]["image"]} alt="" style={{width:130+"px",height:140+"px"}} />
                <b>{currentdata[0]["name"]}</b> 
                <b>{currentdata[0]["time"]}</b>  */}

                </>

            }

       
        </div>
    )
}

export default Card1