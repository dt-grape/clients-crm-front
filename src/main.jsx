import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import StudentDetails from "./pages/StudentDetail.jsx";
import Profile from "./pages/Profile.jsx";
import Auth from "./pages/Auth.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "student/:studentId",
        element: <StudentDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ToastContainer position="top-left" autoClose="2000" />
  </QueryClientProvider>
);
