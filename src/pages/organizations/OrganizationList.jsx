import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AddOrganization from "./AddOrganization";
import { useNavigate } from "react-router-dom";
// import AddOrganizationDrawer from "./AddOrganizationDrawer";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";

export default function OrganizationList() {
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  // ✅ SAMPLE DATA (DEFAULT)
  // const [organizations, setOrganizations] = useState([
  //   {
  //     id: 1,
  //     name: "ABC Corp",
  //     created_at: "2025-01-10",
  //     email: "abc@corp.com",
  //     phone: "9876543210",
  //     totalCards: 50,
  //     activeCards: 30,
  //     inactiveCards: 20,
  //   },
  //   {
  //     id: 2,
  //     name: "XYZ Solutions",
  //     created_at: "2025-01-12",
  //     email: "xyz@solutions.com",
  //     phone: "9123456789",
  //     totalCards: 20,
  //     activeCards: 10,
  //     inactiveCards: 10,
  //   },
  // ]);

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  // const addOrganization = (org) => {
  //   setOrganizations((prev) => [...prev, org]);
  //   setShowDrawer(false);
  // };

  const addOrganization = async (orgData) => {
    try {
      setLoading(true);
      const res = await api.post("/organizations", orgData);

      successAlert("Success", "Organization added successfully");
      setShowDrawer(false);

      // 🔄 Refresh list
      fetchOrganizations();
    } catch (error) {
      errorAlert(
        "Failed",
        error.response?.data?.message || "Unable to add organization",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      setLoading(true);

      const res = await api.get("/organizations");
      setOrganizations(res.data.data || []);
    } catch (error) {
      errorAlert("Error", "Failed to load organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Loader show={loading} text="Loading....." />

        <h2 className="text-2xl font-bold">Organizations</h2>

        <button
          onClick={() => setShowDrawer(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Organization
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Total Cards</th>
              <th className="p-3 text-center">Active Cards</th>
              <th className="p-3 text-center">Inactive Cards</th>
              <th className="p-3 text-right">View</th>
            </tr>
          </thead>

          <tbody>
            {organizations.map((org, index) => (
              <tr key={org.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{org.name}</td>
                <td className="p-3">{org.created_at?.slice(0, 10)}</td>
                <td className="p-3">{org.email || "-"}</td>
                <td className="p-3">{org.phone || "-"}</td>
                <td className="p-3 text-center">{org.total_cards || 0}</td>
                <td className="p-3 text-center text-green-600">
                  {org.active_cards || 0}
                </td>
                <td className="p-3 text-center text-red-500">
                  {org.inactive_cards || 0}
                </td>
                <td className="p-3 text-right">
                  {/* <button className="text-indigo-600 font-medium">View</button> */}

                  <button
                    onClick={() => navigate(`/organizations/${org.id}`)}
                    className="text-indigo-600 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIGHT DRAWER */}
      {showDrawer && (
        <AddOrganization
          onClose={() => setShowDrawer(false)}
          onSave={addOrganization}
        />
      )}
    </AdminLayout>
  );
}
