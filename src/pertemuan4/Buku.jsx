import { useState } from "react";
import dataBuku from "./dataBuku.json";
import Guest from "./components/Guest";
import Admin from "./components/Admin";

export default function Buku() {
  const [view, setView] = useState("guest");

  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedTag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const { searchTerm, selectedCategory, selectedTag } = dataForm;

  const _search = searchTerm.toLowerCase();

  const filtered = dataBuku.filter((dataBuku) => {
    const matchSearch =
      dataBuku.title.toLowerCase().includes(_search) ||
      dataBuku.description.toLowerCase().includes(_search);

    const matchCategory = selectedCategory
      ? dataBuku.category === selectedCategory
      : true;

    const matchTag = selectedTag ? dataBuku.tags.includes(selectedTag) : true;

    return matchSearch && matchCategory && matchTag;
  });

  /** Deklarasi pengambilan unique categories di dataBuku **/
  const categories = [...new Set(dataBuku.map((dataBuku) => dataBuku.category))];

  /** Deklarasi pengambilan unique tags di dataBuku **/
  const tags = [...new Set(dataBuku.flatMap((dataBuku) => dataBuku.tags))];

  // Dynamic styles based on view
  const isGuest = view === "guest";
  const bgMain = isGuest ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800";
  const inputStyle = isGuest 
    ? "bg-slate-900/60 border-cyan-500/30 text-cyan-100 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500" 
    : "bg-white border-gray-200 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm";

  return (
    <div className={`min-h-screen p-6 md:p-10 transition-colors duration-500 ${bgMain}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <h1 className={`text-3xl font-extrabold tracking-tight ${
            isGuest 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]" 
              : "text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600"
          }`}>
            CyberLibrary 2077
          </h1>

          <div className={`flex p-1 rounded-xl shadow-inner border ${
            isGuest ? "bg-slate-900 border-cyan-500/20" : "bg-gray-200/50 border-gray-300/30"
          }`}>
            <button 
              onClick={() => setView("guest")} 
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                isGuest 
                  ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Guest
            </button>
            <button 
              onClick={() => setView("admin")} 
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                !isGuest 
                  ? "bg-indigo-600 text-white shadow-lg" 
                  : "text-slate-400 hover:text-cyan-300"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search book title or desc..."
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${inputStyle}`}
          />

          <select
            name="selectedCategory"
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${inputStyle}`}
          >
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} className={isGuest ? "bg-slate-900" : ""}>{c}</option>
            ))}
          </select>

          <select
            name="selectedTag"
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${inputStyle}`}
          >
            <option value="">All Tags</option>
            {tags.map((t, i) => (
              <option key={i} className={isGuest ? "bg-slate-900" : ""}>{t}</option>
            ))}
          </select>
        </div>

        {/* Render Component */}
        <div className="transition-all duration-500">
          {view === "guest" ? (
            <Guest dataBuku={filtered} />
          ) : (
            <Admin dataBuku={filtered} />
          )}
        </div>
        
      </div>
    </div>
  );
}