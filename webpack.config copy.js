const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // Importa el plugin
const path = require("path");

const entries = [
  { name: "main", path: "./src/index.html" },
  { name: "404", path: "./src/404/index.html" },
  { name: "about", path: "./src/about/index.html" },
  { name: "blog", path: "./src/blog/index.html" },
  { name: "addblog", path: "./src/blog/addblog/index.html" },
  { name: "galeria", path: "./src/galeria/index.html" },
  { name: "contact", path: "./src/contact/index.html" },
  { name: "shop", path: "./src/shop/index.html" },
];

// const entryList = {};

// for (const entryConfig of entries) {
//   const { name, path } = entryConfig;
//   const pathParts = path.split("/");

//   if (name === "main") {
//     entryList[name] = [
//       "./src/js/app.js",
//       "./src/js/common.js",
//       "./src/main.js",
//     ];
//   } else {
//     const folderName = pathParts[1];
//     const fileName = pathParts[2].split(".")[0]; // Extraemos el nombre del archivo sin la extensión
//     entryList[name] = [
//       "./src/js/app.js",
//       `./src/js/common.js`,
//       `./${folderName}/${fileName}/${fileName}.js`,
//     ];
//   }
// }

module.exports = {
  // 1. Modo de compilación: "development" o "production"
  mode: "development",
  // 3. Punto de entrada: Especifica el/los archivo/s de inicio de tu aplicación
  entry: {
    main: ["./src/js/common.js", "./src/main.js"],
    about: ["./src/js/common.js", "./src/about/about.js"],
    blog: ["./src/js/common.js", "./src/blog/blog.js"],
    addblog: ["./src/js/common.js", "./src/blog/addblog/addblog.js"],
    galeria: ["./src/js/common.js", "./src/galeria/galeria.js"],
    shop: ["./src/js/common.js", "./src/shop/shop.js"],
    contact: ["./src/js/common.js", "./src/contact/contact.js"],
    404: ["./src/js/common.js", "./src/404/404.js"],
  },

  // 4. Salida: Configura dónde y cómo se guardan los archivos generados
  // output: {
  //   filename: "[name]/[name].bundle.js",
  //   path: path.resolve(__dirname, "dist"),
  //   clean: true,
  //   publicPath: "/", // Importante para la carga dinámica de chunks
  // },
  output: {
    path: path.resolve(__dirname, "dist"), // Carpeta de salida principal
    filename: (pathData) => {
      //Si la entrada es 'addblog', la guardamos en la carpeta 'blog'
      // if (pathData.chunk.name === "addblog") {
      //   return "blog/[name]/[name].bundle.js";
      // }
      // Para otras entradas, usa el nombre de la entrada
      return "[name]/[name].bundle.js"; // o '[name].js'
    },
  },
  // 5. Watch: Habilita el modo de observación (recompila al guardar cambios)
  watch: true,
  // 6. Módulo: Define cómo se procesan los diferentes tipos de archivos
  module: {
    rules: [
      {
        test: /\.css$/, // Detecta archivos .css
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Aplica los loaders
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },
  // 7. Plugins: Permiten realizar tareas adicionales en el proceso de compilación
  plugins: (() => {
    const htmlPlugins = entries.map((entry) => {
      return new HtmlWebpackPlugin({
        filename:
          entry.name === "main" ? "index.html" : `${entry.name}/index.html`,
        template: entry.path,
        chunks: [entry.name],
        inject: true,
        //Usamos una función para generar el HTML dinámicamente
        // templateParameters: (compilation, assets, res, options) => {
        //   // Importa el código de common.js aquí, dentro de templateParameters
        //   const common = require("./src/js/common.js");
        //   // Devuelve un objeto con las variables que estarán disponibles en la plantilla
        //   return {
        //     navbar: common.navbarHTML, // Usa las variables exportadas
        //     footer: common.footerHTML,
        //   };
        // },
      });
    });

    return [
      new HtmlWebpackPlugin({
        filename: "blog/article.html",
        template: "./src/blog/article.html",
        chunks: ["blog"],
        inject: true,
        // templateParameters: (compilation, assets, res, options) => {
        //   const common = require("./src/blog/blog.js");
        //   return {
        //     common: common.articleHTML, // Usa las variables exportadas
        //   };
        // },
      }),
      ...htmlPlugins,
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
    ];
  })(),
  // 8. Resuelve: Configura cómo se resuelven los módulos
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // 9. DevServer: Configuración para el servidor de desarrollo de webpack
  // devServer: {
  //   static: "./dist",
  //   port: 9000,
  //   open: true,
  //   hot: true,
  //   client: { overlay: true },
  //   compress: true,
  //   //proxy: { "/api": "http://localhost:5000" },
  //   //historyApiFallback: true, // si trabajas con una SPA, asegurándote de que las rutas no den error 404.
  //   allowedHosts: "all", // si estás desarrollando en una red local y quieres que otros dispositivos accedan a tu servidor de desarrollo.
  //   watchFiles: ["src/**/*"], // para asegurarte de que se recarguen correctamente los archivos al modificarlos.
  // },
  //10. Optimización: Configura opciones para optimizar la salida (ej: minificación)
  // optimization: {
  //   minimize: true,
  //   minimizer: [new CssMinimizerWebpackPlugin()],
  //   // Para optimizar
  //   splitChunks: {
  //     // Esto es clave para el lazy loading
  //     chunks: "all", // O 'initial', 'async'
  //     minSize: 20000, // Tamaño mínimo para crear un nuevo chunk (bytes)
  //     maxSize: 100000, // Tamaño máximo del chunk
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //         reuseExistingChunk: true,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   },
  //   runtimeChunk: "single", //Esto también puede ayudar al lazy loading
  // },
};
