import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";

export default [

  /* ========================================================
     ESM DEV (NO MINIFY, WITH SOURCE MAP)
     ======================================================== */
  {
    input: "src/index.js",
    output: {
      file: "dist/alerts.esm.js",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        extract: "style.css",
        minimize: false,
        sourceMap: true
      })
    ]
  },

  /* ========================================================
     ESM PROD  (MINIFIED)
     ======================================================== */
  {
    input: "src/index.js",
    output: {
      file: "dist/alerts.esm.min.js",
      format: "esm",
      sourcemap: false,
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        extract: "style.min.css",
        minimize: true
      }),
      terser()
    ]
  },

  /* ========================================================
     UMD DEV (CSS INJECTED, NO MINIFY)
     ======================================================== */
  {
    input: "src/index.js",
    output: {
      file: "dist/alerts.umd.js",
      format: "umd",
      name: "BFKR",
      exports: "named",
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: true,
        minimize: false,
        sourceMap: true
      })
    ]
  },

  /* ========================================================
     UMD PROD (CSS INJECTED, MINIFIED)
     ======================================================== */
  {
    input: "src/index.js",
    output: {
      file: "dist/alerts.umd.min.js",
      format: "umd",
      name: "BFKR",
      exports: "named",
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: true,
        minimize: true
      }),
      terser()
    ]
  },

  /* ========================================================
     REACT BUILD (PURE ESM)
     ======================================================== */
  {
    input: "src/react/index.js",
    output: {
      file: "dist/react/index.js",
      format: "esm",
      sourcemap: false,
    },
    plugins: [
      resolve(),
      commonjs(),
      
      // Ignore CSS for React ESM build
      postcss({
        inject: false,
        extract: false,
        minimize: false
      })
    ]
  },

  /* ========================================================
     Vue BUILD (PURE ESM)
    ======================================================== */

  {
    input: "src/vue/index.js",
    output: {
      file: "dist/vue/index.js",
      format: "esm",
      sourcemap: false
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: false,
        extract: false,
        minimize: false
      })
    ]
  }
];
