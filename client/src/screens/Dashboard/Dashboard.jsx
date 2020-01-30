import React, {useState}  from "react";

import ReactMapGL from 'react-map-gl'


import "./Dashboard.scss";
import Header from "components/Layout/Header";
import PageContent from "components/Layout/PageContent";
import Button from 'components/Button'
import Map from 'components/Map'

import LocationAutocomplete from 'components/LocationAutocomplete'
import PageLoader from 'components/PageLoader';

const Dashboard = () => {

  const [viewport,setViewport] = useState({latitude: 46,longitude: 15,zoom: 10})

   return (
     <div className="dashboard">
       <PageContent>
        <div className="dashboard__title"><span>TRAIL MASTER</span></div>
         <div className="dashboard__subtitle">
           <span>Explore the trails nearby...</span>
         </div>
         <LocationAutocomplete />
       </PageContent>
       {/* <Map/> */}
       <ReactMapGL
         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
         width="100vw"
         height="100vh"
         mapStyle="mapbox://styles/mapbox/satellite-v9"
         {...viewport}
         onViewportChange={newViewport => setViewport(newViewport)}
       >
         <Header hasTitle={false} />
       </ReactMapGL>
     </div>
   );
};

export default Dashboard;
