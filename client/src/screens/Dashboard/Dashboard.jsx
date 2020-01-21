import React  from "react";

import "./Dashboard.scss";
import Header from "components/Layout/Header";
import PageContent from "components/Layout/PageContent";

import LocationAutocomplete from 'components/LocationAutocomplete'

const Dashboard = () => {
   return (
    <div className="dashboard">
      <Header />
      <PageContent>
      <LocationAutocomplete/>
      </PageContent>
    </div>
  );
};

export default Dashboard;
