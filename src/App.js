import "./styles.css";
import PaginationList from "./components/PaginationList";
import { listData } from "./constants";

export default function App() {
  return (
    <div className="App">
      <PaginationList list={listData} />
    </div>
  );
}
