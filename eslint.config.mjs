import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    files: ["app/lp/HeroVideo.tsx", "app/lp/undo-job/HeroFilm.tsx"],
    rules: {
      // These players enable video only after reading client-only motion,
      // viewport, and data-saver preferences. Keeping that check in an
      // effect avoids a server/client hydration mismatch.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
