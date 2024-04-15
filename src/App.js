"use client";
import { useEffect, useState } from "react";
import "./App.css";
import firebase from "./myfirebase";
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  orderByKey,
  query,
  get,
} from "firebase/database";

function App() {
  const [data, setData] = useState([]);
  const [dataDev, setDataDev] = useState([]);
  const [channel, setChannels] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [allAdds, setAllAdds] = useState([]);
  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);
  const fetchData1 = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const piRef = ref(db, "pi_name-cha/");
      const devRef = ref(db, "devices/");

      const newData = [];

      onValue(piRef, (snapshot) => {
        snapshot.forEach((item) => {
          let esp_lseen, dev_lseen, x, y, z, statusDev, devRest, switchChecked;
          const idvlRef = ref(db, "pi_name-cha/" + item.key);
          const iddevRef = ref(db, "devices/" + item.key);
          // console.log(iddevRef);
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
              if (doc.key === "restaurant") {
                devRest = doc.val();
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
          onValue(idvlRef, (snap) => {
            snap.forEach((doc) => {
              if (doc.key === "espctr") {
                switchChecked = doc.val();
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
            restaurantDev: devRest,
            switchChecked: switchChecked,
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
        console.log(allAdds);
        // setAllAdds((i) => [...i, item.val()]);
      });
    });
  };

  useEffect(() => {
    let previousData = {};
    let sameDataDurations = {};
    let sameDataDurationsESP = {};

    const updateTableDevice = (
      itemName,
      color,
      devLastSeen,
      adName,
      chaName,
      switchChecked
    ) => {
      // Find the table row corresponding to the item name
      const tableRow = document.querySelector(`tr[data-name="${itemName}"]`);

      // If the table row exists, update the color of the last cell
      if (tableRow) {
        const lastCell = tableRow.querySelector(".color-cell");
        const devTimeCell = tableRow.querySelector(".table-cell-dev");
        const adNameCell = tableRow.querySelector(".ad-name");
        const chaNameCell = tableRow.querySelector(".cha-name");
        const switchESPCell = tableRow.querySelector(
          ".switch-cell .switch-esp"
        );

        console.log(switchESPCell);
        if (lastCell) {
          devTimeCell.textContent = devLastSeen;
          lastCell.style.backgroundColor = color;
          adNameCell.value = adName;
          chaNameCell.value = chaName;
          if (switchESPCell) {
            console.log("hi");
            switchESPCell.checked = switchChecked;
          }
        }
      }
    };
    const updateTableESP = (itemName, color, espTime) => {
      // Find the table row corresponding to the item name
      const tableRow = document.querySelector(`tr[data-name="${itemName}"]`);

      // If the table row exists, update the color of the last cell
      if (tableRow) {
        const espTimeCell = tableRow.querySelector(".table-cell-esp");
        const lastCell = tableRow.querySelector(".color-cell-esp");

        if (lastCell) {
          espTimeCell.textContent = espTime;
          lastCell.style.backgroundColor = color;
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
            if (!prevItem || prevItem.lastSeen !== newItem.lastSeen) {
              // Data changed, reset duration and log green
              sameDataDurations[newItem.name] = 0;
              // console.log(
              //   `%c${newItem.name} is initially fetched.`,
              //   "color: green"
              // );
              updateTableDevice(
                newItem.name,
                "green",
                newItem.lastSeen,
                newItem.ad,
                newItem.cha,
                newItem.switchChecked
              );
            } else {
              // Data remains the same, increment duration
              sameDataDurations[newItem.name] += 5;

              if (sameDataDurations[newItem.name] === 5) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurations[newItem.name]
                //   } seconds.`,
                //   "color: orange"
                // );
                updateTableDevice(
                  newItem.name,
                  "orange",
                  newItem.lastSeen,
                  newItem.ad,
                  newItem.cha,
                  newItem.switchChecked
                );
              } else if (sameDataDurations[newItem.name] === 10) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurations[newItem.name]
                //   } seconds.`,
                //   "color: pink"
                // );
                updateTableDevice(
                  newItem.name,
                  "orange",
                  newItem.lastSeen,
                  newItem.ad,
                  newItem.cha,
                  newItem.switchChecked
                );
                const db = getDatabase();
                const itemRef = ref(db, "pi_name-cha/" + newItem.name);
                update(itemRef, {
                  espctr: false, // Update espctr to false
                }).then(() => {
                  // Once updated, set it back to true after a brief delay
                  setTimeout(() => {
                    update(itemRef, {
                      espctr: true, // Set espctr back to true
                    });
                  }, 100); // Delay in milliseconds
                });

                // Log the channel change action
                update(ref(db, "data_log/" + newItem.name), {
                  changed_by: "admin",
                  action: `restarted device ${newItem.name}`,
                });
              } else if (sameDataDurations[newItem.name] >= 15) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurations[newItem.name]
                //   } seconds.`,
                //   "color: red"
                // );
                updateTableDevice(
                  newItem.name,
                  "red",
                  newItem.lastSeen,
                  newItem.ad,
                  newItem.cha,
                  newItem.switchChecked
                );
              }
            }

            if (!prevItem || prevItem.espLastSeen !== newItem.espLastSeen) {
              // Data changed, reset duration and log green
              sameDataDurationsESP[newItem.name] = 0;
              // console.log(
              //   `%c${newItem.name} is initially fetched.`,
              //   "color: green"
              // );
              updateTableESP(newItem.name, "green", newItem.espLastSeen);
            } else {
              // Data remains the same, increment duration
              sameDataDurationsESP[newItem.name] += 5;

              if (sameDataDurationsESP[newItem.name] === 5) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurationsESP[newItem.name]
                //   } seconds.`,
                //   "color: orange"
                // );
                updateTableESP(newItem.name, "orange", newItem.espLastSeen);
              } else if (
                sameDataDurationsESP[newItem.name] >= 10 &&
                sameDataDurationsESP[newItem.name] < 15
              ) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurationsESP[newItem.name]
                //   } seconds.`,
                //   "color: pink"
                // );
                updateTableESP(newItem.name, "orange", newItem.espLastSeen);
              } else if (sameDataDurationsESP[newItem.name] >= 15) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurationsESP[newItem.name]
                //   } seconds.`,
                //   "color: red"
                // );
                updateTableESP(newItem.name, "red", newItem.espLastSeen);
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
    }, 300000);

    return () => clearInterval(fetchDataInterval);
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

  const handleChangeUrl = async (item, e) => {
    try {
      const db = getDatabase();
      const adRef = ref(db, "advertisement/vid1");
      const snapshot = await get(adRef);
      const url = e.target.value;
      if (snapshot.exists()) {
        const vid1Data = snapshot.val().adid;
        const vid1StartTime = snapshot.val().start_time;
        console.log(vid1Data);
        console.log(e);

        await Promise.all([
          update(ref(db, "pi_name-cha/" + item.name), {
            URL: url,
            adid: vid1Data,
            start_time: vid1StartTime,
          }),
          update(ref(db, "data_log/" + item.name), {
            changed_by: "admin",
            action: `URL changed from ${item.URL} to ${e.target.value}`,
          }),
        ]);

        console.log("Firebase data updated successfully");
      } else {
        console.log("No data exists at the specified path.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleChangeUrl = (item, e) => {
  //   const db = getDatabase();
  //   const adRef = ref(db, "advertisement/vid1");
  //   const adReftest = ref(db, "pi_name-cha/");
  //   console.log(adReftest);
  //   console.log(adRef);

  //   console.log(e);
  //   update(ref(db, "pi_name-cha/" + item.name), {
  //     URL: e.target.value,
  //   });
  //   update(ref(db, "data_log/" + item.name), {
  //     changed_by: "admin",
  //     action: `URL changed from ${item.URL} to ${e.target.value}`,
  //   });
  // };
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
    <div className="App">
      <div className="div-1">
        <h1>DEVICE TABLE</h1>
        <table>
          <tbody>
            <tr>
              <th>Device</th>
              <th>Restaurant</th>
              <th>Channel</th>
              <th>Ad</th>
              <th>Lastseen-device</th>
              <th>Lastseen-ESP</th>
              <th>Device State</th>
              <th>Device State ESP</th>
              <th className="switch-div">Switch</th>
            </tr>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`table-row ${item.pinned ? "pinned" : ""}`}
                data-name={item.name}
              >
                <td className="table-cell">{item.name}</td>
                <td className="table-cell">{item.restaurantDev}</td>
                <td className="table-cell">
                  <select
                    // value={item.cha}
                    className="cha-name"
                    onChange={(e) => handleChangeChannel(item, e)}
                  >
                    {channel.map((channelItem, index) => (
                      <option key={index}>{channelItem.name}</option>
                    ))}
                  </select>
                </td>
                <td className="table-cell">
                  <select
                    className="ad-name"
                    // value={item.ad}
                    onChange={(e) => handleChangeUrl(item, e)}
                  >
                    {allAdds.map((addItem, index) => (
                      <option key={index}>{addItem}</option>
                    ))}
                  </select>
                </td>

                <td className="table-cell-dev">{item.lastSeen}</td>
                <td className="table-cell-esp">{item.espLastSeen}</td>
                <td className="">
                  <div className="color-cell"></div>
                </td>
                <td className="color-cell-esp"></td>
                <td className="switch-cell">
                  <label className="switch flex">
                    <input
                      type="checkbox"
                      checked={item.espctr}
                      onChange={(e) =>
                        handleSwitchToggle(item.name, e.target.checked)
                      }
                      disabled={loading}
                      className="switch-esp"
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
        ;
      </div>
      <div className="register-div">
        <button onClick={handleRegister} className="register">
          Register a device
        </button>
      </div>
      <div className="div-1">
        <h1>CHANNEL TABLE</h1>
        <table>
          <tr>
            <th>Channel</th>
            <th>Mode</th>
            <th>Switch</th>
          </tr>
          {channel.map((item) => {
            return (
              <tr>
                <td className="table-cell">{item.name}</td>
                <td className="table-cell">
                  {item.mode ? "TV Mode" : "AD Mode"}
                </td>
                <td className="table-cell">
                  <button
                    className="switch"
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
  );
}

export default App;
