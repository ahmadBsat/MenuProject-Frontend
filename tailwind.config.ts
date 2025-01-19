import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,jsx,ts,tsx,html}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: "Helvetica, -apple-system, Arial, sans-serif",
        quicksand: ["var(--font-quicksand)"],
        noto: ["var(--font-noto)"],
        neue: ["var(--font-neue)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#a41f13",
        lightgray: "rgb(57, 57, 59)",
        mediumgray: "rgb(40,40,42)",
        darkgray: "#191919",
        lightsecondary: "#fff7f2",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: ["class"],
  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#121212",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#a41f13",
              "50": "#a41f13",
              "100": "#a41f13",
              "200": "#a41f13",
              "300": "#a41f13",
              "400": "#a41f13",
              "500": "#a41f13",
              "600": "#a41f13",
              "700": "#a41f13",
              "800": "#a41f13",
              "900": "#a41f13",
            },
            success: {
              foreground: "#FFFFFF",
              DEFAULT: "#08813c",
            },
          },
        },
        dark: {
          colors: {
            background: "rgb(22, 22, 24)",
            foreground: "#ffffff",
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#a41f13",
              "50": "#a41f13",
              "100": "#a41f13",
              "200": "#a41f13",
              "300": "#a41f13",
              "400": "#a41f13",
              "500": "#a41f13",
              "600": "#a41f13",
              "700": "#a41f13",
              "800": "#a41f13",
              "900": "#a41f13",
            },
            success: "#08813c",
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
export default config;
