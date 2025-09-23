import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/animations.css";
import "./styles/branding.css";
import "./styles/accessibility.css";
import "./utils/scrollRestoration.ts";

createRoot(document.getElementById("root")!).render(<App />);
