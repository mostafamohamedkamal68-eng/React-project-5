import { useSearchParams } from "react-router-dom";
import ProductsApi from "./Api/ProductsApi.jsx";

export default function ProductsPage({ view }) {
  const [searchParams] = useSearchParams();
  return <ProductsApi view={view} query={searchParams.get("q") || ""} category={searchParams.get("category") || ""} />;
}
