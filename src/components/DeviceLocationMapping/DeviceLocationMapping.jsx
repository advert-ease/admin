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
import axios from "axios";
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
    locationName: "",
    deviceName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate input to accept only alphanumeric characters
    const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
    if (alphanumericRegex.test(value)) {
      setItemData({
        ...ItemData,
        [name]: value,
      });
    }
  };
  // const handleChangeNum = (e) => {
  //   const { name, value } = e.target;
  //   // Validate input to accept only numerical characters
  //   const numericRegex = /^[0-9]*$/;
  //   if (numericRegex.test(value)) {
  //     setItemData({
  //       ...ItemData,
  //       [name]: value,
  //     });
  //   }
  // };
  // const handleChangeAlp = (e) => {
  //   const { name, value } = e.target;
  //   // Validate input to accept only alphabetical characters
  //   const alphabeticRegex = /^[a-zA-Z\s]*$/;
  //   if (alphabeticRegex.test(value)) {
  //     setItemData({
  //       ...ItemData,
  //       [name]: value,
  //     });
  //   }
  // };
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Display confirmation dialog to the user
      const isConfirmed = window.confirm(
        "Are you sure you want to save this location?"
      );
      if (isConfirmed) {
        setItemData({
          locationName: "",
          deviceName: "",
        });
        // Make an HTTP POST request to your backend endpoint with all form data
        await axios.post(
          "http://localhost:8000/api/devicelocation_create",
          ItemData
        );
        alert("Location saved successfully");
        // Optionally, you can reset the form fields after successful submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving location. Please try again.");
    }
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
                onOk={handleSubmit}
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
                      <option value="l_1"> 1</option>
                      <option value="l_2"> 2</option>
                      <option value="l_3"> 3</option>
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
                      <option value="d_1"> 1</option>
                      <option value="d_2"> 2</option>
                      <option value="d_3"> 3</option>
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
  };
}
