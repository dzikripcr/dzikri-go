import { useState } from "react";
import customersData from "../components/customer.json";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomersChart from "../components/CustomersChart";

export default function Customers() {
  const [customers] = useState(customersData);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Menggunakan font-serif untuk konsistensi judul */}
      <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight mb-8">
        Customers
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-gray-500 text-sm font-medium mb-3">
              Total Customers
            </p>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-gray-900 tracking-tight">
                11,040
              </span>
              {/* Tren menggunakan emerald-600 */}
              <span className="text-sm text-emerald-600 mb-1 font-semibold">
                ↑ 14.4%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-gray-500 text-sm font-medium mb-3">
              New Customers
            </p>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-gray-900 tracking-tight">
                2,370
              </span>
              <span className="text-sm text-emerald-600 mb-1 font-semibold">
                ↑ 20%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-gray-500 text-sm font-medium mb-3">Visitor</p>
            <div className="flex items-end space-x-2">
              <span className="text-3xl font-bold text-gray-900 tracking-tight">
                250k
              </span>
              <span className="text-sm text-emerald-600 mb-1 font-semibold">
                ↑ 20%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
          </div>
        </div>

        {/* Right Overview Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-gray-900 text-lg">
              Customer Overview
            </h3>
            <div className="flex space-x-2 bg-gray-50 p-1 rounded-full border border-gray-100">
              {/* Tombol filter waktu diubah menjadi gaya pill/rounded-full */}
              <button className="px-4 py-1.5 bg-white text-gray-900 rounded-full text-sm font-semibold shadow-sm border border-gray-200">
                This week
              </button>
              <button className="px-4 py-1.5 text-gray-500 rounded-full text-sm font-medium hover:text-gray-900 transition-colors">
                Last week
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="relative">
              <p className="text-2xl font-bold text-gray-900">25k</p>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Active Customers
              </p>
              {/* Garis indikator aktif menggunakan aksen coklat (amber-900) */}
              <div className="absolute -bottom-3 left-0 h-0.5 w-full bg-amber-900 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5.6k</p>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Repeat Customers
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">250k</p>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Shop Visitor
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5.5%</p>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Conversion Rate
              </p>
            </div>
          </div>

          {/* Area Chart */}
          <div className="flex-grow w-full min-h-[250px] mt-2">
            <CustomersChart />
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* Header tabel dibuat lebih minimalis (abu-abu terang) */}
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-5 font-semibold">No.</th>
                <th className="p-5 font-semibold">Customer Id</th>
                <th className="p-5 font-semibold">Name</th>
                <th className="p-5 font-semibold">Phone</th>
                <th className="p-5 font-semibold text-center">Order Count</th>
                <th className="p-5 font-semibold">Total Spend</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/80 text-sm transition-colors group"
                >
                  <td className="p-5 text-gray-500">{idx + 1}</td>
                  <td className="p-5 font-medium text-gray-500">
                    {customer.customerId}
                  </td>
                  <td className="p-5 font-semibold text-gray-900">
                    {customer.name}
                  </td>
                  <td className="p-5 text-gray-500">{customer.phone}</td>
                  <td className="p-5 text-gray-700 text-center font-medium">
                    {customer.orderCount}
                  </td>
                  <td className="p-5 text-gray-900 font-bold">
                    ${customer.totalSpend.toFixed(2)}
                  </td>
                  <td className="p-5">
                    <span className="flex items-center text-gray-700 font-medium">
                      {/* Dot status menggunakan warna yang lebih estetik dengan efek glow tipis */}
                      <span
                        className={`w-2 h-2 rounded-full mr-2.5 
                          ${
                            customer.status === "Active"
                              ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                              : customer.status === "VIP"
                                ? "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.4)]"
                                : "bg-rose-500 shadow-[0_0_6px_rgba(243,24,71,0.4)]"
                          }`}
                      ></span>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-5 flex space-x-2 text-gray-400">
                    {/* Icon edit & hapus memiliki efek hover dengan warna spesifik */}
                    <button
                      className="p-2 rounded-full hover:bg-amber-50 hover:text-amber-900 transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
