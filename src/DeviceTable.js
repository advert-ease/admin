import { useEffect, useState } from "react";
import {
    getDatabase,
    ref,
    onValue,
    update,
    set,
    orderByKey,
    query,
  } from "firebase/database";

import './App.css'

const DeviceTable = ({data,setData,handleChangeChannel,handleChangeUrl,allAdds,filter,channel})=>{
    
    // const fetchData1 = async () => {
    //     const db = getDatabase();
    //     const piRef = ref(db, "pi_name-cha/");
    //     const devRef = ref(db, "devices/");
    //     const newData = []
    
    //     onValue(piRef, (snapshot) => {
    //       // const newData = [];
    //       // console.log(snapshot);
    //       let obj = {}
    //       snapshot.forEach((item) => {
    //         let esp_lseen, dev_lseen, x, y, z, device_state_esp, device_state;
    //         // console.log(child);
    //         const idvlRef = ref(db, "pi_name-cha/" + item.key);
    
    //         // console.log(item);
    //         // const iddevRef = ref(db, "devices/" + item.key);
    //         // const esptRef = ref(db, "esptime/" + item.key)
    
    //         // onValue(esptRef, (snap) => {
    //         //   snap.forEach((doc) => {
    //         //     if (doc.key === "last_seen") {
    //         //       esp_lseen = doc.val();
    //         //       const espDate = new Date(doc.val())
    //         //       const currentDate = new Date()
    //         //       const timeDiff = currentDate - espDate
    //         //       const secondsBehind = Math.floor(timeDiff / 1000)
    //         //       device_state_esp = secondsBehind
    //         //     }
    //         //   });
    //         // });
    
    //         // onValue(iddevRef, (snap) => {
    //         //   snap.forEach((doc) => {
    //         //     if (doc.key === "last_seen") {
    //         //       dev_lseen = doc.val();
    //         //       const espDate = new Date(doc.val())
    //         //       const currentDate = new Date()
    //         //       const timeDiff = currentDate - espDate
    //         //       const secondsBehind = Math.floor(timeDiff / 1000)
    //         //       device_state = secondsBehind
    //         //     }
    
    //         //   });
    //         // });
    
    
    //         onValue(idvlRef, (snap) => {
    //           snap.forEach((doc) => {
    //             if (doc.key === "URL") {
    //               z = doc.val();
    //             }
    //             if (doc.key === "channel") {
    //               x = doc.val();
    //             }
    //             if (doc.key === "cust_id") {
    //               y = doc.val();
    //             }
    //           });
    //         });
    //         // let count1 = device_state_esp >= 720 ? 2 : device_state_esp >= 360 ? 1 : 0
    //         // let count2 = device_state >= 720 ? 2 : device_state >= 360 ? 1 : 0
    //         obj = { name: item.key, ad: z, cha: x, rest: y};
    //         // console.log(obj);
    //         newData.push(obj)
    //         // setData(newData);
    //         // setData(data.push(obj))
    //       });
    //       // setData([...data,obj])
    //     //   console.log(newData)
    //     });
    //     setData(newData)
    
    //     // console.log(data);
    //     // setData(arr);
    //   };

    const fetchData2 = ()=>{
        const db = getDatabase()
        console.log(data);
        let arr =[]
        data.map(item=>{
            const iddevRef = ref(db, "devices/" + item.name);
            const esptRef = ref(db, "esptime/" + item.name);
            const piRef = ref(db,"pi_name_cha/"+item.name)

            let esp_lseen,device_state_esp,dev_lseen,device_state
             onValue(esptRef, (snap) => {
              snap.forEach((doc) => {
                if (doc.key === "last_seen") {
                  esp_lseen = doc.val();
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
    
              });
            });

            let swi = true
            onValue(piRef,(snap)=>{
                snap.forEach(doc=>{
                    if(doc.key=="espctr")
                        swi = doc.val()
                })
            })
            let count1 = device_state_esp >= 720 ? 2 : device_state_esp >= 360 ? 1 : 0
            let count2 = device_state >= 720 ? 2 : device_state >= 360 ? 1 : 0
            // item = {...item,lastSeen:dev_lseen,espLastSeen:esp_lseen,esp_count:count1,dev_count:count2}
            const obj={name:item.name,cha:item.cha,ad:item.ad,lastSeen:dev_lseen,espLastSeen:esp_lseen,esp_count:count1,dev_count:count2,swi:swi}
            // item = obj
            // console.log(item);
            arr.push(obj)
        })
        setData(arr)
    }
    useEffect(()=>{
        // fetchData1()
        fetchData2()
    },[])

    const handleSwitch = (item)=>{
        
        const db = getDatabase()

        const piRef = ref(db,"pi_name_cha/"+item.name)

        update(piRef,{
            espctr:!item.swi
        })
    }
    return <div>
        <table>
          <tr>
            <th>Device</th>
            <th>Restaurant</th>
            <th>Channel</th>
            <th>Ad</th>
            <th>Lastseen-device</th>
            <th>Lastseen-esp</th>
            <th>Device State Esp</th>
            <th>Device State</th>
            <th>Switch</th>
          </tr>
          {data && data.filter(item => item.name === filter || item.ad === filter || item.cha === filter || item.rest === filter).map((item, index) => {
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

                <td className="table-cell">{item.lastSeen}</td>
                <td className="table-cell">{item.espLastSeen}</td>
                <td className={item.esp_count === 2 ? "table-cell-red" : item.esp_count === 1 ? "table-cell-yellow" : "table-cell-green"}></td>
                <td className={item.dev_count === 2 ? "table-cell-red" : item.dev_count === 1 ? "table-cell-yellow" : "table-cell-green"}></td>
                {/* <td className=></td> */}
                <td><button onChange={handleSwitch(item)}>{item.swi?"OFF":"ON"}</button></td>
              </tr>
            );
          })}
        </table>
    </div>
}

export default DeviceTable
