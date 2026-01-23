// import { Routes, Route } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import ProtectedRoute from "./ProtectedRoute";
// import Loader from "../components/Loader";
// import AllAssignedCards from "../pages/organizations/AllAssignedCards";

// /* =====================
//    Lazy Imports
// ===================== */
// const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
// const OrganizationList = lazy(
//   () => import("../pages/organizations/OrganizationList"),
// );
// const OrganizationView = lazy(
//   () => import("../pages/organizations/OrganizationView"),
// );
// const AddOrganization = lazy(
//   () => import("../pages/organizations/AddOrganization"),
// );
// const CardsView = lazy(() => import("../pages/organizations/CardsView"));
// const CardsView1 = lazy(() => import("../pages/organizations/CardsView1"));
// const AddPlan = lazy(() => import("../pages/plans/AddPlan"));
// const Settings = lazy(() => import("../pages/settings/Settings"));
// const Login = lazy(() => import("../pages/auth/Login"));
// const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
// const PaymentTransactions = lazy(
//   () => import("../pages/organizations/PaymentTransactions"),
// );
// const OrganizationAccessSettings = lazy(
//   () => import("../pages/organizations/OrganizationAccessSettings"),
// );
// const CardTemplate = lazy(() => import("../pages/organizations/CardTemplate"));
// const CardPreview = lazy(() => import("../pages/organizations/CardPreview"));
// const ShowCard = lazy(() => import("../pages/organizations/ShowCard"));

// export default function AdminRoutes() {
//   return (
//     <Suspense fallback={<Loader />}>
//       <Routes>
//         {/* AUTH */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/forget-password" element={<ForgotPassword />} />

//         {/* DASHBOARD */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* ORGANIZATIONS */}
//         <Route
//           path="/organizations"
//           element={
//             <ProtectedRoute>
//               <OrganizationList />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/organizations/add"
//           element={
//             <ProtectedRoute>
//               <AddOrganization />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/organizations/:id"
//           element={
//             <ProtectedRoute>
//               <OrganizationView />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/organizations/cards/:id"
//           element={
//             <ProtectedRoute>
//               <CardsView />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/organizations/cards/:cardId/view"
//           element={
//             <ProtectedRoute>
//               <ShowCard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/organizations/:orgid/cards/:cardid"
//           element={
//             <ProtectedRoute>
//               <AllAssignedCards />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/organizations/templates"
//           element={
//             <ProtectedRoute>
//               <CardsView1 />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/organizations/cardstemplate"
//           element={
//             <ProtectedRoute>
//               <CardTemplate />
//             </ProtectedRoute>
//           }
//         />

//         {/* CARD PREVIEW */}
//         <Route
//           path="/card-preview"
//           element={
//             <ProtectedRoute>
//               <CardPreview />
//             </ProtectedRoute>
//           }
//         />

//         {/* TRANSACTIONS */}
//         <Route
//           path="/transactions"
//           element={
//             <ProtectedRoute>
//               <PaymentTransactions />
//             </ProtectedRoute>
//           }
//         />

//         {/* ACCESS SETTINGS */}
//         <Route
//           path="/admin/organizations/:orgid/access-settings"
//           element={
//             <ProtectedRoute>
//               <OrganizationAccessSettings />
//             </ProtectedRoute>
//           }
//         />

//         {/* PLANS */}
//         <Route
//           path="/plans"
//           element={
//             <ProtectedRoute>
//               <AddPlan />
//             </ProtectedRoute>
//           }
//         />

//         {/* SETTINGS */}
//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute>
//               <Settings />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Suspense>
//   );
// }

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

/* =====================
   Direct Imports
===================== */
import Dashboard from "../pages/dashboard/Dashboard";
import OrganizationList from "../pages/organizations/OrganizationList";
import OrganizationView from "../pages/organizations/OrganizationView";
import AddOrganization from "../pages/organizations/AddOrganization";
import CardsView from "../pages/organizations/CardsView";
import CardsView1 from "../pages/organizations/CardsView1";
import AddPlan from "../pages/plans/AddPlan";
import Settings from "../pages/settings/Settings";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import PaymentTransactions from "../pages/organizations/PaymentTransactions";
import OrganizationAccessSettings from "../pages/organizations/OrganizationAccessSettings";
import CardTemplate from "../pages/organizations/CardTemplate";
import CardPreview from "../pages/organizations/CardPreview";
import ShowCard from "../pages/organizations/ShowCard";
import AllAssignedCards from "../pages/organizations/AllAssignedCards";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgotPassword />} />

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ORGANIZATIONS */}
      <Route
        path="/organizations"
        element={
          <ProtectedRoute>
            <OrganizationList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/add"
        element={
          <ProtectedRoute>
            <AddOrganization />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/:id"
        element={
          <ProtectedRoute>
            <OrganizationView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/cards/:id"
        element={
          <ProtectedRoute>
            <CardsView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/cards/:cardId/view"
        element={
          <ProtectedRoute>
            <ShowCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/:orgid/cards/:cardid"
        element={
          <ProtectedRoute>
            <AllAssignedCards />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/templates"
        element={
          <ProtectedRoute>
            <CardsView1 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/cardstemplate"
        element={
          <ProtectedRoute>
            <CardTemplate />
          </ProtectedRoute>
        }
      />

      {/* CARD PREVIEW */}
      <Route
        path="/card-preview"
        element={
          <ProtectedRoute>
            <CardPreview />
          </ProtectedRoute>
        }
      />

      {/* TRANSACTIONS */}
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <PaymentTransactions />
          </ProtectedRoute>
        }
      />

      {/* ACCESS SETTINGS */}
      <Route
        path="/admin/organizations/:orgid/access-settings"
        element={
          <ProtectedRoute>
            <OrganizationAccessSettings />
          </ProtectedRoute>
        }
      />

      {/* PLANS */}
      <Route
        path="/plans"
        element={
          <ProtectedRoute>
            <AddPlan />
          </ProtectedRoute>
        }
      />

      {/* SETTINGS */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
