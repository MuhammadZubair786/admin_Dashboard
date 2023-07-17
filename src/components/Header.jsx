import React, { useState,useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon,faSun,faBars,faUser } from '@fortawesome/free-solid-svg-icons'
const Header = ({setColpass,colpass}) => {
  const navigate = useNavigate()
  const [log,setLog] = React.useState(false)
  const { setAuth ,theme, setTheme,} = useAuth();

  const logout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setAuth({})
    navigate('/',true)
  }
  const [themeSwitch,setThemeSwitch]=useState(false)
  const handlerSitcher =useCallback(()=>{
    setThemeSwitch(!themeSwitch)
    if(theme == 'light'){
      setTheme('dark')
    }else{
      setTheme('light')
    }
  },[themeSwitch])
  return (
    <div className='bg-background flex justify-between items-center py-4 px-4'>
        <span className='cursor-pointer' onClick={()=>setColpass(!colpass)}>
          <FontAwesomeIcon icon={faBars} className={`${!themeSwitch?'text-[#9eb945]':'text-white'}`}/>
        </span>
        <span className='relative  cursor-pointer' >
            <div className="flex gap-4 items-center">
            <div className="flex gap-4">
              {themeSwitch?<FontAwesomeIcon icon={faMoon} onClick={handlerSitcher}  className={`${!themeSwitch?'text-[#9eb945]':'text-white'}`}/>:(
                <FontAwesomeIcon icon={faSun} onClick={handlerSitcher} className={`${!themeSwitch?'text-[#9eb945]':'text-white'}`}/>
              )}
            
            </div>
                  <span onClick={()=>setLog(!log)}>
                    <FontAwesomeIcon  icon={faUser} className={`${!themeSwitch?'text-[#9eb945]':'text-white'}`}/>
                    
                  </span>
</div>
          {log&&<span className='px-1 py-1 bg-cardColor rounded-md absolute -bottom-10 -left-12'>
            <h2 className='text-lg px-2 text-mainTextColor' onClick={logout}>Logout</h2>
          </span>}
        </span>
    </div>
  )
}

export default Header