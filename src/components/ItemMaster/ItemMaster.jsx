import TextArea from "antd/es/input/TextArea";

import { Tooltip } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
// import { FolderAddOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";

export function ItemMaster() {
  const [ItemData, setItemData] = useState({
    itemCode: "",
    itemName: "",
    sku: "",
    unit: "",
    quantity: "",
    purchaseRate: "",
    purchaseVendor: "",
    purchaseDate: "",
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
  const [showCalendar, setShowCalendar] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...ItemData,
      [name]: value,
    });
  };
  // const handleCalendarClick = () => {
  //   setShowCalendar(!showCalendar);
  // };
  const handleDateChange = (e) => {
    const { value } = e.target;
    setItemData({
      ...ItemData,
      date: value,
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(ItemData);
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Display confirmation dialog to the user
      const isConfirmed = window.confirm("Are you sure you want to save this?");
      if (isConfirmed) {
        setItemData({
          itemCode: "",
          itemName: "",
          sku: "",
          unit: "",
          quantity: "",
          purchaseRate: "",
          purchaseVendor: "",
          purchaseDate: "",
          description: "",
        });
        // Make an HTTP POST request to your backend endpoint with all form data
        await axios.post(
          "http://localhost:8000/api/item_master/create",
          ItemData
        );
        alert(" Saved successfully");
        // Optionally, you can reset the form fields after successful submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving . Please try again.");
    }
  };
  const handleSubmitVendor = async (event) => {
    event.preventDefault();
    try {
      // Display confirmation dialog to the user
      const isConfirmed = window.confirm(
        "Are you sure you want to save this ?"
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
        alert("Saved successfully");
        // Optionally, you can reset the form fields after successful submission
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving . Please try again.");
    }
  };

  return (
    <section className="px-[2vw] py-[4vh] w-[100vw]">
      <div className="  w-full pr-[35vw] bg-white rounded-[30px] px-[4.4vw] py-[3vh] shadow-md  ">
        <div>
          <h1 className=" font-semibold text-[24px] text-[#5932EA] py-[1.7vh]">
            Item Master
          </h1>
          <p className=" font-medium text-[18px] text-[#B5B7C0] py-[1.9vh]">
            Please fill in the details below
          </p>
        </div>

        <div className="  grid grid-cols-3 py-[1.5vh]">
          <div className="mb-4 py-[]">
            <label htmlFor="itemCode" className="block mb-1 font-semibold">
              Item Code:
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="itemCode"
              name="itemCode"
              value={ItemData.itemCode}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
            />
          </div>
          <div className="mb-4 py-[]">
            <label htmlFor="itemName" className="block mb-1 font-semibold">
              Item Name:
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={ItemData.itemName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
            />
          </div>
          {/* <Tooltip title="Add item">
              <Button
                shape="circle"
                icon={<FolderAddOutlined />}
                className="bg-[#F4F1FF] mt-[10px] px-10"
              ></Button>
            </Tooltip> */}

          <div className="mb-4 ">
            <label htmlFor="SKU" className="block mb-1 font-semibold">
              SKU:
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="sku"
              placeholder="Enter SKU"
              name="sku"
              value={ItemData.sku}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
            />
          </div>

          <div className="mb-4 ">
            <label htmlFor="quantity" className="block mb-1 font-semibold">
              Quantity:
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="quantity"
              placeholder="Enter the Quantity"
              name="quantity"
              value={ItemData.quantity}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
            />
          </div>

          <div className="mb-4 ">
            <label htmlFor="Unit" className="block mb-1 font-semibold">
              Unit:
              <span className="text-red-500">*</span>
            </label>
            <select
              id="unit"
              name="unit"
              value={ItemData.unit}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
            >
              <option value="">Choose Unit</option>
              <option value="">Unit 1</option>
              <option value="">Unit 2</option>
              <option value="">Unit 3</option>
            </select>
          </div>

          <div className="mb-4 ">
            <label htmlFor="purchaseRate" className="block mb-1 font-semibold">
              Purchase Rate:
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="purchaseRate"
              placeholder="Enter the Rate"
              name="purchaseRate"
              value={ItemData.purchaseRate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
            />
          </div>
          <div className=" flex items-center gap-[5px]">
            <div className="mb-4 ">
              <label
                htmlFor="purchaseVendor"
                className="block mb-1 font-semibold"
              >
                Purchase Vendor:
                <span className="text-red-500">*</span>
              </label>
              <select
                id="purchaseVendor"
                name="purchaseVendor"
                value={ItemData.purchaseVendor}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
              >
                <option value="">Choose Vendor</option>
                <option value="">Vendor 1</option>
                <option value="">Vendor 2</option>
                <option value="">Vendor 3</option>
              </select>
            </div>
            <Tooltip title="Add vendor">
              <>
                <Button
                  shape="circle"
                  icon={<UserAddOutlined />}
                  className="bg-[#F4F1FF] mt-[15px] "
                  onClick={showModal}
                ></Button>
                <Modal
                  title="Add Vendor"
                  open={isModalOpen}
                  onOk={handleSubmitVendor}
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
                        className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
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
                        className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block mb-1 font-semibold"
                      >
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
                        className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block mb-1 font-semibold"
                      >
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
                        className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gstNo"
                        className="block mb-1 font-semibold"
                      >
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
                        className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
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
                      className="border border-gray-300 rounded-md px-3 py-2 w-[80vw] bg-[#F4F1FF]"
                    />
                  </div>
                </Modal>
              </>
            </Tooltip>
          </div>
          <div className="mb-4 ">
            <label htmlFor="purchaseDate" className="block mb-1 font-semibold">
              {" "}
              Purchase Date:
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={ItemData.purchaseDate}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
              />
            </div>
          </div>
        </div>
        <div className="mb-4 w-full py-[1.5vh]">
          <label htmlFor="description" className="block mb-1 font-semibold">
            Description:
            <span className="text-red-500">*</span>
          </label>
          <TextArea
            id="description"
            placeholder="Enter your Description"
            name="description"
            value={ItemData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-[80vw] bg-[#F4F1FF]"
          />
        </div>
        <div>
          <div className="mb-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#16C098] text-white px-4 py-2 rounded-[4px] hover:bg-[#13ac88]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
