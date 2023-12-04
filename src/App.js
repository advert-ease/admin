"use client"
import { useEffect, useState } from "react";
import "./App.css";
import firebase from "./myfirebase";
import { storage } from "./myfirebase";
// import storage
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  orderByKey,
  query,
} from "firebase/database";

import { ref as Ref, uploadBytesResumable } from "firebase/storage"


// import { getStorage } from "firebase/storage";
// import { initializeApp } from "firebase/app";

function App() {
  const [data, setData] = useState([]);
  const [dataDev, setDataDev] = useState([]);
  const [channel, setChannels] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [allAdds, setAllAdds] = useState([]);

  const [filter, setFilter] = useState("debug")
  // const [link, setLink] = useState("")
  // const [adid, setAdid] = useState("")
  // const [start, setStart] = useState()

  const [pinnedDevices, setPinnedDevices] = useState([])
  const [addVideos, setAddVideos] = useState([])
  const [video, setVideo] = useState()

  const fetchData1 = () => {
    const db = getDatabase();
    const piRef = ref(db, "pi_name-cha/");
    // const devRef = ref(db, "devices/");
    // const newData = []

    onValue(piRef, (snapshot) => {
      const newData = [];
      // console.log(snapshot);
      let obj = {}
      snapshot.forEach((item) => {
        // let esp_lseen, dev_lseen, x, y, z, device_state_esp, device_state;
        let x, y, z

        // console.log(child);
        const idvlRef = ref(db, "pi_name-cha/" + item.key);

        // console.log(item);
        // const iddevRef = ref(db, "devices/" + item.key);
        // const esptRef = ref(db, "esptime/" + item.key)

        // onValue(esptRef, (snap) => {
        //   snap.forEach((doc) => {
        //     if (doc.key === "last_seen") {
        //       esp_lseen = doc.val();
        //       const espDate = new Date(doc.val())
        //       const currentDate = new Date()
        //       const timeDiff = currentDate - espDate
        //       const secondsBehind = Math.floor(timeDiff / 1000)
        //       device_state_esp = secondsBehind
        //     }
        //   });
        // });

        // onValue(iddevRef, (snap) => {
        //   snap.forEach((doc) => {
        //     if (doc.key === "last_seen") {
        //       dev_lseen = doc.val();
        //       const espDate = new Date(doc.val())
        //       const currentDate = new Date()
        //       const timeDiff = currentDate - espDate
        //       const secondsBehind = Math.floor(timeDiff / 1000)
        //       device_state = secondsBehind
        //     }

        //   });
        // });


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
        obj = { name: item.key, ad: z, cha: x, rest: y }
        newData.push(obj)
        setData(newData);
        // setData(data.push(obj))
        // setData(ele=>[...ele,obj])
      });
      // setData(item=>[...item,obj])
      console.log(newData)
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

  const fetchData3 = () => {
    const db = getDatabase()
    const arr = []

    data
    // .filter(item => item.name == filter || item.cha == filter || item.ad == filter)
    .map(item => {
      const esptRef = ref(db, "esptime/" + item.name)
      const iddevRef = ref(db, "devices/" + item.name);
      const deviceRef = ref(db, "pi_name-cha/" + item.name)

      let esp_lseen, device_state_esp, device_state, dev_lseen, devSwitch

      onValue(esptRef, (snap) => {
        snap.forEach((doc) => {
          if (doc.key === "last_seen") {
            esp_lseen = doc.val();
            // console.log(esp_lseen);
            const espDate = new Date(doc.val())
            const currentDate = new Date()
            const timeDiff = currentDate - espDate
            const secondsBehind = Math.floor(timeDiff / 1000)
            device_state_esp = secondsBehind
          }
        });
      });

      onValue(iddevRef, (snap) => {
        snap.forEach((doc) => {
          if (doc.key === "last_seen") {
            dev_lseen = doc.val();
            const espDate = new Date(doc.val())
            const currentDate = new Date()
            const timeDiff = currentDate - espDate
            const secondsBehind = Math.floor(timeDiff / 1000)
            device_state = secondsBehind
          }
        })
      })

      onValue(deviceRef, (snap) => {
        snap.forEach((doc) => {
          if (doc.key == "espctr")
            devSwitch = doc.val()
        })
      })
      //   });

      // console.log(`esp_lseen : ${esp_lseen}`);
      const obj = { name: item.name, cha: item.cha, ad: item.ad, esp_lseen: esp_lseen, dev_lseen: dev_lseen, devSwitch: devSwitch }
      // item = {...item,obj}
      console.log(item);
      
      arr.push(obj)
    })
    console.log(arr);
    setData(arr)
  }

  useEffect(() => {
    fetchData1();
    fetchData2()
    fetchData3()
  }, []);

  // useEffect(() => {
  //   fetchData3()
  //   return () => fetchData3();
  // },[]);

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
              channel: "debug",
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

  const handleAdd = () => {
    const details = { adid: "", start_time: "" }
    setAddVideos([...addVideos, details])
  }

  const handleVideoChanges = (index) => (e) => {
    // console.log(data);
    const newRes = addVideos.map((item, i) => {
      if (index == i)
        return { ...item, [e.target.name]: e.target.value, id: index };
      else return item;
    });

    setAddVideos(newRes)
  }

  const handleSave = async () => {
    const db = getDatabase()

    // const storageRef = storage.ref(`/${video.name}`)
    // console.log(storageRef);
    // // const fileRef = storageRef.child(video.name)
    // await storageRef.put(video)

    // console.log(storageRef);


    const storageRef = Ref(storage, `${video.name}`)
    console.log(storageRef);
    // 
    const uploadTask = uploadBytesResumable(storageRef, video)
    console.log(video);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(percent);
      },
      (err) => console.log(err),
      () => {
        console.log("success");
      }
    )

    let adArr = [], startArr = []
    addVideos.map((item, index) => {
      // adArr.push({index:item.adid})
      adArr.push(item.adid)
      startArr.push(item.start_time)
    })

    const adRef = ref(db, "advertisement/")
    // onValue(adRef,(snapshot)=>{

    onValue(ref(db, "advertisement/" + link), {
      start_time: startArr,
      adid: adArr
    })
    // })
    const postData = {
      adid: adArr,
      start_time: startArr
    }
    let link = video.name
    set(ref(db, 'advertisement/' + link), { vid_name: link })
    const ref1 = ref(db, 'advertisement/' + link + '/adid/')
    set(ref1, adArr).then(() => {
      // Success.
      console.log("ADDED");
    }).catch((error) => {
      console.log(error);
    });

    const ref2 = ref(db, 'advertisement/' + link + '/start_time/')
    set(ref2, startArr).then(() => {
      console.log("ADDED");
    }).catch((e) => {
      console.log(e);
    })
  }

  const handleRemoveItem = (index) => {
    console.log("HELLO");
    let arr = addVideos
    arr.filter(item => item.id != index)
    console.log(arr);
    // setAddVideos(arr)
  }

  const handleVideo = (e) => {
    const f = e.target.files[0]
    setVideo(f)
    console.log(f);
  }

  const handleSwitch = (item) => {
    const db = getDatabase()
    const piRef = ref(db, "pi_name-cha/" + item.name)

    update(piRef,{
      // URL:item.ad,
      "espctr":!item.devSwitch
    })
  }
  return (
    <div className="App">
      <div className="div-1">
        <div className="heading1">
          <div className="filter">
            <label
              className="filter-label"
            >filter :
            </label>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-input"
            />
          </div>
          <div
            className="device-table-div"
          >Device Table</div>
        </div>
        <table>
          <tr>
            <th>Device</th>
            <th>Restaurant</th>
            <th>Channel</th>
            <th>Ad</th>
            <th>Lastseen-device</th>
            <th>Lastseen-esp</th>
            {/* <th>Device State Esp</th> */}
            {/* <th>Device State</th> */}
            <th>Switch</th>
          </tr>
          {data?.filter(item => item.cha == filter || item.name == filter || item.ad == filter).map((item, index) => {
            console.log(item)
            return (
              <tr key={index} className="table-row">
                <td className="table-cell">{item.name}</td>
                <td className="table-cell">{item.rest}</td>
                <td className="table-cell">
                  <select
                    value={item.cha}
                    onChange={(e) => handleChangeChannel(item, e)}
                  >
                    {channel.map((item) => {
                      return <option>{item.name}</option>;
                    })}
                  </select>
                </td>
                <td className="table-cell">
                  <select
                    value={item.ad}
                    onChange={(e) => handleChangeUrl(item, e)}
                  >
                    {allAdds.map((item) => {
                      return <option>{item}</option>;
                    })}
                  </select>
                </td>

                <td className="table-cell">{item.dev_lseen}</td>
                <td className="table-cell">{item.esp_lseen}</td>
                {/* <td className={item.esp_count === 2 ? "table-cell-red" : item.esp_count === 1 ? "table-cell-yellow" : "table-cell-green"}></td> */}
                {/* <td className={item.dev_count === 2 ? "table-cell-red" : item.dev_count === 1 ? "table-cell-yellow" : "table-cell-green"}></td> */}
                <td><button onChange={handleSwitch(item)}>{item.devSwitch ? "OFF" : "ON"}</button></td>
              </tr>
            );
          })}
        </table>
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

      <div className="div-1">
        <h1>Upload Form</h1>
        <div className="upload-link-div">
          <label className="link-label">Link : </label>
          <input
            type="file"
            // value={video}
            onChange={handleVideo}
          />
        </div>
        <button onClick={handleAdd}>Add</button>

        {
          addVideos?.map((item, index) => {
            return <div>
              <div className="adid-div">
                <label className="link-label">Adid : </label>
                <input
                  type="text"
                  name='adid'
                  value={item.adid}
                  onChange={handleVideoChanges(index)}
                />
              </div>
              <div className="start-time-div">
                <label className="link-label">Start time : </label>
                <input
                  type="text"
                  name='start_time'
                  value={item.start_time}
                  onChange={handleVideoChanges(index)}
                />
              </div>
              <div>
                <button
                  className="remove-item"
                  onChange={handleRemoveItem(index)}>Remove</button>
              </div>

            </div>
          })
        }
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default App;
