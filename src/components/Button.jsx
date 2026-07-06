export default function Button({ children, onChange, onClick, type= "primary" }) {
  const types = {
    primary: "bg-[#4EA674] text-white px-5 py-2 rounded-md flex items-center text-sm font-semibold transition-colors shadow-sm",
    details: "text-[#6467F2] text-sm font-medium border border-[#6467F2] px-6 py-1.5 rounded-full hover:bg-indigo-50 transition-all",
    toggle: "w-[450px] bg-[#F9FAFB] text-[16px] text-[000000/69] border-[#EAF8E7] border-1 rounded-full py-3 pl-6 pr-12 outline-none focus:ring-2 focus:ring-[#55A67B]/20 transition-all placeholder:text-gray-400",
    notif : "relative p-2 text-gray-600 hover:text-[#55A67B] transition-colors",
    option : "text-gray-400 hover:text-gray-600 transition-colorstext-gray-400 hover:text-gray-600 transition-colors",
    last_week : "px-5 py-1.5 text-gray-500 rounded-full text-sm font-medium hover:text-gray-900 transition-colors",
    this_week : "px-5 py-1.5 bg-[#FFFFFF] text-gray-800 rounded-[12px] text-sm font-semibold shadow-sm",
    add : "bg-[#4EA674] text-white px-5 py-2 rounded-md flex items-center text-sm font-semibold transition-colors shadow-sm",
    edit: "hover:text-blue-500",
    hapus: "hover:text-red-500",
    submit: "bg-[#4EA674]/80 hover:bg-[#4EA674] text-white px-5 py-2 rounded-md text-sm font-medium",
    cancel: "px-4 py-2 rounded hover:bg-gray-100"
  };

  return (
    <button className={`${types[type]}`} onClick={onClick} onChange={onChange}>
      {children}
    </button>
  );
}