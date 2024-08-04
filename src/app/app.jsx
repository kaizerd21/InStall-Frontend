import AppRoute from "./app.route";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <AppRoute />
    </PrimeReactProvider>
  );
}

export default App;
