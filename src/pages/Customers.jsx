import { useState } from "react";
import customersData from "../components/customer.json"; 
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomersChart from "../components/SalesChart"; // Pastikan path import ini benar

export default function Customers() {
  const [customers] = useState(customersData);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Stats */}
        <div className="space-y-6">
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-800 font-bold mb-2 text-lg">Total Customers</p>
              <div className="flex items-end space-x-2">
                 <span className="text-3xl font-extrabold text-gray-800">11,040</span>
                 <span className="text-sm text-green-500 mb-1">↑ 14.4%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
           </div>
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-800 font-bold mb-2 text-lg">New Customers</p>
              <div className="flex items-end space-x-2">
                 <span className="text-3xl font-extrabold text-gray-800">2,370</span>
                 <span className="text-sm text-green-500 mb-1">↑ 20%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
           </div>
           {/* Menambahkan stat Visitor sesuai gambar referensi */}
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-800 font-bold mb-2 text-lg">Visitor</p>
              <div className="flex items-end space-x-2">
                 <span className="text-3xl font-extrabold text-gray-800">250k</span>
                 <span className="text-sm text-green-500 mb-1">↑ 20%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
           </div>
        </div>

        {/* Right Overview Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 text-lg">Customer Overview</h3>
              <div className="flex space-x-2">
                 <button className="px-3 py-1 bg-green-50 text-green-600 rounded-md text-sm font-semibold">This week</button>
                 <button className="px-3 py-1 text-gray-500 rounded-md text-sm hover:bg-gray-50">Last week</button>
              </div>
           </div>
           
           <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                 <p className="text-2xl font-bold text-gray-800">25k</p>
                 <p className="text-xs text-gray-400 font-medium">Active Customers</p>
                 <div className="h-0.5 w-full bg-green-500 mt-2"></div> {/* Garis hijau di bawah teks Active Customers */}
              </div>
              <div>
                 <p className="text-2xl font-bold text-gray-800">5.6k</p>
                 <p className="text-xs text-gray-400 font-medium">Repeat Customers</p>
              </div>
              <div>
                 <p className="text-2xl font-bold text-gray-800">250k</p>
                 <p className="text-xs text-gray-400 font-medium">Shop Visitor</p>
              </div>
              <div>
                 <p className="text-2xl font-bold text-gray-800">5.5%</p>
                 <p className="text-xs text-gray-400 font-medium">Conversion Rate</p>
              </div>
           </div>

           {/* Area Chart yang di-render */}
           <div className="flex-grow w-full min-h-[250px]">
               <CustomersChart />
           </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-50 text-gray-700 text-sm">
              <th className="p-4 font-semibold">Customer Id</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Phone</th>
              <th className="p-4 font-semibold text-center">Order Count</th>
              <th className="p-4 font-semibold">Total Spend</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 text-sm transition-colors">
                <td className="p-4 font-medium text-gray-800">{customer.customerId}</td>
                <td className="p-4 text-gray-700">{customer.name}</td>
                <td className="p-4 text-gray-500">{customer.phone}</td>
                <td className="p-4 text-gray-700 text-center">{customer.orderCount}</td>
                <td className="p-4 text-gray-800 font-medium">${customer.totalSpend.toFixed(2)}</td>
                <td className="p-4">
                   <span className="flex items-center text-gray-700 font-medium">
                      <span className={`w-2 h-2 rounded-full mr-2 
                        ${customer.status === "Active" ? "bg-green-500" : customer.status === "VIP" ? "bg-yellow-500" : "bg-red-500"}`}>
                      </span>
                      {customer.status}
                   </span>
                </td>
                <td className="p-4 flex space-x-3 text-gray-400">
                   <button className="hover:text-blue-500 transition-colors"><FaEdit /></button>
                   <button className="hover:text-red-500 transition-colors"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}