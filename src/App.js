import "./App.css";
import { Nav } from "./components/Nav/Nav";
import { TopDiv } from "./components/TopDiv/TopDiv";
import { DeviceMonitoringTable } from "./components/DeviceMonitoringTable/DeviceMonitoringTable";
import { ChannelTable } from "./components/ChannelTable/ChannelTable";
import { RegisterDevice } from "./components/RegisterDevice/RegisterDevice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ItemMaster } from "./components/ItemMaster/ItemMaster";
import { Vendors } from "./components/Vendors/Vendors";
import { LocationMaster } from "./components/LocationMaster/LocationMaster";
import { DeviceLocationMapping } from "./components/DeviceLocationMapping/DeviceLocationMapping";
import { PreProvisionTable } from "./components/PreProvisionTable/PreProvisionTable";
import { useEffect, useState } from "react";
// import { POST } from "../config/api";

export default function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Define your backend API endpoint URL
  //   const apiUrl = "http://localhost:8000/api/location_master";

  //   // Fetch data from your backend when the component mounts
  //   fetch(apiUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []); // Empty dependency array ensures this effect runs only once on component mount
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<DeviceMonitoringTable />} />
          <Route exact path="/ItemMaster" element={<ItemMaster />} />
          <Route exact path="/Vendors" element={<Vendors />} />
          <Route exact path="/LocationMaster" element={<LocationMaster />} />
          <Route
            exact
            path="/DeviceLocationMapping"
            element={<DeviceLocationMapping />}
          />
          <Route
            exact
            path="/PreProvisionTable"
            element={<PreProvisionTable />}
          />

          {/* <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} /> */}
        </Routes>
      </Router>

      <div className=" bg-gray-200 px-[5vw] py-[20px] flex flex-col justify-center items-center">
        {/* <TopDiv/>
  <DeviceMonitoringTable/>
  <RegisterDevice/>
   <ChannelTable/>  */}
      </div>
    </>
  );
}
