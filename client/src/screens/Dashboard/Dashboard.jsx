import React from "react";
import "./Dashboard.scss";
import Main from "components/Layout/Main";
import Header from "components/Layout/Header";
import PageContent from "components/Layout/PageContent";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <PageContent>
        {/* <div className="dashboard">dashboar</div> */}
      </PageContent>
    </div>
  );
};

export default Dashboard;
