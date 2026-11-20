import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./componant/Router/Routes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
