import React, { useState } from "react";
import { preProvisionTable } from "../../Constants/PreProvisionTable";
import axios from "axios";

export function PreProvisionTable() {
  const [ItemData, setItemData] = useState({
    device_id: "",
    deviceName: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelectChange = (e) => {
    setSelectedItem(preProvTable.find((item) => item.id === e.target.value));
  };
  const preProvTable = [
    { id: "1", name: "Box", qty: 50, code: "#3452POQ" },
    { id: "2", name: "TV", qty: 20, code: "#3452ABC" },
    { id: "3", name: "Phone", qty: 10, code: "#8920HIJK" },
    { id: "4", name: "Tab", qty: 70, code: "#3452EFG" },
  ];
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
          contactNumber: "",
          pinCode: "",
          contactName: "",
          locationAddress: "",
        });
        // Make an HTTP POST request to your backend endpoint with all form data
        await axios.post(
          "http://localhost:8000/api/pre_provision_create",
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
  function RenderBasedOnQuantity({ qty, name }) {
    return (
      <div>
        <h3 className="mb-[1vh]">
          <span className="font-extrabold">Total Inventory :</span>
          {` ${qty} ${name}`}
        </h3>
        <h3 className="mb-[1vh]">
          <span className="font-extrabold">Pre Provisioned :</span>
          {` ${qty} ${name}`}
        </h3>

        {[...Array(qty)].map((_, index) => (
          <div className="flex mb-[5vh] gap-[2vw]">
            <div className="flex">
              <div className="flex justify-center items-center">
                {index + 1}
              </div>
              <input
                name={`item${index + 1}_device_id`}
                className="border border-[#EA3232] rounded-md px-3 py-2 w-[15vw] bg-[#FFF0F0] ml-[1vw]"
                key={index}
                type="text"
                placeholder={`Item ${index + 1} Device ID`}
              />
              <label
                htmlFor={`item${index + 1}_device_id`}
                className="mt-[-10px] font-medium ml-[0.5vw]"
              >
                <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="flex">
              <input
                className="border border-[#EA3232] rounded-md px-3 py-2 w-[15vw] bg-[#FFF0F0] "
                key={index}
                type="text"
                placeholder={`Item ${index + 1} Device Name`}
              />
              <label
                htmlFor={`item${index + 1}_device_id`}
                className="mt-[-10px] font-medium ml-[0.5vw]"
              >
                <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    );
  }
  function RenderBasedSelect({ qty, name }) {
    return (
      <div>
        <h3 className="mb-[1vh]">
          <span className="font-extrabold">Total Inventory :</span>
          {` ${qty} ${name}`}
        </h3>
        <h3 className="mb-[1vh]">
          <span className="font-extrabold">Pre Provisioned :</span>
          {` ${qty} ${name}`}
        </h3>
      </div>
    );
  }
  return (
    <section className="px-[2vw] py-[5vh] w-[100vw] ">
      <div className="bg-white rounded-[30px] w-auto h-auto shadow-xl py-[2vh] px-[4.4vw]">
        <div>
          <h1 className="font-semibold text-[#EA3232] text-[24px] px-[2vw]">
            Pre Provision Table
          </h1>
          <p className="font-medium text-[18px] text-[#B5B7C0] py-[2.4vh] px-[2vw]">
            Please fill In the details below
          </p>
        </div>
        <div className="flex justify-between px-[2vw]">
          <div className="mb-4">
            <label
              htmlFor="items"
              className="block  font-extrabold  text-gray-700"
            >
              Select Item :
            </label>
            <select
              id="items"
              onChange={handleSelectChange}
              name="items"
              placeholder="Item Name"
              className="mt-1 p-2 w-[24.9vw] border border-[#EA3232]  bg-[#FFF0F0] rounded-md focus:outline-none focus:ring-[#EA3232] focus:border-[#EA3232]"
            >
              {preProvTable.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.code}- {item.name}
                </option>
              ))}
            </select>
            {selectedItem && (
              <RenderBasedSelect
                qty={selectedItem.qty}
                name={selectedItem.name}
              />
            )}
          </div>
          {selectedItem && (
            <RenderBasedOnQuantity
              qty={selectedItem.qty}
              name={selectedItem.name}
            />
          )}
          {/* <table>
            {preProvisionTable.map((link, index) => {
              return (
                <div className="px-[13vw]">
                  <div className="flex gap-4">
                    <div>{link.id}</div>
                    <div className="mb-4 py-[]">
                      <label
                        htmlFor="device_id"
                        className="block mb-1 font-medium"
                      >
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="device_id"
                        name="device_id"
                        placeholder="Enter Device id"
                        value={ItemData.device_id}
                        className="border border-[#EA3232] rounded-md px-3 py-2 w-[15vw] bg-[#FFF0F0]"
                      />
                    </div>

                    <div className="mb-4 py-[]">
                      <label
                        htmlFor="device_name"
                        className="block mb-1 font-medium"
                      >
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="device_name"
                        name="device_name"
                        placeholder="Enter Device Name"
                        value={ItemData.device_name}
                        className="border border-[#EA3232] rounded-md px-3 py-2 w-[15vw] bg-[#FFF0F0]"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </table> */}
        </div>
        <div className="mb-4 px-[52vw] py-[2vh]">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#16C098] text-white px-4 py-2 rounded-[4px] hover:bg-[#13ac88]"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
