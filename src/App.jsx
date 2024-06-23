import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "react-toastify/dist/ReactToastify.min.css";

import { MainPage } from "./pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
