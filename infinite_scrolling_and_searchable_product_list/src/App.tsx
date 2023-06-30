import "./App.css";
import Home from "./components/";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </div>
  );
}

export default App;
