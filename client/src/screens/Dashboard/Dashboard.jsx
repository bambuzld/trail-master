import React  from "react";

import "./Dashboard.scss";
import Header from "components/Layout/Header";
import PageContent from "components/Layout/PageContent";
import Button from 'components/Button'

import LocationAutocomplete from 'components/LocationAutocomplete'

const Dashboard = () => {
   return (
     <div className="dashboard">
       <Header hasTitle={false} />
       <PageContent>
        <div className="dashboard__title"><span>TRAIL MASTER</span></div>
         <div className="dashboard__subtitle">
           <span>Explore the trails nearby...</span>
         </div>
         <LocationAutocomplete />
       </PageContent>
     </div>
   );
};

export default Dashboard;
