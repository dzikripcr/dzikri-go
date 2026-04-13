export default function Guest({ dataBuku }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
      {dataBuku.map((b) => (
        <div 
          key={b.id} 
          className="group relative bg-slate-900 border border-cyan-500/30 rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-500 transform hover:-translate-y-2"
        >
          {/* Overlay Gradient for Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90 z-10 pointer-events-none"></div>
          
          <div className="overflow-hidden h-48">
            <img
              src={b.image}
              alt={b.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <div className="relative z-20 p-5 -mt-16">
            <h2 className="font-extrabold text-xl text-cyan-400 drop-shadow-md mb-1 group-hover:text-cyan-300 transition-colors">
              {b.title}
            </h2>
            <p className="text-xs font-semibold text-indigo-300 tracking-wider uppercase mb-3">
              {b.details.author} • {b.details.year}
            </p>
            <p className="text-sm text-slate-300 line-clamp-3 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              {b.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {b.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold text-cyan-950 bg-cyan-400 px-2.5 py-1 rounded-md shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}