import { Link } from "react-router-dom";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  // Contoh list top product yang diambil dari data product json
  const products = [
    {
      id: "#PRD001",
      name: "Elegant Silk Dress",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    },
    {
      id: "#PRD002",
      name: "Classic Leather Handbag",
      price: 250.0,
      image:
        "https://images.unsplash.com/photo-1629374029669-aab2f060553b?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: "#PRD003",
      name: "Vintage Pearl Necklace",
      price: 85.5,
      image:
        "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=600&auto=format&fit=crop&q=60",
    },
  ];

  // Mengambil hanya 3 atau 4 produk teratas untuk tampilan sidebar
  const topProducts = products.slice(0, 4);

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
        Dashboard
      </h1>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">Total Sales</h3>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>
            <button className="text-gray-400 hover:text-amber-900 transition-colors">⋮</button>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                $350K
              </span>
              <span className="text-sm font-medium text-emerald-600 ml-2">↑ 10.4%</span>
            </div>
            {/* Tombol Details dengan Aksen Coklat */}
            <button className="text-amber-900 text-sm font-medium border border-amber-900/30 px-5 py-1.5 rounded-full hover:bg-amber-50 hover:border-amber-900 transition-all">
              Details
            </button>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">Total Orders</h3>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>
            <button className="text-gray-400 hover:text-amber-900 transition-colors">⋮</button>
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                10.7K
              </span>
              <span className="text-sm font-medium text-emerald-600 ml-2">↑ 14.4%</span>
            </div>
            <button className="text-amber-900 text-sm font-medium border border-amber-900/30 px-5 py-1.5 rounded-full hover:bg-amber-50 hover:border-amber-900 transition-all">
              Details
            </button>
          </div>
        </div>

        {/* Pending & Canceled */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-900 font-semibold text-lg">
                Pending & Canceled
              </h3>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>
            <button className="text-gray-400 hover:text-amber-900 transition-colors">⋮</button>
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">509</span>
                <span className="text-xs font-medium text-emerald-600">↑ 204</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Canceled</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">94</span>
                <span className="text-xs font-medium text-rose-600">↓ 14.4%</span>
              </div>
            </div>
            <button className="text-amber-900 text-sm font-medium border border-amber-900/30 px-5 py-1.5 rounded-full hover:bg-amber-50 hover:border-amber-900 transition-all">
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">Report for this year</h3>
            <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
              {/* Tombol filter diubah ke tema Monokrom/Abu-abu */}
              <button className="px-4 py-1.5 bg-white text-gray-900 rounded-md text-sm font-semibold shadow-sm border border-gray-200">
                This Year
              </button>
              <button className="px-4 py-1.5 text-gray-500 rounded-md text-sm hover:text-gray-900 hover:bg-gray-100 transition-colors">
                Last Year
              </button>
            </div>
          </div>

          <div className="flex-grow w-full h-[300px]">
            <SalesChart />
          </div>
        </div>

        {/* Right Sidebar Stats - Top Products */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-900 text-lg">Top Products</h3>
              {/* Link diubah ke warna coklat elegan */}
              <Link
                to="/Products"
                className="text-amber-900 font-medium text-sm hover:text-amber-700 hover:underline transition-colors"
              >
                All products
              </Link>
            </div>

            <div className="space-y-5">
              {topProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Item: {product.id}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">
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