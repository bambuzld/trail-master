import React  from "react";

import "./Dashboard.scss";
import Header from "components/Layout/Header";
import PageContent from "components/Layout/PageContent";
import Svg from 'components/Svg'

import LocationAutocomplete from 'components/LocationAutocomplete'

const Dashboard = () => {
   return (
    <div className="dashboard">
      <Header />
      <PageContent>

      <div className="dashboard__subtitle">
        <span>Explore the trails nearby...</span>
        <Svg icon="gps"/>
      </div>


      <LocationAutocomplete/>
      </PageContent>
    </div>
  );
};

export default Dashboard;
