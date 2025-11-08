import React from "react";

const CategoryDropdown = () => {
  const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Furniture",
    "Sports Equipment",
    "Toys",
    "Vehicles",
  ];

  return (
    <div className="p-5 font-sans">
      <div>
        <div className="flex flex-col gap-5">
          {/* Dropdown with hover */}
          <div
            className="relative group"
          >
            <button
              className="px-5 py-2 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500"
            >
              Categories
            </button>

            <div
              className="dropdown hidden absolute mt-2 bg-white border border-gray-300 shadow-lg rounded-lg p-3 group-hover:block z-10"
            >
              <ul className="list-none m-0 p-0">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="px-3 py-2 cursor-pointer border-b border-gray-200 hover:bg-yellow-100 last:border-none"
                    onClick={() => alert(`Selected: ${category}`)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Popular categories listed vertically */}
        <div>
          <strong className="block mb-2">Popular Categories:</strong>
          <ul className="list-none m-0 p-0">
            <li className="mb-2">
              <label>
                <input type="checkbox" className="mr-2" />
                Electronics
              </label>
            </li>
            <li className="mb-2">
              <label>
                <input type="checkbox" className="mr-2" />
                Books
              </label>
            </li>
            <li className="mb-2">
              <label>
                <input type="checkbox" className="mr-2" />
                Clothing
              </label>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default CategoryDropdown;

