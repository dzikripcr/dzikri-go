export default function Badge({ children, type= "primary" }) {
  const types = {
    error : "bg-rose-50 mb-6 p-4 text-sm text-rose-700 border border-rose-100 rounded-lg flex items-center"
  };
	return (
        <span className={`${types[type]}`}>
                {children}
        </span>
	  );
}