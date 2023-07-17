import React from 'react'
import './App.css';
import Layout from './components/layout';
import Product from './screens/subadmin/Product';
import Login from './screens/Login';
import {Routes,Route} from 'react-router-dom';
import SubDashboard from './screens/subadmin/Dashboard';
import AdminDashboard from './screens/admin/Dashboard';
import RequireAuth from './components/RequireAuth';
import Store from './screens/admin/Store';
import LayoutCompo from './components/LayoutCompo';
import GetToCart from './screens/subadmin/GetToCart';
import FeaturedStore from './screens/admin/FeaturedStore';
import FeaturePages from './screens/admin/FeaturePages';
import Customers from './screens/subadmin/About';
import Category from './screens/subadmin/About';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useAuth from './hooks/useAuth';
import Dashboard from './screens/subadmin/Dashboard';
import Gallery from './screens/subadmin/Gallery';
import Services from './screens/subadmin/Services';
import Videos from './screens/subadmin/Video';
import SeniorAdovcate from './screens/subadmin/Senior_Adovcate';
import ContactData from './screens/subadmin/ContactData';
import SlidersImages from './screens/subadmin/SlidersImages';

function App() {
  const ROLES = {
    SubAdmin: 'subadmin',
    Admin: 'admin'
  }
  const Unauthorized = ()=>{
    return(
      <div className="">Unauthorized</div>
    )
  }
  const Missing = ()=>{
    return(
      <div className="">404 not found</div>
    )
  }

  const { theme } = useAuth();
  
  return (
<div className="w-full h-full bg-background relative">
  <SkeletonTheme baseColor={theme=='light'?'#e7e4e4':"#202020"} highlightColor={theme=='light'?'':"#444"}>
  
       <Routes>
      <Route path="/" element={<Login />}>
        </Route>

      <Route path="/Admin" element={<LayoutCompo />}>
        {/* public routes */}
        {/* <Route  index element={<Login />} /> */}
     
        

        {/* we want to protect these routes */}
    
       
          <Route index path='dashboard' element={ <Dashboard/> } />
          <Route path="product" element={ <Product/> } />
          <Route path="gettocart" element={ <GetToCart/> } />
          <Route path="About" element={ <Category/> } />
          <Route path="Services" element={ <Services/> } />
          <Route path="Gallery" element={ <Gallery/> } />
          <Route path="Video" element={ <Videos/> } />
          <Route path="SlidersImg" element={ <SlidersImages/> } />

          <Route path="Contact" element={ <ContactData/> } />

          <Route path="SeniorAdovcate" element={ <SeniorAdovcate/> } />

        
        {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<LayoutCompo />} >
          <Route index path='dashboard' element={ <AdminDashboard/> } />
          <Route path='store' element={ <Store/> } />
          <Route path='featuredstore' element={ <FeaturedStore/> } />
          <Route path='featurepages' element={ <FeaturePages/> } />
          </Route>
        </Route> */}




        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  </SkeletonTheme>

    </div>
  );
}

export default App;



