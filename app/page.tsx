import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination currentPage={2} itemCount={30} pageSize={10} />;
}
