import AdminLayout from "../../components/layout/AdminLayout";
import OrganizationHeader from "./OrganizationHeader";

export default function AllAssignedCards() {
  /* STATIC DATA (API READY) */
  const organization = {
    name: "Demo Organization",
    email: "demo@org.com",
    phone: "+91 99999 88888",
    logo: "/assets/logo-placeholder.png",
    cover: "/assets/cover-placeholder.png",
  };

  const assignedCards = [
    {
      id: 1,
      card_id: "CARD-001",
      employee: "Rahul Sharma",
      email: "rahul@company.com",
      phone: "9876543210",
      assigned_on: "2024-01-12",
      status: "Active",
    },
    {
      id: 2,
      card_id: "CARD-002",
      employee: "Anita Verma",
      email: "anita@company.com",
      phone: "9123456789",
      assigned_on: "2024-01-15",
      status: "Active",
    },
  ];

  return (
    <AdminLayout>
      {/* HEADER BLOCK */}
      <OrganizationHeader organization={organization} />

      {/* PAGE TITLE */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Assigned Employee Cards</h3>
        <span className="text-sm text-gray-500">
          Total Assigned: {assignedCards.length}
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Card ID</th>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Assigned On</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignedCards.map((card) => (
              <tr key={card.id} className="border-t">
                <td className="px-6 py-4 font-medium">{card.card_id}</td>
                <td className="px-6 py-4">{card.employee}</td>
                <td className="px-6 py-4">{card.email}</td>
                <td className="px-6 py-4">{card.phone}</td>
                <td className="px-6 py-4">{card.assigned_on}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                    {card.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {assignedCards.length === 0 && (
          <div className="p-8 text-center text-gray-500">No cards assigned</div>
        )}
      </div>
    </AdminLayout>
  );
}
