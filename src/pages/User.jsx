import { useEffect, useState } from "react";

import { FaPlus, FaSearch, FaEdit, FaTrashAlt } from "react-icons/fa";

import { userAPI } from "../services/userAPI";

import Table from "../components/Table";
import Button from "../components/Button";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import UserModal from "../components/UserModal";

export default function User() {

  const [users, setUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRole, setSelectedRole] = useState("");

  const loadUsers = async () => {
    const data = await userAPI.fetchUser();

    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await userAPI.createUser(formData);

    setIsModalOpen(false);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "member",
    });

    loadUsers();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin ingin menghapus user ini?",
    );
    if (!confirmDelete) return;
    try {
      await userAPI.deleteUser(id);
      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    const matchSearch =
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    const matchRole =
      selectedRole && selectedRole !== "all"
        ? user.role === selectedRole
        : true;

    return matchSearch && matchRole;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div
        className="
            flex
            justify-between
            items-center
            mb-6
            "
      >
        <Button type="add" onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" />
          Add User
        </Button>
      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow-sm
        border
        overflow-hidden
        "
      >
        <div
          className="
            p-4
            border-b
            flex
            flex-col
            md:flex-row
            justify-between
            gap-4
            "
        >
          <div
            className="
                relative
                w-full
                md:w-80
                "
          >
            <InputField
              type="text"
              placeholder="Search User..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                    w-full
                    border
                    border-gray-200
                    rounded-md
                    py-1.5
                    pl-8
                    pr-3
                    text-sm
                    outline-none
                    focus:border-[#4EA674]/50
                    transition-colors
                    "
            />

            <FaSearch
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                text-xs
                "
            />
          </div>

          <SelectField
            value={selectedRole}
            onChange={setSelectedRole}
            placeholder="All Role"
            options={[
              {
                label: "All Role",
                value: "all",
              },

              {
                label: "Admin",
                value: "admin",
              },

              {
                label: "Member",
                value: "member",
              },
            ]}
          />
        </div>

        <div className="overflow-x-auto">
          <Table headers={["No", "Name", "Email", "Role", "Action"]}>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="
                    border-b
                    hover:bg-gray-50
                    text-sm
                    "
              >
                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-semibold">{user.name}</td>

                <td className="p-4 text-gray-600">{user.email}</td>

                <td className="p-4">
                  <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold

                        ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }
                    `}
                  >
                    {user.role}
                  </span>
                </td>

                <td
                  className="
                    p-4
                    flex
                    gap-3
                    "
                >
                  <Button type="edit">
                    <FaEdit />
                  </Button>

                  <Button type="hapus" onClick={() => handleDelete(user.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>

      {isModalOpen && (
        <UserModal
          onClose={() => setIsModalOpen(false)}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
