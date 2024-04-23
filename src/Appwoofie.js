"use client";
import { useEffect, useState } from "react";
import "./App.css";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import firebase from "./myfirebase";

import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  orderByKey,
  query,
} from "firebase/database";
import { Nav } from "./components/Nav/Nav";
import { TopDiv } from "./components/TopDiv/TopDiv";

export default function App() {
  const [data, setData] = useState([]);
  const [dataDev, setDataDev] = useState([]);
  const [channel, setChannels] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [allAdds, setAllAdds] = useState([]);

  const fetchData1 = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const piRef = ref(db, "pi_name-cha/");
      const devRef = ref(db, "devices/");

      const newData = [];

      onValue(piRef, (snapshot) => {
        snapshot.forEach((item) => {
          let esp_lseen, dev_lseen, x, y, z, statusDev;
          const idvlRef = ref(db, "pi_name-cha/" + item.key);
          const iddevRef = ref(db, "devices/" + item.key);
          console.log(iddevRef);
          const esptRef = ref(db, "esptime/" + item.key);

          onValue(esptRef, (snap) => {
            snap.forEach((doc) => {
              if (doc.key === "last_seen") {
                esp_lseen = doc.val();
              }
            });
          });

          onValue(iddevRef, (snap) => {
            snap.forEach((doc) => {
              if (doc.key === "last_seen") {
                dev_lseen = doc.val();
              }
            });
          });
          onValue(iddevRef, (snap) => {
            snap.forEach((doc) => {
              if (doc.key === "status") {
                statusDev = doc.val();
              }
            });
          });

          onValue(idvlRef, (snap) => {
            snap.forEach((doc) => {
              if (doc.key === "URL") {
                z = doc.val();
              }
              if (doc.key === "channel") {
                x = doc.val();
              }
              if (doc.key === "cust_id") {
                y = doc.val();
              }
            });
          });
          newData.push({
            name: item.key,
            ad: z,
            cha: x,
            rest: y,
            lastSeen: dev_lseen,
            espLastSeen: esp_lseen,
            status: statusDev,
            pinned: false, // Initialize pinned state to false
          });
        });
        setData(newData);
        console.log(newData);
        resolve(newData);
      });
    });
  };

  const fetchData2 = () => {
    const db = getDatabase();
    const chRef = ref(db, "pi_cha-status/");
    onValue(chRef, (snapshot) => {
      const newData = [];
      snapshot.forEach((item) => {
        // console.log(item.val());
        newData.push({ name: item.key, mode: item.val() });
        setChannels(newData);
        // arr1.push({name:item.key,mode:item.val()})
      });
    });

    const adRef = ref(db, "ad_name/");
    const newAd = [];
    onValue(adRef, (snapshot) => {
      snapshot.forEach((item) => {
        newAd.push(item.val());
        setAllAdds(newAd);
        // setAllAdds((i) => [...i, item.val()]);
      });
    });
  };
  useEffect(() => {
    let previousData = {};
    let sameDataDurations = {};
    let sameDataDurationsESP = {};

    const updateTableDevice = (itemName, color, text, textColor) => {
      // Find the table row corresponding to the item name
      const tableRow = document.querySelector(`tr[data-name="${itemName}"]`);

      // If the table row exists, update the color of the last cell
      if (tableRow) {
        const lastCell = tableRow.querySelector(".color-cell");
        console.log(lastCell);
        if (lastCell) {
          lastCell.style.backgroundColor = color;
          
          lastCell.innerText = text;
          lastCell.style.color = textColor;
        }
      }
    };
    const updateTableESP = (itemName, color,  text, textColor) => {
      // Find the table row corresponding to the item name
      const tableRow = document.querySelector(`tr[data-name="${itemName}"]`);

      // If the table row exists, update the color of the last cell
      if (tableRow) {
        const lastCell = tableRow.querySelector(".color-cell-esp");
        console.log(lastCell);
        if (lastCell) {
          lastCell.style.backgroundColor = color;
         
          lastCell.innerText = text;
          lastCell.style.color = textColor;
        }
      }
    };

    const fetchDataInterval = setInterval(() => {
      fetchData1()
        .then((newData) => {
          console.log(newData);
          newData.sort((a, b) => {
            if (a.status === "online" && b.status !== "online") {
              return -1; // a should come before b
            } else if (a.status !== "online" && b.status === "online") {
              return 1; // b should come before a
            } else {
              return 0; // no change in ordering
            }
          });
          newData.forEach((newItem) => {
            const prevItem = previousData[newItem.name];
            console.log(newItem.lastSeen);
            if (!prevItem || prevItem.lastSeen !== newItem.lastSeen) {
              // Data changed, reset duration and log green
              sameDataDurations[newItem.name] = 0;
              console.log(
                `%c${newItem.name} is initially fetched.`,
                "color: green"
              );
              updateTableDevice(newItem.name, "rgba(0,255,0,0.4)", "Active", "green");
            } else {
              // Data remains the same, increment duration
              sameDataDurations[newItem.name] += 5;

              if (sameDataDurations[newItem.name] === 5) {
                console.log(
                  `%c${newItem.name} has remained the same for ${
                    sameDataDurations[newItem.name]
                  } seconds.`,
                  "color: orange"
                );
                updateTableDevice(newItem.name, "	rgba(255, 165, 0, 0.4)", "No Response", "rgba(255, 165, 0, 1)");
              } else if (sameDataDurations[newItem.name] >= 10) {
                console.log(
                  `%c${newItem.name} has remained the same for ${
                    sameDataDurations[newItem.name]
                  } seconds.`,
                  "color: red"
                );
                updateTableDevice(newItem.name, "rgba(255, 0, 0, 0.4)", "InActive","rgba(255,0,0,1)");
              }
            }
            if (!prevItem || prevItem.espLastSeen !== newItem.espLastSeen) {
              // Data changed, reset duration and log green
              sameDataDurationsESP[newItem.name] = 0;
              console.log(
                `%c${newItem.name} is initially fetched.`,
                "color: green"
              );
              updateTableESP(newItem.name, "rgba(0,255,0,0.4)", "Active","green");
            } else {
              // Data remains the same, increment duration
              sameDataDurationsESP[newItem.name] += 5;

              if (sameDataDurationsESP[newItem.name] === 5) {
                console.log(
                  `%c${newItem.name} has remained the same for ${
                    sameDataDurationsESP[newItem.name]
                  } seconds.`,
                  "color: orange"
                );
                updateTableESP(newItem.name, "rgba(255, 165, 0,0.4)","No Response", "orange");
              } else if (sameDataDurationsESP[newItem.name] >= 10) {
                console.log(
                  `%c${newItem.name} has remained the same for ${
                    sameDataDurationsESP[newItem.name]
                  } seconds. `,
                  "color: red "
                  
                );
                updateTableESP(newItem.name, "rgba(255,0,0,0.4 )", "InActive" , "red");
              }
            }
          });

          previousData = newData.reduce((prev, current) => {
            prev[current.name] = current;
            return prev;
          }, {});
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 5000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const handleChangeMode = (item) => {
    const db = getDatabase();
    // console.log(item);
    // console.log(JSON.stringify(options));
    // let arr = []

    update(ref(db, "pi_cha-status/"), {
      [item.name]: !item.mode,
    });
  };

  const handleChangeChannel = (item, e) => {
    const db = getDatabase();
    // console.log(e.target.value);
    update(ref(db, "pi_name-cha/" + item.name), {
      channel: e.target.value,
    });
    update(ref(db, "data_log/" + item.name), {
      changed_by: "admin",
      action: `Channel Changed from ${item.cha} to ${e.target.value}`,
    });
  };

  const handleChangeUrl = (item, e) => {
    const db = getDatabase();
    update(ref(db, "pi_name-cha/" + item.name), {
      URL: e.target.value,
    });
    update(ref(db, "data_log/" + item.name), {
      changed_by: "admin",
      action: `URL changed from ${item.URL} to ${e.target.value}`,
    });
  };
  const [loading, setLoading] = useState(false);

  const handleSwitchToggle = (deviceId, newValue) => {
    const db = getDatabase();
    const piChaRef = ref(db, `pi_name-cha/${deviceId}`);
    setLoading(true);

    // Update espctr value directly
    update(piChaRef, {
      espctr: newValue,
    })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        setLoading(false);
      });
  };

  const handleRegister = () => {
    const db = getDatabase();
    console.log("in Register Device");
    const deviceRef = query(ref(db, "devices"), orderByKey());
    // deviceRef

    onValue(deviceRef, (snaps) => {
      snaps.forEach((child) => {
        var id = child.key;
        console.log(id);
        // db.ref("pi_name-cha/" + id).
        onValue(ref(db, "pi_name-cha/" + id), (snap) => {
          if (snap.exists()) {
            console.log("NODE: " + snap.key + " EXISTS, NOT UPDATING");
          } else {
            console.log("NODE: " + snap.key + " DOES NOT EXIST, UPDATING");
            // db.ref()
            // .child("pi_name-cha/" + id)
            update(ref(db, "pi_name-cha/" + id), {
              URL: "10 Creative Commercial Ad 2022।.mp4",
              adid: {
                0: "ad000",
                1: "ad001",
                2: "ad002",
                3: "ad003",
                4: "ad004",
                5: "ad005",
                6: "ad006",
                7: "ad007",
                8: "ad008",
                9: "ad009",
              },
              channel: "sports2",
              start_time: {
                0: "0",
                1: "40",
                2: "85",
                3: "120",
                4: "151",
                5: "180",
                6: "210",
                7: "238",
                8: "267",
                9: "326",
              },
            });
          }
        });
      });
    });
  };
  const handlePinToggle = (item) => {
    setData((prevData) => {
      const newData = prevData.map((dataItem) => {
        if (dataItem === item) {
          console.log(dataItem);
          return { ...dataItem, pinned: !dataItem.pinned };
        }
        return dataItem;
      });
      // Sort the data array based on the pinned status
      newData.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
      return newData;
    });
  };
 
  return (
    <>
     
     <Nav />
    <div className=" bg-gray-200 px-[5vw] py-[20px] flex flex-col justify-center items-center">
      <TopDiv/>
     

       
      





     <div className="w-full bg-slate-50 rounded-xl px-4 py-4 shadow-xl mt-6">
        <div className="flex px-10">
        <h1 className="p-5 font-bold text-[25px] pl-2">DEVICE TABLE</h1>
        <div className="py-3">
        <Input placeholder="Search here..." prefix={<SearchOutlined />} 
        className="w-[20vw] h-[5vh]"/>
        </div>
        {/* <form className="w-[400px] relative  pr-10 py-3">
          <div className="relative flex">
            <img src="searchicon.svg" alt="search" className="w-[25px] absolute mt-5 pl-2 " />
            <input type="Search" 
            placeholder="   Search here..."
            className="w-full p-4 rounded-[25px] bg-slate-50 shadow-md" />
            </div>
        </form> */}
        </div>
        <div className="div-1 flex flex-col justify-center items-center  ">
       
        <div className="overflow-auto">
        <table className=" table-fixed">
          <tbody >
            <tr className="border border-solid border-l-0 border-r-0 p-3 w-max"> 
              <th className=" w-15 p-4 text-lg font-semibold tracking-wide text-left text-gray-400">Device</th>
              <th className=" w-20 p-4 text-lg  font-semibold tracking-wide text-left text-gray-400">Restaurant</th>
              <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-gray-400">Channel</th>
              <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-gray-400">Ad</th>
              <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-gray-400">Last Seen-Device</th>
              <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-gray-400">Last Seen-ESP</th>
              <th className="w-20 p-4 text-lg font-semibold tracking-wide text-left text-gray-400" >Device State</th>
              <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-gray-400">Device State ESP</th>
              <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-gray-400" >Switch</th>
            </tr>
            {data.map((item, index) => (
              <tr
                key={index}
                // className={`table-row ${item.pinned ? "pinned" : ""}`}
                className="table-row border border-solid border-l-0 border-r-0"
                data-name={item.name}
              >
                <td className="table-cell p-3 text-sm text-gray-700 ">{item.name}</td>
                <td className="table-cell p-3 text-sm text-gray-700">{item.rest}</td>
                <td className="table-cell p-3 etxt-sm text-gray-700">
                  <select
                    value={item.cha}
                    onChange={(e) => handleChangeChannel(item, e)}
                  >
                    {channel.map((channelItem, index) => (
                      <option key={index}>{channelItem.name}</option>
                    ))}
                  </select>
                </td>
                <td className="table-cell p-3 text-sm text-gray-700">
                  <select
                    value={item.ad}
                    onChange={(e) => handleChangeUrl(item, e)}
                  >
                    {allAdds.map((addItem, index) => (
                      <option key={index}>{addItem}</option>
                    ))}
                  </select>
                </td>

                <td className="table-cell p-3 text-sm text-gray-700">{item.lastSeen}</td>
                <td className="table-cell p-3 text-sm text-gray-700">{item.espLastSeen}</td>
                <td className=" p-4">
                  <div className="color-cell"></div>
                </td>
                <td className=" p-4">
                  <div className="color-cell-esp"></div>
                </td>
                <td className="table-cell bg-transparent">
                  <label className="switch-main-table flex">
                    <input
                      type="checkbox" 
                      checked={item.espctr}
                      onChange={(e) =>
                        handleSwitchToggle(item.name, e.target.checked)
                      }
                      disabled={loading}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                {/* <td className="pin-cell">
                  <button onClick={() => handlePinToggle(item)}>
                    {item.pinned ? "Unpin" : "Pin"}
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      </div>
      <div className="register-div ">
        <button onClick={handleRegister} className="register hover:shadow-md">
          Register a device
        </button>
      </div>
      <div className="div-1 flex flex-col  bg-slate-50 rounded-xl  mt-7 w-[40%]  justify-center items-center shadow-xl">
        <h1 className=" font-bold text-[25px] pl-[50px] justify-center items-center p-5">CHANNEL TABLE</h1>
        <div className="overflow-auto rounded-[20px] ">
        <table className="sec-table   rounded-xl justify-center items-center table-fixed">
          <tr className="border border-solid border-l-0 border-r-0 p-3 ">
            <th className="p-4 text-[18px] font-semibold tracking-wide text-left text-gray-400 px-16 pr-6">Channel</th>
            <th className="p-4 text-[18px] font-semibold tracking-wide text-left text-gray-400 px-16">Mode</th>
            <th className="p-4 text-[18px] font-semibold tracking-wide text-left text-gray-400 px-16">Switch</th>
          </tr>
          {channel.map((item) => {
            return (
              <tr className="border border-solid border-l-0 border-r-0 py-[200px] ">
                <td className="table-cell px-16 py-[20px]">{item.name}</td>
                <td className="table-cell px-16">
                  {item.mode ? "TV Mode" : "AD Mode"}
                </td>
                <td className="table-cell px-16">
                  <button
                    className="switch hover:shadow-md"
                    onClick={() => handleChangeMode(item)}
                  >
                    Switch
                  </button>
                </td>
              </tr>
            );
          })}
        </table>

        </div>
      </div>
   
    </div>
    </>
  )
        }
