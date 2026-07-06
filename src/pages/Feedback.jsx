import { useEffect, useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";

import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { feedbackAPI } from "../services/feedbackAPI";

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const loadFeedback = async () => {
    try {
      setIsLoading(true);
      const data = await feedbackAPI.fetchFeedback();
      setFeedbackList(data);
    } catch (error) {
      console.error("Gagal memuat feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  // Filter gabungan: Pencarian Nama (Customer/Produk) & Rating
  const filteredFeedback = feedbackList.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Fallback string kosong agar tidak error jika data bernilai null
    const matchSearch = 
      (item.customerName || "").toLowerCase().includes(searchLower) ||
      (item.namaProduk || "").toLowerCase().includes(searchLower);
      
    const matchRating = 
      selectedRating === "all" ? true : item.rating === parseInt(selectedRating);

    return matchSearch && matchRating;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        
        {/* Header dengan Search dan Filter */}
        <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search customer or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          {/* SelectField untuk Filter Rating */}
          <div className="w-full md:w-48">
            <SelectField
              value={selectedRating}
              onChange={setSelectedRating}
              options={[
                { label: "All Ratings", value: "all" },
                { label: "5 Stars", value: "5" },
                { label: "4 Stars", value: "4" },
                { label: "3 Stars", value: "3" },
                { label: "2 Stars", value: "2" },
                { label: "1 Star", value: "1" },
              ]}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Menambahkan header "Product" */}
          <Table headers={["No", "Customer", "Product", "Rating", "Feedback"]}>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                  Memuat data...
                </td>
              </tr>
            ) : filteredFeedback.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                  Tidak ada feedback ditemukan.
                </td>
              </tr>
            ) : (
              filteredFeedback.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-semibold">
                    {item.customerName || "Anonymous"}
                  </td>
                  <td className="p-4 text-gray-700">
                    {item.namaProduk || "-"}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < item.rating ? "" : "text-gray-200"}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 max-w-md truncate whitespace-normal">
                    {item.feedback}
                  </td>
                </tr>
              ))
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}