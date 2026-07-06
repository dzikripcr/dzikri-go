import { useState } from "react";
import customersData from "../data/customer.json";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomersChart from "../components/CustomersChart";
import Card from "../components/Card";
import Table from "../components/Table";
import Button from "../components/Button";
import CustomerDetail from "../pages/CustomerDetail";

export default function Customers() {
  const [customers] = useState(customersData);

  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Customer Stats */}
        <div className="space-y-6">
          {/* Total Customers */}
          <Card>
            <p className="text-gray-800 font-bold mb-2 text-lg">
              Total Customers
            </p>

            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-gray-800">
                11,040
              </span>

              <span className="text-sm text-green-500 mb-1">↑ 14.4%</span>
            </div>

            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </Card>

          {/* New Customers */}
          <Card>
            <p className="text-gray-800 font-bold mb-2 text-lg">
              New Customers
            </p>

            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-gray-800">
                2,370
              </span>

              <span className="text-sm text-green-500 mb-1">↑ 20%</span>
            </div>

            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </Card>

          {/* Visitor */}
          <Card>
            <p className="text-gray-800 font-bold mb-2 text-lg">Visitor</p>

            <div className="flex items-end space-x-2">
              <span className="text-3xl font-extrabold text-gray-800">
                250k
              </span>

              <span className="text-sm text-green-500 mb-1">↑ 20%</span>
            </div>

            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </Card>
        </div>

        {/* Right Overview Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-lg">
              Customer Overview
            </h3>
            <div className="inline-flex items-center bg-[#EAF8E7] gap-1 p-1 rounded-lg">
              <button
                onClick={() => setSelectedPeriod("thisWeek")}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  selectedPeriod === "thisWeek"
                    ? "bg-white text-[#4EA674] shadow-sm font-medium"
                    : "text-gray-600"
                }`}
              >
                This week
              </button>

              <button
                onClick={() => setSelectedPeriod("lastWeek")}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  selectedPeriod === "lastWeek"
                    ? "bg-white text-[#4EA674] shadow-sm font-medium"
                    : "text-gray-600"
                }`}
              >
                Last week
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-2xl font-bold text-gray-800">25k</p>
              <p className="text-xs text-gray-400 font-medium">
                Active Customers
              </p>
              <div className="h-0.5 w-full bg-green-500 mt-2"></div>{" "}
              {/* Garis hijau di bawah teks Active Customers */}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">5.6k</p>
              <p className="text-xs text-gray-400 font-medium">
                Repeat Customers
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">250k</p>
              <p className="text-xs text-gray-400 font-medium">Shop Visitor</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">5.5%</p>
              <p className="text-xs text-gray-400 font-medium">
                Conversion Rate
              </p>
            </div>
          </div>

          {/* Area Chart yang di-render */}
          <div className="w-full h-[280px]">
            <CustomersChart />
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div
        className={`grid gap-6 ${
          selectedCustomer ? "grid-cols-1 lg:grid-cols-4" : "grid-cols-1"
        }`}
      >
        <div
          className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
            selectedCustomer ? "lg:col-span-3" : "w-full"
          }`}
        >
          <Table
            headers={[
              "Customer ID",
              "Name",
              "Phone",
              "Order Count",
              "Total Spend",
              "Status",
              "Action",
            ]}
          >
            {customers.map((customer, index) => (
              <tr
                key={index}
                onClick={() => setSelectedCustomer(customer)}
                className={`
                  cursor-pointer
                  border-b
                  border-[#EAF8E7]
                  hover:bg-[#F7FCF5]
                  transition-all
                  ${selectedCustomer?.customerId === customer.customerId ? "bg-[#F7FCF5]" : ""}
                `}
              >

                <td className="p-4 text-gray-500 font-medium">{customer.customerId}</td>

                <td className="p-4 text-gray-700">{customer.name}</td>

                <td className="p-4 text-gray-500">{customer.phone}</td>

                <td className="p-4 text-center">{customer.orderCount}</td>

                <td className="p-4 font-medium text-gray-800">
                  ${customer.totalSpend.toFixed(2)}
                </td>

                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium 
                      ${customer.status === "Active" ? " text-[#4EA674]" : 
                        customer.status === "Inactive" ? "text-red-500" : 
                        customer.status === "VIP" ? "text-yellow-600" : 
                        "bg-gray-100 text-gray-600"}`
                    }
                  >
                    {/* Indikator Titik (Dot) */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full 
                        ${customer.status === "Active" ? "bg-[#4EA674]" : 
                          customer.status === "Inactive" ? "bg-red-500" : 
                          customer.status === "VIP" ? "bg-yellow-500" : 
                          "bg-gray-500"}`
                      }
                    ></span>
                    {customer.status}
                  </span>
                </td>
                <td className="p-4 flex space-x-3 text-gray-400">
                  <Button type="edit">
                    <FaEdit />
                  </Button>
                  <Button type="hapus">
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
        {selectedCustomer && (
          <div className="lg:col-span-1">
            <CustomerDetail
              customer={selectedCustomer}
              onClose={() => setSelectedCustomer(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
