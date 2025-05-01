// app/MixpanelProvider.jsx (client component)
"use client";

import { useEffect } from "react";
import { initMixpanel } from "@/lib/mixpanel";

export default function MixpanelProvider({ children }) {
  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  return children;
}
