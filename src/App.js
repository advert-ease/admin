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
} from "firebase/database";

function App() {
  const [data, setData] = useState([]);
  const [channel, setChannels] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [allAdds, setAllAdds] = useState([]);

  const fetchData1 = () => {
    const db = getDatabase();
    const piRef = ref(db, "pi_name-cha/");

    onValue(piRef, (snapshot) => {
      const newData = [];
      // console.log(snapshot);
      snapshot.forEach((item) => {
        let x, y, z;
        // console.log(child);
        const idvlRef = ref(db, "pi_name-cha/" + item.key);
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
        newData.push({ name: item.key, ad: z, cha: x, rest: y });
        setData(newData);
      });
    });
    // setData(arr);
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
            update(db, ref("pi_name-cha/" + id), {
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

  return (
    <div className="App">
      <div className="div-1">
        <h1>DEVICE TABLE</h1>
        <table>
          <tr>
            <th>Device</th>
            <th>Restaurent</th>
            <th>Channel</th>
            <th>Ad</th>
          </tr>
          {data.map((item, index) => {
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
    </div>
  );
}

export default App;
