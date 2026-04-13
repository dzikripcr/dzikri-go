export default function Admin({ dataBuku }) {
  return (
    <div className="overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Author</th>
              <th className="p-4 font-semibold text-center">Category</th>
              <th className="p-4 font-semibold text-center">Stock</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {dataBuku.map((b, index) => (
              <tr 
                key={b.id} 
                className={`border-b border-gray-100 hover:bg-indigo-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                }`}
              >
                <td className="p-4 font-medium text-indigo-900/50">{b.id}</td>
                <td className="p-4 font-bold text-indigo-900">{b.title}</td>
                <td className="p-4 text-gray-600">{b.details.author}</td>
                <td className="p-4 text-center">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200">
                    {b.category}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    b.stock.total > 10 
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-100 text-rose-700 border-rose-200'
                  }`}>
                    {b.stock.total}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}