import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { UserAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
// import { vendorNames } from "../../Constants/VendorTableData";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { message, Popconfirm } from "antd";
import axios from "axios";
export function Vendors() {
  const [vendor, setVendor] = useState([]);
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
  // const handleDateChange = (e) => {
  //   const { value } = e.target;
  //   setItemData({
  //     ...ItemData,
  //     date: value,
  //   });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(ItemData);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...ItemData,
      [name]: value,
    });
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
          vendorName: "",
          contactNumber: "",
          state: "",
          city: "",
          gstNo: "",
          description: "",
        });
        // Make an HTTP POST request to your backend endpoint with all form data
        await axios.post(
          "http://localhost:8000/api/vendor_details/create",
          ItemData
        );
        alert("Location saved successfully");
        // Optionally, you can reset the form fields after successful submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving location. Please try again.");
    }
  };
  useEffect(() => {
    const apiUrl = "http://localhost:8000/api/vendor_details";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setVendor(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <section className="px-[2vw] py-[5vh] w-[100vw] ">
      <div className="bg-white rounded-[30px] w-auto h-auto shadow-xl py-[2vh] px-[4.4vw]">
        <div className="  bg-white rounded-xl flex justify-between">
          <div>
            <h1 className=" font-semibold text-[24px] text-[#2078E4] px-[2vw]">
              Vendors
            </h1>
            {/* <p className=" font-medium text-[18px] text-[#B5B7C0]">Names</p> */}
          </div>
          <div className="flex gap-5 justify-center items-center">
            <div className="py-3">
              <Input
                placeholder="Search here..."
                prefix={<SearchOutlined />}
                className="w-[15vw] h-[5vh]"
              />
            </div>
            <Button
              icon={<UserAddOutlined />}
              onClick={showModal}
              className="bg-[#E6F1FF] hover:bg-[#cde3ff]"
            >
              Add Vendor
            </Button>
            <Modal
              title="Add Vendor"
              open={isModalOpen}
              onOk={handleSubmit}
              onCancel={handleCancel}
            >
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="vendorName"
                    className="block mb-1 font-semibold"
                  >
                    Vendor Name:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="vendorName"
                    placeholder="Enter Vendor Name"
                    name="vendorName"
                    value={ItemData.vendorName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#E6F1FF]"
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
                    value={ItemData.contactNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#E6F1FF]"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block mb-1 font-semibold">
                    State:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="state"
                    placeholder="Enter State"
                    name="state"
                    value={ItemData.state}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#E6F1FF]"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block mb-1 font-semibold">
                    City:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter City"
                    name="city"
                    value={ItemData.city}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#E6F1FF]"
                  />
                </div>
                <div>
                  <label htmlFor="gstNo" className="block mb-1 font-semibold">
                    GST No:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="gstNO"
                    placeholder="Enter GST Number"
                    name="gstNo"
                    value={ItemData.gstNo}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#E6F1FF]"
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
                  className="border border-gray-300 rounded-md px-3 py-2 w-[80vw] bg-[#E6F1FF]"
                />
              </div>
            </Modal>
          </div>
        </div>
        <div className="">
          <table className=" w-full ">
            <tbody>
              <tr className="p-[10vh]">
                <th className="text-[#91B7E5] text-[20px] font-medium text-left p-[3vh]">
                  Names
                </th>
                <th className="text-[#91B7E5] text-[20px] font-medium text-left p-[3vh]">
                  Contact No
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              {vendor.map((vendor) => (
                <tr key={vendor.vendor_id}>
                  <td className="w-[30vw] p-3">{vendor.Vendor_name}</td>
                  <td>{vendor.Contact_no}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td className="px-[3vh]">
                    <Button
                      src="edit-icon.svg"
                      alt=""
                      onClick={showModal}
                      className="border-0"
                    >
                      <img src="edit-icon.svg" alt=""></img>
                    </Button>
                  </td>
                  <td>
                    <button>
                      {/* <img src="delete-icon.svg" alt="" /> */}
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this vendor?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                    </button>
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
