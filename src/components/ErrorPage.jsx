import { Link } from "react-router-dom";

export default function ErrorPage(props) {
  return (
    <div
      id="errorpage-container"
      className="flex flex-col items-center justify-center min-h-[75vh] text-center px-6"
    >
      {/* Visual Error Section */}
      <div className="relative mb-6">
        <img 
          src={props.image} 
          alt={props.code} 
          className="w-[160px] opacity-80 mix-blend-multiply" 
        />
        <h1 className="text-[100px] font-extrabold text-gray-100 absolute inset-0 flex items-center justify-center -z-10 select-none">
          {props.code}
        </h1>
      </div>

      {/* Konten Teks */}
      <div className="max-w-md">
        <h2 className="text-3xl font-serif font-semibold text-gray-900 tracking-tight">
          {props.title}
        </h2>
        <p className="text-gray-500 mt-4 leading-relaxed font-light">
          {props.description}
        </p>
      </div>

      {/* Action Button */}
      <Link
        to="/dashboard"
        className="mt-10 bg-[#4EA674] text-white px-10 py-3 rounded-full shadow-xl hover:bg-[#4ea674b4] hover:-translate-y-1 transition-all duration-300 text-sm font-medium tracking-widest"
      >
        BACK TO DASHBOARD
      </Link>
    </div>
  );
}