import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: "#059669",
          emeraldDark: "#047857",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },
};

export default config;


