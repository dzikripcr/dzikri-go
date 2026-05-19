export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">

        {/* Table Head */}
        <thead>
          <tr className="bg-green-50 text-gray-700 text-sm">
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-4 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {children}
        </tbody>

      </table>
    </div>
  );
}