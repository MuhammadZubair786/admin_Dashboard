import React from 'react'
import Navegation from './Config/Navegation'
import './App.css'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
function App() {
  const nav = useNavigate()
  const next1 = () => {
    nav('/')
  }

  const next2 = () => {
    nav('/Category')
  }

  const next3 = () => {
    nav('/Oders')
  }

  const next4 = () => {
    nav('/Return')
  }

  return (
    <>
      <div style={{ position: "fixed" }}>
        <div className="w3-sidebar w3-light-grey w3-bar-block" style={{ width: "20%" }} >
          <h3 style={{ marginLeft: "100px", fontSize: "70px", color: "blue" }} >OlX </h3>
          <ul >
            <li > <button onClick={() => next1()}   >Dashbord</button>  </li>
            <li ><button onClick={() => next2()}  >Category</button> </li>
            <li ><button onClick={() => next3()}  >Oders</button> </li>
            {/* <li ><button onClick={()=>next4()}  >Add Items</button> </li> */}
          </ul>
        </div>
      </div>
      <Navegation />

    </>
  )
}

export default App
