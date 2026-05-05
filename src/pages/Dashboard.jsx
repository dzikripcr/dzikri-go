import { Link } from "react-router-dom";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  const products = [
    {
      id: "#FXZ-4567",
      name: "Apple iPhone 13",
      price: 999.00,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
    },
    {
      id: "#FXZ-4567",
      name: "Nike Air Jordan",
      price: 72.40,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    },
    {
      id: "#FXZ-4567",
      name: "T-shirt",
      price: 35.40,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    },
    {
      id: "#FXZ-4567",
      name: "Assorted Cross Bag",
      price: 80.00,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex flex-col">

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Total Sales</h3>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">⋮</button>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">$350K</span>
              <span className="text-sm font-semibold text-emerald-500 ml-2">↑ 10.4%</span>
            </div>
            <button className="text-[#6467F2] text-sm font-medium border border-[#6467F2] px-6 py-1.5 rounded-full hover:bg-indigo-50 transition-all">
              Details
            </button>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Total Orders</h3>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">⋮</button>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div className="flex items-baseline">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">10.7K</span>
              <span className="text-sm font-semibold text-emerald-500 ml-2">↑ 14.4%</span>
            </div>
            <button className="text-[#6467F2] text-sm font-medium border border-[#6467F2] px-6 py-1.5 rounded-full hover:bg-indigo-50 transition-all">
              Details
            </button>
          </div>
        </div>

        {/* Pending & Canceled */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-bold text-lg">Pending & Canceled</h3>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">⋮</button>
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="flex space-x-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-emerald-600">509</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Canceled</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-rose-500">94</span>
                  <span className="text-xs font-medium text-rose-500">↓ 14.4%</span>
                </div>
              </div>
            </div>
            <button className="text-[#6467F2] text-sm font-medium border border-[#6467F2] px-6 py-1.5 rounded-full hover:bg-indigo-50 transition-all">
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Report for this week</h3>
            <div className="flex items-center space-x-2 bg-[#EAF8E7] p-1 rounded-[12px] border border-gray-100">
              {/* Toggle button menggunakan warna #C1E6BA */}
              <button className="px-5 py-1.5 bg-[#FFFFFF] text-gray-800 rounded-[12px] text-sm font-semibold shadow-sm">
                This week
              </button>
              <button className="px-5 py-1.5 text-gray-500 rounded-full text-sm font-medium hover:text-gray-900 transition-colors">
                Last week
              </button>
            </div>
          </div>

          {/* Sub Header Stats for Chart */}
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
            <div className="border-b-2 border-emerald-500 pb-2 -mb-[18px]">
              <h4 className="text-2xl font-bold text-gray-900">52k</h4>
              <p className="text-xs text-gray-400 mt-1">Customers</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">3.5k</h4>
              <p className="text-xs text-gray-400 mt-1">Total Products</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">2.5k</h4>
              <p className="text-xs text-gray-400 mt-1">Stock Products</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">0.5k</h4>
              <p className="text-xs text-gray-400 mt-1">Out of Stock</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900">250k</h4>
              <p className="text-xs text-gray-400 mt-1">Revenue</p>
            </div>
          </div>

          <div className="flex-grow w-full h-[250px]">
            <SalesChart />
          </div>
        </div>

        {/* Right Sidebar Stats - Top Products */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Top Products</h3>
              <Link
                to="/Products"
                className="text-[#6467F2] font-semibold text-sm hover:underline transition-colors"
              >
                All product
              </Link>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-gray-200"
              />
            </div>

            <div className="space-y-0">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex items-center justify-between py-4 ${
                    index !== products.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Item: {product.id}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-800">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}