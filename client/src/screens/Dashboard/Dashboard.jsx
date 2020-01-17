import React, {useContext} from "react";
import "./Dashboard.scss";
import Header from "components/Layout/Header";
import PageContent from "components/Layout/PageContent";
import FloatingNotification from 'components/FloatingNotification'
import { MainContext } from "containers/mainContext";

const Dashboard = () => {
  const data = useContext(MainContext)
   console.log('data', data);
   return (
    <div className="dashboard">
      <Header />
      <PageContent>
      </PageContent>
    </div>
  );
};

export default Dashboard;
