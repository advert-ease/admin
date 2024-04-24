// import { Input } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

import { Modal } from "antd";
// import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { message, Popconfirm } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
export function DeviceLocationMapping() {
  const [deviceloc, setDeviceloc] = useState([]);
  const confirm = (e) => {
    console.log(e);
    message.success("Deleted");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Canceled");
  };

  const [ItemData, setItemData] = useState({
    vendorName: "",
    contactNumber: "",
    state: "",
    city: "",
    gstNo: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...ItemData,
      [name]: value,
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const apiUrl = "http://localhost:8000/api/devicelocation";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setDeviceloc(data); // Assuming data is an array of location objects
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section className="px-[2vw] py-[5vh] w-[100vw] ">
      <div className="bg-white rounded-[30px] w-auto h-auto shadow-xl py-[2vh] px-[4.4vw]">
        <div className="  bg-white rounded-xl flex justify-between">
          <div className="flex gap-[45vw]">
            <h1 className=" font-semibold text-[24px] text-[#A31436] px-[2vw]">
              Device Location Mapping
            </h1>
            <Button
              icon={<UserAddOutlined />}
              onClick={showModal}
              className="bg-[#f1557a] hover:bg-[]"
            >
              Add Location Details
            </Button>
            <Modal
              title="Add Details"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="mb-4 ">
                  <label
                    htmlFor="locationName"
                    className="block mb-1 font-semibold"
                  >
                    Location Name:
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="locationName"
                    name="locationName"
                    value={ItemData.locationName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#f1557a]"
                  >
                    <option value="">Choose Location</option>
                    <option value=""> 1</option>
                    <option value=""> 2</option>
                    <option value=""> 3</option>
                  </select>
                </div>

                <div className="mb-4 ">
                  <label
                    htmlFor="deviceName"
                    className="block mb-1 font-semibold"
                  >
                    Device Name:
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="deviceName"
                    name="deviceName"
                    value={ItemData.deviceName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#f1557a]"
                  >
                    <option value="">Choose device</option>
                    <option value=""> 1</option>
                    <option value=""> 2</option>
                    <option value=""> 3</option>
                  </select>
                </div>
              </div>
            </Modal>
            {/* <p className=" font-medium text-[18px] text-[#B5B7C0]">Names</p> */}
          </div>
          <div className="flex gap-5 justify-center items-center"></div>
        </div>
        <div className="">
          <table className=" w-full ">
            <tbody>
              <tr className="py-[2.8vh]">
                <th className="text-[#A31436] text-[20px] font-medium text-left p-[3vh]">
                  Device id
                </th>
                <th className="text-[#A31436] text-[20px] font-medium text-left p-[3vh]">
                  Location id
                </th>
                <th className="text-[#A31436] text-[20px] font-medium text-left p-[3vh]">
                  Status
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              {deviceloc.map((deviceloc) => (
                <tr key={deviceloc.location_id}>
                  <td className="w-[10vw] p-3">{deviceloc.Location_id}</td>
                  <td>{deviceloc.device_id}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td className="px-[3vh]">
                    <button>
                      <img
                        src="edit-icon.svg"
                        alt=""
                        // className="w-[1.5vw] h-[1.5vh]"
                        onClick={showModal}
                      />
                    </button>
                    <Modal
                      title="Edit Location"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="deviceName"
                            className="block mb-1 font-semibold"
                          >
                            Device Name:
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="deviceName"
                            placeholder="Enter Device Name"
                            name="deviceName"
                            value={ItemData.deviceName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="locationName"
                            className="block mb-1 font-semibold"
                          >
                            Location Name:
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="locationName"
                            placeholder="Enter Location Name"
                            name="locationName"
                            value={ItemData.locationName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
                          />
                        </div>
                      </div>
                    </Modal>
                  </td>
                  <td>
                    {/* <img src="delete-icon.svg" alt="" /> */}
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this device and location?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}

              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
