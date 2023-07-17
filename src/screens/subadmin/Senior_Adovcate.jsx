import { Checkbox, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import UploadImg from '../../components/UploadImg';
import useAuth from '../../hooks/useAuth';
import { Routesaddress } from '../../utils/api'
import Table from '../../components/Table'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHand } from '@fortawesome/free-solid-svg-icons'
import { getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { storage, database } from '../../context/Firebase';
import { set, ref, push, get,remove } from "firebase/database";
import "./About.css"
import { DeleteOutlineSharp } from '@mui/icons-material';

const SeniorAdovcate = () => {
    const { auth, uploadIMg, theme } = useAuth();
    const [data, setData] = React.useState([])
    const [selected, setSelected] = React.useState(false)
    React.useEffect(() => {
        getData()

    }, [])


    
    
    const deleteItem = (id) => {
        console.log(id)
        var data = ref(database, `SeniorAdovcate/${id}`)
        remove(data)
            .then(() => {
                console.log('Data removed successfully.');
                getData()
            })
            .catch((error) => {
                console.error('Error removing data:', error);
            });
    }

    
    
    
    const getData = () => {
        var data = ref(database, "SeniorAdovcate")

        get(data).then((snap) => {
            console.log(snap.val())
            if(snap.val()!=null){
            setData(Object.values(snap.val()))
            }

        })
            .catch((e) => console.log(e.code))

    }

    const CreateGallery = () => {
        const [getImg, setGetImg] = React.useState({ url: '', file: File });
        const [img, setimg] = useState(false)
        const [value, setValue] = React.useState({
            title: "",
            name: "",
            descrpition: "",
            contact: "",
            email: "",
            about:"",
            link: ""
        });


        const handlerChange = (e) => {
            const { name, value: values } = e.target;
            setValue({
                ...value,
                [name]: values,
            });
        };
        const [dropDon, setDropDon] = React.useState(false)

        const handlerSUbmit = async () => {

            let dbref = ref(database, `SeniorAdovcate`); //ref,path
            const pushdata = push(dbref);
            console.log(value.link)

            var obj = {

                title: value.title,
                image: value.link,
                key: pushdata.key,
                about:value.about

            }

            try {


                await set(pushdata, obj);
                toast.success("Add Succefully Senior Image", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            catch (e) {
                toast.error(e.code, {
                    position: toast.POSITION.TOP_CENTER
                })
            }

        }

        const uplaodImage = async (e) => {
            console.log(e.target.files[0])
            const storageref = sRef(storage, `Galleryimages/${e.target.files[0].name}`);

            await uploadBytes(storageref, e.target.files[0])
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            console.log(url);
                            setValue({
                                ...value,
                                link: url,
                            });
                            toast.success("Succeffully Image Uplaod", {
                                position: toast.POSITION.TOP_CENTER
                            })

                        })
                        .catch((e) => {
                            toast.success(e.code, {
                                position: toast.POSITION.TOP_CENTER
                            })

                        });
                })
                .catch((e) => {
                    toast.success(e.code, {
                        position: toast.POSITION.TOP_CENTER
                    })

                });
        }

        const label = { inputProps: { 'aria-label': 'Active' } };
        return (

            <div className="w-[60%] ml-4 bg-cardColor px-4 py-4 rounded-xl" >
                <div className="w-full  flex flex-col">
                    <div className="flex justify-between py-2 px-2 items-center">
                        <h1 className="text-xl font-bold text-mainTextColor font-[SF-Pro-Display-Regular]">Senior Adovcates</h1>
                        <h1 className="text-xl font-bold text-mainTextColor py-1 cursor-pointer px-2 bg-background rounded items-center" onClick={() => setSelected(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </h1>
                    </div>

                    <div className="flex gap-4 my-2 ">
                        <div className="px-2 w-full rounded bg-background">
                            <input type="text"

                                className={`${theme == 'light' ? '' : 'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text rounded-md  w-full mt-2`}
                                onChange={handlerChange}
                                placeholder="Name Title"
                                variant="standard"
                                name="title"
                            />

                        </div>

                    </div>
                    <div className="flex gap-4 my-2 ">
                        <div className="px-2 w-full rounded bg-background">
                            <input type="text"

                                className={`${theme == 'light' ? '' : 'placeholder:text-white bg-background'} outline-none   py-2 my-2 px-2  text rounded-md  w-full mt-2`}
                                onChange={handlerChange}
                                placeholder="About Title"
                                variant="standard"
                                name="about"
                            />

                        </div>

                    </div>
                    
                    <div className="">
                        <h1 className="text-xl my-4 text-mainTextColor font-bold">Picture</h1>
                        <div className={` w-full flex items-center ${theme == 'light' ? 'bg-white' : ' bg-background'} justify-center h-[200px]  rounded-md`}>
                            <label className={`  mx-auto  my-0 flex  flex-col justify-center items-center rounded-md cursor-pointer text-lg     overflow-hidden font-[SF-Pro-Text-Medium]`}>
                            </label>

                            <input
                                type="file"
                                name="images"
                                className="imgupload w-full absolute opacity-0"
                                onChange={uplaodImage}

                                multiple
                                accept="image/png , image/jpeg, image/webp"
                            />
                            <div className="h-full flex justify-center w-full">

                                <div className=" py-4 px-4 rounded-md">
                                    <h1 className={`text-xl font-[700] text-mainTextColor`} >Drap and drop or click</h1>
                                    <div className="text-center mt-2">
                                        <FontAwesomeIcon icon={faHand} className={`text-6xl ${theme == 'light' ? 'text-[#82b012]' : 'text-white'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        disabled={value.link == "" ? true : false}
                        onClick={handlerSUbmit}
                        className={`mt-2 uppercase px-4  font-[SF-Pro-Display-Regular] cursor-pointer ${theme == 'light' ? 'text-white bg-[#82b012]' : 'text-white bg-background'} py-3 rounded`}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        );
    };


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
            label: 'Name',
        },
        {
            id: 'cateogryPicturePath',
            numeric: true,
            disablePadding: false,
            label: 'Image',
            type: 'image'
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
            type: 'action'
        },

    ];
    function createData(
        id,
        title,
        cateogryPicturePath,
        is_active,
        action,
    ) {
        return {
            id,
            title,
            cateogryPicturePath,
            is_active,
            action,
        };
    }


    const handlerCLick = (name, id) => {


    }
    const [loading, setLoading] = React.useState(true)

    return (
        <div>
            <div className="">
                {selected ? <div className="w-full h-full flex gap-4 ">
                    <CreateGallery />
                </div> : (
                    <div className="">
                        <div className="flex mb-6 justify-between my-4 mr-4">
                            <div className="px-4 ">
                                <h1 className={`border-b border-t-0 border-x-0 border-4 border-white inline ${theme == 'light' ? 'text-[#82b012] border-[#82b012]' : 'border-white text-white'} text-5xl font-bold font-[SF-Pro-Display-Regular] tracking-wide`}>Senior Adovcates</h1>
                            </div>
                            <button onClick={() => (setLoading(true), setSelected(true))} className={`mt-2 uppercase px-4 cursor-pointer ${theme == 'light' ? 'text-white bg-[#82b012]' : 'text-white bg-cardColor'} py-3 rounded font-[SF-Pro-Display-Regular]`}>+ ADD Senior Adovcates</button>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Title</th>
                                        <th>Videos</th>
                                        <th>Delete</th>
                                      
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((v, i) => {
                                        return (
                                            <tr>
                                                <td>{i+1}</td>
                                                <td>{v.title}</td>
                                                <td style={{textAlign:"center"}}>
                                                    <img controls src={v.image} style={{height:100,width:200}} alt="" />
                                                </td>
                                                <td>
                                                    <DeleteOutlineSharp id="cur" color='red' style={{ color: "red", fontSize: 40 + "px" }} onClick={() => deleteItem(v.key)} />
                                                </td>
                                             
                                            </tr>
                                        )
                                    })}



                                </tbody>
                            </table>
                        </div>
                        {/*  */}

                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default SeniorAdovcate




