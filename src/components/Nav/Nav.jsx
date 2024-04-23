import React from "react";
import { useState } from "react";

export function Nav() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <section>
      <div className="h-[10vh] w-full bg-white px-[4vw] flex">
        <div className="px-[2vw]">
          <img
            height={100}
            width={100}
            src="Adverteaselogo.svg "
            alt="logo"
            className="px-4 py-3"
          />
        </div>

        <div
          className={`flex  items-center gap-[5vw] px-[2vw]  hover:text-[#008767]  ${
            clicked ? " text-[#008767]" : ""
          } `}
        >
          <a href="/">
            <button onClick={handleClick}>Device Monitoring</button>
          </a>
        </div>
        <div className="flex  items-center gap-[5vw] px-[2vw]  hover:text-[#5932EA]">
          <a href="/itemMaster">
            <button>Item Master</button>
          </a>
        </div>
        <div className="flex  items-center gap-[5vw] px-[2vw]  hover:text-[#2078E4]">
          <a href="/Vendors">
            <button>Vendors</button>
          </a>
        </div>
        <div className="flex  items-center gap-[5vw] px-[2vw]  hover:text-[#DE7E0E]">
          <a href="/LocationMaster">
            <button>Location Master</button>
          </a>
        </div>
        <div className="flex  items-center gap-[5vw] px-[2vw]  hover:text-[#A31436]">
          <a href="/DeviceLocationMapping">
            <button>Device Location Mapping</button>
          </a>
        </div>
        <div className="flex  items-center gap-[5vw] px-[2vw]  hover:text-[#EA3232]">
          <a href="/PreProvisionTable">
            <button>Pre Provision Table</button>
          </a>
        </div>
      </div>
    </section>
  );
}
