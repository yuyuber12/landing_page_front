import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  role: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<keyof User>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Error fetching users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortedUsers = () => {
    const sorted = [...users].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return sorted;
  };

  const exportToCSV = () => {
    if (users.length === 0) {
      alert("No users to export");
      return;
    }

    const headers = ["First Name", "Last Name", "Email", "Phone", "Interest", "Role"];
    const csvContent = [
      headers.join(","),
      ...users.map((user) =>
        [user.firstName, user.lastName, user.email, user.phone, user.interest, user.role]
          .map((field) => `"${String(field).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    // Add UTF-8 BOM for proper Excel encoding
    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvWithBOM)
    );
    element.setAttribute("download", `users_${new Date().toISOString().slice(0, 10)}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  const sortedUsers = getSortedUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8" style={{ display: 'block' }}>
      <div style={{ maxWidth: '100%', margin: '0' }}>
        {/* Header Section with Export Button on Right */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Registered Users</h1>
            <p className="text-gray-600 mt-2">
              Total: <span className="font-semibold text-indigo-600">{users.length}</span> users
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-lg flex items-center gap-2"
          >
            📥 Export CSV
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}

        {/* Table Container - Aligned to Left */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ maxWidth: '95%', marginLeft: '0' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                  <th 
                    onClick={() => handleSort("firstName")}
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                  >
                    First Name {sortBy === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th 
                    onClick={() => handleSort("lastName")}
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                  >
                    Last Name {sortBy === "lastName" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th 
                    onClick={() => handleSort("email")}
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                  >
                    Email {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th 
                    onClick={() => handleSort("phone")}
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                  >
                    Phone {sortBy === "phone" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th 
                    onClick={() => handleSort("interest")}
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                  >
                    Interest {sortBy === "interest" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th 
                    onClick={() => handleSort("role")}
                    className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-indigo-700 transition"
                  >
                    Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`transition duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-indigo-50"
                    } hover:bg-indigo-100`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{user.firstName}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{user.lastName}</td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-gray-700">{user.phone}</td>
                    <td className="px-6 py-4 text-gray-700">{user.interest}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role === "admin" ? "👤 Admin" : "👥 User"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No users found</p>
            </div>
          )}
        </div>

        {/* Logout Button - Centered at Bottom */}
        <div className="mt-12 flex justify-center pb-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-bold px-12 py-4 rounded-lg hover:bg-red-700 transition shadow-lg text-lg"
          >
             Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
