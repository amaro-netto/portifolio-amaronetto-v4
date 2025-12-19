import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

// Recupera a chave do ambiente
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Validação simples para avisar no console se a chave não estiver configurada (ajuda no debug)
if (!recaptchaSiteKey) {
  console.warn("⚠️ Aviso: VITE_RECAPTCHA_SITE_KEY não definida. O ReCaptcha pode não funcionar corretamente.");
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      {/* O operador '??' garante que seja uma string vazia caso a chave seja undefined, evitando crash */}
      <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey ?? ''}>
        <App />
      </GoogleReCaptchaProvider>
    </StrictMode>
  );
} else {
  console.error("❌ Erro Crítico: Elemento 'root' não encontrado no DOM.");
}