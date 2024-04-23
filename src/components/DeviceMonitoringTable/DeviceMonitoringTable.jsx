"use client";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "./helper.css";

import firebase from "../../myfirebase";

import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  orderByKey,
  query,
  remove,
  get,
} from "firebase/database";
import { ChannelTable } from "../ChannelTable/ChannelTable";
import { RegisterDevice } from "../RegisterDevice/RegisterDevice";
export function DeviceMonitoringTable() {
  const [data, setData] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [dataDev, setDataDev] = useState([]);
  const [channel, setChannels] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [allAdds, setAllAdds] = useState([]);
  useEffect(() => {
    // fetchData1();
    fetchData2();
  }, []);
  const fetchData1 = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const piRef = ref(db, "pi_name-cha/");
      const devRef = ref(db, "devices/");

      onValue(piRef, (snapshot) => {
        const newData = [];
        snapshot.forEach((item) => {
          let esp_lseen,
            dev_lseen,
            x,
            y,
            z,
            statusDev,
            devRest,
            switchChecked,
            UtcDev,
            UtcEsp,
            colourStat;
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
          onValue(idvlRef, (snap) => {
            snap.forEach((doc) => {
              if (doc.key === "statusColour") {
                colourStat = doc.val();
              }
              if (doc.key === "last_checked_time_dev") {
                UtcDev = doc.val();
              }
              if (doc.key === "last_checked_time_esp") {
                UtcEsp = doc.val();
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
            colourStat: colourStat,
            UtcDev: UtcDev,
            UtcEsp: UtcEsp,
          });
        });
        setData(newData);

        resolve(newData);
      });
    });
  };
  const fetchData1color = () => {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      const piRef = ref(db, "pi_name-cha/");
      const devRef = ref(db, "devices/");

      const newData = [];

      onValue(piRef, (snapshot) => {
        snapshot.forEach((item) => {
          let esp_lseen,
            dev_lseen,
            x,
            y,
            z,
            statusDev,
            devRest,
            switchChecked,
            UtcDev,
            UtcEsp,
            colourStat;
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
          onValue(idvlRef, (snap) => {
            snap.forEach((doc) => {
              if (doc.key === "statusColour") {
                colourStat = doc.val();
              }
              if (doc.key === "last_checked_time_dev") {
                UtcDev = doc.val();
              }
              if (doc.key === "last_checked_time_esp") {
                UtcDev = doc.val();
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
            colourStat: colourStat,
            UtcDev: UtcDev,
            UtcEsp: UtcEsp,
          });
        });
        setDataColor(newData);

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
    console.log("hi1");
    const updateTableDevice = (
      itemName,
      color,
      devLastSeen,
      adName,
      chaName,
      switchChecked,
      text,
      cha
    ) => {
      // Find the table row corresponding to the item name
      const tableRow = document.querySelector(`tr[data-name="${itemName}"]`);

      // If the table row exists, update the color of the last cell
      if (tableRow) {
        const lastCell = tableRow.querySelector(".color-cell");
        const devTimeCell = tableRow.querySelector(".table-cell-dev");
        const adNameCell = tableRow.querySelector(".ad-name");
        const chaNameCell = tableRow.querySelector(".cha-name");
        const thirdCell = document.querySelector(
          `tr[data-name="${itemName}"] td:nth-child(4)`
        );
        const switchESPCell = tableRow.querySelector(
          ".switch-cell .switch-esp"
        );

        if (lastCell) {
          devTimeCell.textContent = devLastSeen;
          lastCell.style.backgroundColor = color;
          lastCell.innerText = text;
          adNameCell.value = adName;
          chaNameCell.value = chaName;
          thirdCell.style.backgroundColor = cha ? "purple" : "yellow";
          thirdCell.style.color = cha ? "white" : "black";
          thirdCell.innerText = cha ? "AD Mode" : "TV Mode";
          if (switchESPCell) {
            switchESPCell.checked = switchChecked;
          }
        }
      }
    };
    const updateTableESP = (itemName, color, espTime, text) => {
      // Find the table row corresponding to the item name
      const tableRow = document.querySelector(`tr[data-name="${itemName}"]`);

      // If the table row exists, update the color of the last cell
      if (tableRow) {
        const espTimeCell = tableRow.querySelector(".table-cell-esp");
        const lastCell = tableRow.querySelector(".color-cell-esp");

        if (lastCell) {
          espTimeCell.textContent = espTime;
          lastCell.style.backgroundColor = color;
          lastCell.innerText = text;
        }
      }
    };

    const fetchDataInterval = setInterval(() => {
      fetchData1()
        .then((newData) => {
          newData.forEach((newItem) => {
            // Data changed, reset duration and log green

            const db = getDatabase();
            const dataLogRef = ref(db, `data_log/${newItem.name}`);
            let colourStatDev, colourStatEsp;
            const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);
            onValue(dataLogRef, (snapshot) => {
              snapshot.forEach((childSnapshot) => {
                const fieldValue = childSnapshot.val();
                if (fieldValue === "ad0-1") {
                  const deviceRef = ref(db, `data_log/${newItem.name}`);
                  remove(deviceRef)
                    .then(() => {
                      console.log(
                        `Device ${newItem.name} removed successfully.`
                      );
                    })
                    .catch((error) => {
                      console.error("Error removing device:", error);
                    });
                }
              });
            });

            const chaRef = ref(db, "pi_cha-status");
            let cha;
            onValue(chaRef, (snap) => {
              snap.forEach((doc) => {
                if (doc.key === newItem.cha) {
                  cha = doc.val();
                }
              });
            });
            console.log(cha);
            onValue(piChaRef, (snap) => {
              snap.forEach((doc) => {
                if (doc.key === "statusColourDev") {
                  colourStatDev = doc.val();
                }
                if (doc.key === "statusColourEsp") {
                  colourStatEsp = doc.val();
                }
              });
            });
            console.log(colourStatDev);
            console.log(colourStatEsp);
            let devCalcColour =
              colourStatDev == 0
                ? "green"
                : colourStatDev == 1
                ? "orange"
                : colourStatDev == 2
                ? "pink"
                : "red";
            let espCalcColour =
              colourStatEsp == 0
                ? "green"
                : colourStatEsp == 1
                ? "orange"
                : colourStatEsp == 2
                ? "pink"
                : "red";
            let espText =
              colourStatEsp == 0
                ? "Active"
                : colourStatEsp == 1
                ? "Non Responsive"
                : colourStatEsp == 2
                ? "restarting"
                : "InActive";
            let DevText =
              colourStatDev == 0
                ? "Active"
                : colourStatDev == 1
                ? "Non Responsive"
                : colourStatDev == 2
                ? "restarting"
                : "Inactive";
            updateTableDevice(
              newItem.name,
              devCalcColour,
              newItem.lastSeen,
              newItem.ad,
              newItem.cha,
              newItem.switchChecked,
              DevText,
              cha
            );
            updateTableESP(
              newItem.name,
              espCalcColour,
              newItem.espLastSeen,
              espText
            );
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 5000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    let previousData = {};
    let sameDataDurations = {};
    let sameDataDurationsESP = {};

    const fetchDataInterval2 = setInterval(() => {
      fetchData1()
        .then((newData) => {
          console.log(newData);
          // newData.sort((a, b) => {
          //   if (a.status === "online" && b.status !== "online") {
          //     return -1; // a should come before b
          //   } else if (a.status !== "online" && b.status === "online") {
          //     return 1; // b should come before a
          //   } else {
          //     return 0; // no change in ordering
          //   }
          // });
          newData.forEach((newItem) => {
            console.log(new Date(newItem.espLastSeen).getTime());
            console.log(new Date(newItem.UtcEsp).getTime());
            const prevItem = previousData[newItem.name];
            if (
              (!prevItem || prevItem.lastSeen !== newItem.lastSeen) &&
              new Date(newItem.UtcDev).getTime() -
                new Date(newItem.lastSeen).getTime() >
                300000
            ) {
              // Data changed, reset duration and log green
              sameDataDurations[newItem.name] = 0;
              const db = getDatabase();
              const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);
              const options = { timeZone: "Asia/Kolkata" };

              const currentTimeUTCDev = new Date().toLocaleString(
                "en-US",
                options
              );
              // Update espctr value directly
              update(piChaRef, {
                statusColourDev: "0",
                last_checked_time_dev: currentTimeUTCDev,
              });

              // console.log(
              //   `%c${newItem.name} is initially fetched.`,
              //   "color: green"
              // );
            } else {
              // Data remains the same, increment duration
              sameDataDurations[newItem.name] += 5;

              if (
                sameDataDurations[newItem.name] === 5 &&
                new Date(newItem.UtcDev).getTime() -
                  new Date(newItem.lastSeen).getTime() >
                  300000
              ) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurations[newItem.name]
                //   } seconds.`,
                //   "color: orange"
                // );
                const db = getDatabase();
                const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);
                const options = { timeZone: "Asia/Kolkata" };

                const currentTimeUTCDev = new Date().toLocaleString(
                  "en-US",
                  options
                );
                // Update espctr value directly
                update(piChaRef, {
                  statusColourDev: "1",
                  last_checked_time_dev: currentTimeUTCDev,
                });
              } else if (
                sameDataDurations[newItem.name] === 10 &&
                new Date(newItem.UtcDev).getTime() -
                  new Date(newItem.lastSeen).getTime() >
                  300000
              ) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurations[newItem.name]
                //   } seconds.`,
                //   "color: pink"
                // );
                const db1 = getDatabase();

                const piChaRef = ref(db1, `pi_name-cha/${newItem.name}`);
                const options = { timeZone: "Asia/Kolkata" };

                const currentTimeUTCDev = new Date().toLocaleString(
                  "en-US",
                  options
                );
                // Update espctr value directly
                update(piChaRef, {
                  statusColourDev: "2",
                  last_checked_time_dev: currentTimeUTCDev,
                });

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
                update(ref(db, "change_log/" + newItem.name), {
                  changed_by: "admin",
                  action: `restarted device ${newItem.name}`,
                  UpdatedTime: currentTimeUTCDev,
                });
              } else if (
                sameDataDurations[newItem.name] >= 15 &&
                new Date(newItem.UtcDev).getTime() -
                  new Date(newItem.lastSeen).getTime() >
                  300000
              ) {
                const db = getDatabase();
                const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);

                const options = { timeZone: "Asia/Kolkata" };

                const currentTimeUTCDev = new Date().toLocaleString(
                  "en-US",
                  options
                );
                // Update espctr value directly
                update(piChaRef, {
                  statusColourDev: "3",
                  last_checked_time_dev: currentTimeUTCDev,
                });
              }
            }

            if (
              (!prevItem || prevItem.espLastSeen !== newItem.espLastSeen) &&
              new Date(newItem.UtcEsp).getTime() -
                new Date(newItem.espLastSeen).getTime() >
                300000
            ) {
              // Data changed, reset duration and log green
              sameDataDurationsESP[newItem.name] = 0;
              // console.log(
              //   `%c${newItem.name} is initially fetched.`,
              //   "color: green"
              // );
              const db = getDatabase();
              const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);
              const options = { timeZone: "Asia/Kolkata" };

              const currentTimeUTCEsp = new Date().toLocaleString(
                "en-US",
                options
              );

              // Update espctr value directly
              update(piChaRef, {
                statusColourEsp: "0",
                last_checked_time_esp: currentTimeUTCEsp,
              });
            } else {
              // Data remains the same, increment duration
              sameDataDurationsESP[newItem.name] += 5;

              if (
                sameDataDurationsESP[newItem.name] === 5 &&
                new Date(newItem.UtcEsp).getTime() -
                  new Date(newItem.espLastSeen).getTime() >
                  300000
              ) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurationsESP[newItem.name]
                //   } seconds.`,
                //   "color: orange"
                // );
                const db = getDatabase();
                const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);
                const options = { timeZone: "Asia/Kolkata" };

                const currentTimeUTCEsp = new Date().toLocaleString(
                  "en-US",
                  options
                );
                // Update espctr value directly
                update(piChaRef, {
                  statusColourEsp: "1",
                  last_checked_time_esp: currentTimeUTCEsp,
                });
              } else if (
                sameDataDurationsESP[newItem.name] >= 10 &&
                sameDataDurationsESP[newItem.name] < 15 &&
                new Date(newItem.UtcEsp).getTime() -
                  new Date(newItem.espLastSeen).getTime() >
                  300000
              ) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurationsESP[newItem.name]
                //   } seconds.`,
                //   "color: pink"
                // );
                const db = getDatabase();
                const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);
                const options = { timeZone: "Asia/Kolkata" };

                const currentTimeUTCEsp = new Date().toLocaleString(
                  "en-US",
                  options
                );
                // Update espctr value directly
                update(piChaRef, {
                  statusColourEsp: "2",
                  last_checked_time_esp: currentTimeUTCEsp,
                });
              } else if (
                sameDataDurationsESP[newItem.name] >= 15 &&
                new Date(newItem.UtcEsp).getTime() -
                  new Date(newItem.espLastSeen).getTime() >
                  300000
              ) {
                // console.log(
                //   `%c${newItem.name} has remained the same for ${
                //     sameDataDurationsESP[newItem.name]
                //   } seconds.`,
                //   "color: red"
                // );
                const db = getDatabase();
                const piChaRef = ref(db, `pi_name-cha/${newItem.name}`);
                const options = { timeZone: "Asia/Kolkata" };

                const currentTimeUTCEsp = new Date().toLocaleString(
                  "en-US",
                  options
                );
                // Update espctr value directly
                update(piChaRef, {
                  statusColourEsp: "3",
                  last_checked_time_esp: currentTimeUTCEsp,
                });
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

    return () => clearInterval(fetchDataInterval2);
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

  const handleChangeChannel = (item, e, index) => {
    const db = getDatabase();
    const chaRef = ref(db, "pi_cha-status");
    let cha;
    onValue(chaRef, (snap) => {
      snap.forEach((doc) => {
        if (doc.key === e.target.value) {
          cha = doc.val();
        }
      });
    });
    console.log(cha);
    const chaCell = document.querySelector(`.color-cell-channel-${index}`);
    if (chaCell) {
      chaCell.style.backgroundColor = cha ? "purple" : "yellow";
      chaCell.innerText = cha ? "AD Mode" : "TV Mode";
      chaCell.style.color = cha ? "" : "black";
    }
    // console.log(e.target.value);
    update(ref(db, "pi_name-cha/" + item.name), {
      channel: e.target.value,
    });
    const options = { timeZone: "Asia/Kolkata" };
    const ISTDateString = new Date().toLocaleString("en-US", options);
    update(ref(db, "change_log/" + item.name), {
      changed_by: "admin",
      action: `Channel Changed from ${item.cha} to ${e.target.value}`,
      UpdatedTime: ISTDateString,
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
        const options = { timeZone: "Asia/Kolkata" };
        const ISTDateString = new Date().toLocaleString("en-US", options);
        await Promise.all([
          update(ref(db, "pi_name-cha/" + item.name), {
            URL: url,
            adid: vid1Data,
            start_time: vid1StartTime,
          }),

          update(ref(db, "change_log/" + item.name), {
            changed_by: "admin",
            action: `URL changed from ${item.URL} to ${e.target.value}`,
            UpdatedTime: ISTDateString,
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
    <section className="px-[2vw] py-[5vh] w-[100vw] ">
      <div className="w-full bg-white rounded-[30px] px-4 py-4 shadow-xl mt-6">
        <div className="flex px-10">
          <h1 className="p-5 font-bold text-[25px] pl-2 text-[#008767]">
            Device Monitoring
          </h1>
          <div className="py-3">
            <Input
              placeholder="Search here..."
              prefix={<SearchOutlined />}
              className="w-[20vw] h-[5vh]"
            />
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
        <div className="div-1 flex flex-col justify-center items-center overflow-x-auto ">
          <div className="overflow-auto">
            <table className=" table-fixed">
              <tbody>
                <tr className="border border-solid border-l-0 border-r-0 p-3 w-max">
                  <th className=" w-15 p-4 text-lg font-semibold tracking-wide text-left text-[#008767]">
                    Device
                  </th>
                  <th className=" w-20 p-4 text-lg  font-semibold tracking-wide text-left text-[#008767] ">
                    Restaurant
                  </th>
                  <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-[#008767] ">
                    Channel
                  </th>
                  <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-[#008767]">
                    Channel Status
                  </th>
                  <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-[#008767]">
                    Last Seen-Device
                  </th>
                  <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-[#008767]">
                    Last Seen-ESP
                  </th>
                  <th className="w-20 p-4 text-lg font-semibold tracking-wide text-left text-[#008767]">
                    Device State
                  </th>
                  <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-[#008767]">
                    Device State ESP
                  </th>
                  <th className=" w-20 p-4 text-lg font-semibold tracking-wide text-left text-[#008767]">
                    Switch
                  </th>
                </tr>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    // className={`table-row ${item.pinned ? "pinned" : ""}`}
                    className="table-row border border-solid border-l-0 border-r-0"
                    data-name={item.name}
                  >
                    <td className="table-cell p-3 text-sm text-gray-700 ">
                      {item.name}
                    </td>
                    <td className="table-cell p-3 text-sm text-gray-700">
                      {item.restaurantDev}
                    </td>
                    <td className="table-cell p-3 etxt-sm text-gray-700">
                      <select
                        // value={item.cha}
                        className="cha-name"
                        onChange={(e) => handleChangeChannel(item, e, index)}
                      >
                        {channel.map((channelItem, index) => (
                          <option key={index}>{channelItem.name}</option>
                        ))}
                      </select>
                    </td>
                    <td
                      style={{
                        width: "200",
                        backgroundColor: "white",
                        textAlign: "center",
                      }}
                      className={`color-cell-channel-${index}`}
                    ></td>
                    <td className="table-cell p-3 text-sm text-gray-700">
                      <select
                        value={item.ad}
                        className="ad-name"
                        onChange={(e) => handleChangeUrl(item, e)}
                      >
                        {allAdds.map((addItem, index) => (
                          <option key={index}>{addItem}</option>
                        ))}
                      </select>
                    </td>

                    <td className="table-cell-dev p-3 text-sm text-gray-700">
                      {item.lastSeen}
                    </td>
                    <td className="table-cell-esp p-3 text-sm text-gray-700">
                      {item.espLastSeen}
                    </td>
                    <td className=" p-4">
                      <div className="color-cell"></div>
                    </td>
                    <td className=" p-4">
                      <div className="color-cell-esp"></div>
                    </td>

                    <td className="switch-cell bg-transparent">
                      <label className="switch-main-table flex">
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
          </div>
          {/* <RegisterDevice /> */}
          {/* <ChannelTable /> */}
          <div className="div-1 flex flex-col  bg-slate-50 rounded-xl  mt-7 w-[40%]  justify-center items-center shadow-xl overflow-x-auto">
            <h1 className=" font-bold text-[25px] pl-[50px] justify-center items-center p-5">
              CHANNEL TABLE
            </h1>
            <div className="overflow-auto rounded-[20px] ">
              <table className="sec-table   rounded-xl justify-center items-center table-fixed">
                <tr className="border border-solid border-l-0 border-r-0 p-3 ">
                  <th className="p-4 text-[18px] font-semibold tracking-wide text-left text-gray-400 px-16 pr-6">
                    Channel
                  </th>
                  <th className="p-4 text-[18px] font-semibold tracking-wide text-left text-gray-400 px-16">
                    Mode
                  </th>
                  <th className="p-4 text-[18px] font-semibold tracking-wide text-left text-gray-400 px-16">
                    Switch
                  </th>
                </tr>
                {channel.map((item) => {
                  return (
                    <tr className="border border-solid border-l-0 border-r-0 py-[200px] ">
                      <td className="table-cell px-16 py-[20px]">
                        {item.name}
                      </td>
                      <td className="table-cell px-16">
                        {item.mode ? "AD Mode" : "TV Mode"}
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
      </div>
    </section>
  );
}
