import { useEffect, useState } from "react";
import { FaSearch, FaTrashAlt, FaStar } from "react-icons/fa";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadFeedback = async () => {
    const data = await feedbackAPI.fetchFeedback();
    setFeedbackList(data);
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin ingin menghapus feedback ini?",
    );
    if (!confirmDelete) return;
    try {
      await feedbackAPI.deleteFeedback(id);
      loadFeedback();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredFeedback = feedbackList.filter((item) =>
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative w-full md:w-80">
            <InputField
              type="text"
              placeholder="Search customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-1.5 pl-8 pr-3 text-sm outline-none focus:border-[#4EA674]/50 transition-colors"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table headers={["No", "Customer", "Rating", "Feedback", "Action"]}>
            {filteredFeedback.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-semibold">{item.customerName}</td>
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
                <td className="p-4 text-gray-600">{item.feedback}</td>
                <td className="p-4">
                  <Button type="hapus" onClick={() => handleDelete(item.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}