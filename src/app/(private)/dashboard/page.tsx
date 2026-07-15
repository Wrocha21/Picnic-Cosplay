import { Provider } from "@/app/Context/context";
import Dashboard from "./Components/Dashboard";

export default function DashboardPage() {
  return (
    <>
      <Provider>
        <Dashboard />
      </Provider>
    </>
  );
}
