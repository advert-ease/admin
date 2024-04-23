import React, { useState } from "react";
import { preProvisionTable } from "../../Constants/PreProvisionTable";
import axios from "axios";

export function PreProvisionTable() {
  const [ItemData, setItemData] = useState({
    device_id: "",
    deviceName: "",
  });
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
        <div className="flex">
          <div className="mb-4">
            <label
              htmlFor="SelectItem"
              className="block  font-bold text-gray-700"
            >
              Select Item
            </label>
            <select
              name="selectItem"
              id="selectItem"
              placeholder="Item Name"
              className="mt-1 p-2 w-[24.9vw] border border-[#EA3232]  bg-[#FFF0F0] rounded-md focus:outline-none focus:ring-[#EA3232] focus:border-[#EA3232]"
            >
              <option value="">Select Item</option>
              <option value="">phone</option>
              <option value="">cable</option>
              <option value="">band</option>
              <option value="">electronics</option>
            </select>
          </div>
          <table>
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
                // <tr
                //   key={index}
                //   data-name={link.preProvisionTable}
                //   className="border border-solid border-l-0 border-r-0 px-[10vw]"
                // >
                //   <td className="w-[10vw] p-3">{link.device_id}</td>
                //   <td className="w-[10vw] p-3">{link.device_name}</td>
                // </tr>
              );
            })}

            {/* <div className="px-[13vw]">
              <div className="flex gap-4">
                <div className="mb-4 py-[]">
                  <label htmlFor="device_id" className="block mb-1 font-medium">
                    Device_id:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="device_id"
                    name="device_id"
                    value={ItemData.device_id}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
                  />
                </div>

                <div className="mb-4 py-[]">
                  <label
                    htmlFor="device_name"
                    className="block mb-1 font-medium"
                  >
                    Device_name:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="device_name"
                    name="device_name"
                    value={ItemData.device_name}
                    className="border border-gray-300 rounded-md px-3 py-2 w-[15vw] bg-[#F4F1FF]"
                  />
                </div>
              </div>
            </div> */}
          </table>
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
