import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SearchOutlined } from "@ant-design/icons";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { vendorNames } from "../../Constants/VendorTableData";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { message, Popconfirm } from "antd";
import axios from "axios";
export function LocationMaster() {
  const [location, setLocations] = useState([]);
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
    contactNo: "",
    contactName: "",

    pincode: "",
    locGstNo: "",
    locationAddress: "",
    locationType: "",
    locationEmailId: "",
  });

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
  const [updateLoc, setUpdateLoc] = useState({
    locationName: "",
    contactNo: "",
    pincode: "",
    locationId: "",
    contactName: "",
    locationAddress: "",
    locGstNo: "",
    locationType: "",
    locationEmailId: "",
  });
  const [isModalOpenn, setIsModalOpenn] = useState(false);
  const showModalUpdate = (location) => {
    console.log(location);
    setItemData({
      locationName: location.locationName,
      contactNo: location.contactNo,
      pincode: location.pincode,

      contactName: location.contactName,
      locationAddress: location.locationAddress,
      locGstNo: location.locGstNo,
      locationType: location.locationType,
      locationEmailId: location.locationEmailId,
    });
    setUpdateLoc({
      locationName: location.locationName,
      contactNo: location.contactNo,
      pincode: location.pincode,
      locationId: location.locationId,
      contactName: location.contactName,
      locationAddress: location.locationAddress,
      locGstNo: location.locGstNo,
      locationType: location.locationType,
      locationEmailId: location.locationEmailId,
    });
    setIsModalOpenn(true);
  };
  const handleOkk = () => {
    setIsModalOpenn(false);
  };
  const handleCancell = () => {
    setIsModalOpenn(false);
  };
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
  const handleChangeNum = (e) => {
    const { name, value } = e.target;
    // Validate input to accept only numerical characters
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(value)) {
      setItemData({
        ...ItemData,
        [name]: value,
      });
    }
  };
  const handleChangeAlp = (e) => {
    const { name, value } = e.target;
    // Validate input to accept only alphabetical characters
    const alphabeticRegex = /^[a-zA-Z\s]*$/;
    if (alphabeticRegex.test(value)) {
      setItemData({
        ...ItemData,
        [name]: value,
      });
    }
  };

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
          contactNo: "",
          contactName: "",
          pincode: "",
          locGstNo: "",
          locationAddress: "",
          locationType: "",
          locationEmailId: "",
        });
        // Make an HTTP POST request to your backend endpoint with all form data
        await axios.post("http://localhost:8000/api/location/create", ItemData);
        alert("Location saved successfully");
        fetchLocationData();
        handleCancel();
        // Optionally, you can reset the form fields after successful submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving location. Please try again.");
      handleCancel();
    }
  };
  // const [data, setData] = useState(null);
  const fetchLocationData = () => {
    const apiUrl = "http://localhost:8000/api/location_details";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setLocations(data); // Assuming data is an array of location objects
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    fetchLocationData();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering function to match vendor names with the search query
  const filteredLocationNames = location.filter((location) =>
    location.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [error, setError] = useState(null);
  const handlePutRequest = (location) => {
    console.log(location);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ItemData),
    };

    fetch(
      `http://localhost:8000/api/location_details/${location.locationId}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update local state with updated data
        setItemData(data);
        fetchLocationData();
        handleCancell();
      })
      .catch((error) => {
        setError(error);
        handleCancell();
      });
  };
  return (
    <section className="px-[2vw] py-[5vh] w-[100vw] ">
      <div className="bg-white rounded-[30px] w-auto h-auto shadow-xl py-[2vh] px-[4.4vw] overflow-auto">
        <div className="  bg-white rounded-xl flex justify-between">
          <div>
            <h1 className=" font-semibold text-[24px] text-[#DE7E0E] px-[2vw]">
              Location Master
            </h1>
            {/* <p className=" font-medium text-[18px] text-[#B5B7C0]">Names</p> */}
          </div>
          <div className="flex gap-5 justify-center items-center">
            <div className="py-3">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search here..."
                prefix={<SearchOutlined />}
                className="w-[15vw] h-[5vh] border border-[#DE7E0E]"
              />
            </div>
            <Button
              icon={<UserAddOutlined />}
              onClick={showModal}
              className="bg-[#FFEBD3] hover:bg-[#FFEBD3]"
            >
              Add Location Details
            </Button>
            <Modal
              title="Add Location Details"
              open={isModalOpen}
              onOk={handleSubmit}
              onCancel={handleCancel}
            >
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="locationDetails"
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
                    // value={ItemData.locationName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNo"
                    className="block mb-1 font-semibold"
                  >
                    Contact Number:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactNo"
                    placeholder="Enter Contact Number"
                    name="contactNo"
                    // value={ItemData.contactNo}
                    onChange={handleChangeNum}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block mb-1 font-semibold">
                    Pincode:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    placeholder="Enter Pincode"
                    name="pincode"
                    // value={ItemData.pincode}
                    onChange={handleChangeNum}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                  />
                </div>
                {/* <div>
                  <label
                    htmlFor="contactName"
                    className="block mb-1 font-semibold"
                  >
                    Contact Name:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    placeholder="Enter Contact Name"
                    name="contactName"
                    value={ItemData.contactName}
                    onChange={handleChangeAlp}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                  />
                </div> */}
                <div>
                  <label
                    htmlFor="locGstNo"
                    className="block mb-1 font-semibold"
                  >
                    Location GST No:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="locGstNo"
                    placeholder="Enter Location No"
                    name="locGstNo"
                    // value={ItemData.locGstNo}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="loactionType"
                    className="block mb-1 font-semibold"
                  >
                    Location Type:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="locationType"
                    placeholder="Enter Location Type"
                    name="locationType"
                    // value={ItemData.locationType}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="locationEmailId"
                    className="block mb-1 font-semibold"
                  >
                    Location Email Id:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="locationEmailId"
                    placeholder="Enter Location Email Id"
                    name="locationEmailId"
                    // value={ItemData.locationEmailId}
                    onChange={handleChangeAlp}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                  />
                </div>
              </div>
              <div className=" py-4">
                <label
                  htmlFor="locationAddress"
                  className="block mb-1 font-semibold"
                >
                  Location Address:
                  <span className="text-red-500">*</span>
                </label>
                <TextArea
                  id="locationAddress"
                  placeholder="Enter Location Address"
                  name="locationAddress"
                  // value={ItemData.locationAddress}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-[80vw] bg-[#FFEBD3]"
                />
              </div>
            </Modal>
          </div>
        </div>
        <div className="">
          <table className=" w-full ">
            <tbody>
              <tr className="">
                <th className="text-[#F8C283] text-[20px] font-medium text-left p-[2vh] ">
                  Location Name
                </th>
                <th className="text-[#F8C283] text-[20px] font-medium text-left">
                  Contact Number
                </th>
                <th className="text-[#F8C283] text-[20px] font-medium text-left">
                  Pincode
                </th>

                <th className="text-[#F8C283] text-[20px] font-medium text-left">
                  Location address
                </th>
                <th className="text-[#F8C283] text-[20px] font-medium text-left">
                  Status
                </th>
              </tr>

              {filteredLocationNames.map((location) => (
                <tr key={location.location_id}>
                  {/* {vendorNames.map((link, index) => {
                return (
                  <tr
                    key={index}
                    data-name={link.vendorName}
                    className="border border-solid border-l-0 border-r-0 px-[10vw]"
                  > */}
                  <td className="w-[10vw] p-3">{location.locationName}</td>
                  <td>{location.contactNo}</td>
                  <td>{location.pincode}</td>
                  <td>{location.locationAddress}</td>
                  <td>{location.status ? "Active" : "Inactive"}</td>
                  <td></td>
                  {/* <td>{location.Contact_no}</td>
                  <td>{location.Pincode}</td>
                  <td>{location.Location_address}</td>
                  <td>{location.status}</td>
                  <td></td> */}

                  <td className="px-[3vh]">
                    <button onClick={() => showModalUpdate(location)}>
                      <img
                        src="edit-icon.svg"
                        alt=""

                        // className="w-[1.5vw] h-[1.5vh]"
                      />
                    </button>
                    <Modal
                      title="Edit Location Details"
                      open={isModalOpenn}
                      onOk={() => handlePutRequest(updateLoc)}
                      onCancel={handleCancell}
                    >
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="locationDetails"
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
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="contactNumber"
                            className="block mb-1 font-semibold"
                          >
                            Contact Number:
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="contactNumber"
                            placeholder="Enter Contact Number"
                            name="contactNumber"
                            value={ItemData.contactNo}
                            onChange={handleChangeNum}
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="pincode"
                            className="block mb-1 font-semibold"
                          >
                            Pincode:
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="pincode"
                            placeholder="Enter Pincode"
                            name="pincode"
                            value={ItemData.pincode}
                            onChange={handleChangeNum}
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="locGstNo"
                            className="block mb-1 font-semibold"
                          >
                            Location GST No:
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="locGstNo"
                            placeholder="Enter Location No"
                            name="locGstNo"
                            value={ItemData.locGstNo}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="loactionType"
                            className="block mb-1 font-semibold"
                          >
                            Location Type:
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="locationType"
                            placeholder="Enter Location Type"
                            name="locationType"
                            value={ItemData.locationType}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="locationEmailId"
                            className="block mb-1 font-semibold"
                          >
                            Location Email Id:
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="locationEmailId"
                            placeholder="Enter Location Email Id"
                            name="locationEmailId"
                            value={ItemData.locationEmailId}
                            onChange={handleChangeAlp}
                            className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#FFEBD3]"
                          />
                        </div>
                      </div>

                      <div className=" py-4">
                        <label
                          htmlFor="locationAddress"
                          className="block mb-1 font-semibold"
                        >
                          Location Address:
                          <span className="text-red-500">*</span>
                        </label>
                        <TextArea
                          id="locationAddress"
                          placeholder="Enter Location Address"
                          name="locationAddress"
                          value={ItemData.locationAddress}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-md px-3 py-2 w-[80vw] bg-[#FFEBD3]"
                        />
                      </div>
                    </Modal>
                  </td>

                  <td>
                    {/* <img src="delete-icon.svg" alt="" /> */}
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this location?"
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
              {/* <tr>
                <td></td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
