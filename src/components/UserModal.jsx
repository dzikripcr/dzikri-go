import { FaTimes } from "react-icons/fa";

export default function UserModal({
  onClose,
  formData,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-50
        flex
        justify-center
        items-center
        p-4
        "
    >
      <div
        className="
        bg-white
        rounded-xl
        shadow-lg
        w-full
        max-w-lg
        overflow-hidden
        animate-in
        fade-in
        zoom-in
        duration-200
        "
      >
        {/* Header */}

        <div
          className="
            flex
            justify-between
            items-center
            p-6
            border-b
            "
        >
          <h2
            className="
            text-xl
            font-bold
            text-gray-800
            "
          >
            Add New User
          </h2>

          <button
            onClick={onClose}
            className="
            text-gray-400
            hover:text-gray-800
            "
          >
            <FaTimes />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            p-6
            space-y-4
            "
        >
          <div>
            <label
              className="
                block
                text-sm
                font-medium
                mb-1
                "
            >
              Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="
                w-full
                border
                rounded-md
                px-4
                py-2
                outline-none
                focus:border-[#4EA674]
                "
              placeholder="User name"
            />
          </div>

          <div>
            <label
              className="
                    block
                    text-sm
                    font-medium
                    mb-1
                    "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="
                w-full
                border
                rounded-md
                px-4
                py-2
                outline-none
                focus:border-[#4EA674]
                "
              placeholder="Email"
            />
          </div>

          <div>
            <label
              className="
                block
                text-sm
                font-medium
                mb-1
                "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="
                w-full
                border
                rounded-md
                px-4
                py-2
                outline-none
                focus:border-[#4EA674]
                "
            />
          </div>

          <div>
            <label
              className="
                block
                text-sm
                font-medium
                mb-1
                "
            >
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="
                w-full
                border
                rounded-md
                px-4
                py-2
                "
            >
              <option value="member">Member</option>

              <option value="admin">Admin</option>
            </select>
          </div>

          <div
            className="
                flex
                justify-end
                gap-3
                pt-4
                border-t
                "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                rounded
                hover:bg-gray-100
                "
            >
              Cancel
            </button>

            <button
              className="
                bg-[#4EA674]
                text-white
                px-5
                py-2
                rounded-md
                "
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
