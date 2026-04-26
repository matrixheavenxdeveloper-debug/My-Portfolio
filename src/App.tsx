import { PerformanceModeProvider } from "@/hooks/use-performance-mode";
import Index from "./pages/Index";

const App = () => (
  <PerformanceModeProvider>
    <Index />
  </PerformanceModeProvider>
);

export default App;
