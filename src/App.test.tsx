import { createRoot } from "react-dom/client";
import App from "./components/App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div); // createRoot(container!) if you use TypeScript
  root.render(<App />);
  root.unmount();
});
