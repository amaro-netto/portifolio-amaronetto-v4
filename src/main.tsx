import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

createRoot(document.getElementById("root")!).render(<App />);

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

createRoot(document.getElementById("root")!).render(
  <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
    <App />
  </GoogleReCaptchaProvider>
);