import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30000 } } });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-center" toastOptions={{
        style: { background:"#16161e", color:"#e8e8f4", border:"1px solid #2e2e3f", fontFamily:"'DM Sans',sans-serif", fontSize:13, borderRadius:12 },
        success: { iconTheme: { primary:"#f97316", secondary:"#16161e" } },
      }}/>
    </QueryClientProvider>
  </React.StrictMode>
);
