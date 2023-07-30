import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { storage, db } from '../Config/firebase'
import { ref, push, set, get, remove } from 'firebase/database'
import { ref as Sref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Link, useNavigate } from 'react-router-dom';
import Card1 from './TestCard';

function Category() {

  let [activebtn, setactivebtn] = useState(false)
  let [download, setdownload] = useState("")
  let [product, setproduct] = useState([])

  let [inputedit, setinputedit] = useState()

  let [input, setinput] = useState("")

  let [editdata, seteditdata] = useState()

  let navigate = useNavigate()




  useEffect(() => {
    let db_ref = ref(db, "Main_Cat")
    get(db_ref).then((snap) => {

      if (snap.val() == null) {
        setproduct([])
      }
      else {

        setproduct(Object.values(snap.val()))
      }

    })

  }, [])

  const goproduct=(v,i)=>{
    // navigate(`/Card/${v.key}`)
  
   
    console.log("test")

  }

  const editdatafunc=async()=>{
    let db_ref = ref(db, `Main_Cat/${editdata.key}`)

    const d = new Date();
    let text = d.toISOString().substring(0, 10);

    let time = d.toString().substring(16, 24)

    var obj = {
      name : inputedit == editdata.name ? editdata.name : inputedit,
      image : download == "" ? editdata.image : download,
      date :text,
      time:time,
      key:editdata.key


    }

    await set(db_ref,obj)
    getproduct()
  }

  const getproduct = () => {
    let db_ref = ref(db, "Main_Cat")
    get(db_ref).then((snap) => {

      if (snap.val() == null) {
        setproduct([])
      }
      else {

        setproduct(Object.values(snap.val()))
      }


    })
  }


  const deleteitem = async (key) => {
    console.log("ashbhasbv")
    let db_ref = ref(db, `Main_Cat/${key}`)
    await remove(db_ref)
    getproduct()

  }


  const imageupload = (e) => {

    let storage_ref = Sref(storage, `cat_images/${e.target.files[0].name}`)

    uploadBytes(storage_ref, e.target.files[0])
      .then((snap) => {
        getDownloadURL(snap.ref)
          .then(async (link) => {

            console.log(link)
            setdownload(link)
            buttonactivefunc()
          })
      })


  }


  const buttonactivefunc = () => {
    console.log("test")

    if (download != "" && input.length > 0) {
      setactivebtn(true)
    }
    else {
      console.log("test1")
      setactivebtn(false)
    }

  }

  const submitdata = async () => {

    const d = new Date();
    let text = d.toISOString().substring(0, 10);

    let time = d.toString().substring(16, 24)

    let db_ref = ref(db, "Main_Cat")
    let pushkey = push(db_ref)

    var obj = {
      name: input,
      image: download,
      key: pushkey.key,
      date: text,
      time

    }

    let new_Ref = ref(db, `Main_Cat/${pushkey.key}`)

    setdownload("")
    setinput("")

    await set(new_Ref, obj)


  }

  const handlechnange = (e) => {
    setinput(e.target.value)
    console.log(download)
    console.log(input.length)
    if (download != "" && input.length > 1) {
      setactivebtn(true)
    }
    else {
      console.log("test1")
      setactivebtn(false)
    }
  }




  return (
    <div style={{ marginLeft: "27%" }}>
      <div style={{ marginTop: "10%", height: "100px", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        <h1 style={{ color: "GrayText", display: "inline" }}>All Category</h1>
        <button data-toggle="modal" type="button" data-target="#exampleModalCenter" class="btn btn-primary" style={{ height: "50px" }}>Add Category</button>
      </div>





      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add Category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={() => {
                  getproduct()
                  setactivebtn(false)
                }}>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="file" onChange={(e) => imageupload(e)} />
              <br />
              <br />

              <input type="text"
                value={input}
                onChange={(e) => {
                  handlechnange(e)



                }} placeholder='Enter Category name' />
            </div>
            <div class="modal-footer">

              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              {
                activebtn == true ?
                  <button type="button" class="btn btn-primary" onClick={() => submitdata()} >Save changes</button>

                  :
                  <b></b>
              }


            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="editcontainer" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add Category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={() => {
                  getproduct()
                  setactivebtn(false)
                }}>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="file" onChange={(e) => imageupload(e)} />
              <br />
              <br />

              <input type="text"
                value={inputedit}
                onChange={(e) => {
                  // handlechnange(e)
                  setinputedit(e.target.value)



                }} placeholder='Enter Category name' />
            </div>
            <div class="modal-footer">

              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              {/* {
                activebtn == true ? */}
              <button type="button" class="btn btn-primary" onClick={() => editdatafunc()} >Save changes</button>

              {/* :
                  <b></b>
              } */}


            </div>
          </div>
        </div>
      </div>



      <Table responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Category Image</th>
            <th>Date</th>
            <th>Time</th>
            <th>View</th>



          </tr>
        </thead>

        <tbody>
          {
            product.map((v, i) => {
              return (
                  // <Link to={`/Card/${i}`}>
                <tr key={i} onClick={()=>goproduct(v,i)}>
                
                  <td>{i + 1}</td>
                  <td>{v.name}</td>
                  <td>
                    <img src={v.image} alt="" style={{ width: 50 + "px", height: 50 + "px" }} />
                  </td>
                  <td>{v.date}</td>
                  <td>{v.time}</td>
                  <td>

                    <button class="btn btn-success"
                      onClick={() => {
                        setinputedit(v.name)
                        seteditdata(v)
                      }}
                      data-toggle="modal" data-target='#editcontainer'> Edit</button>
                    <button class="btn btn-danger" onClick={() => deleteitem(v.key)}>Delete</button>

                  </td>
                  {/* </Link> */}

                </tr>
              )
            })
          }



        </tbody>
      </Table>


    </div>
  )
}

export default Category

