const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 1. Modo de compilación: "development" o "production"
  mode: "development",
  entry: {
    main: ["./src/js/common.ts", "./src/main.ts"],
    about: ["./src/js/common.ts", "./src/about/about.ts"],
    blog: ["./src/js/common.ts", "./src/blog/blog.ts"],
    addblog: ["./src/js/common.ts", "./src/blog/addblog/addblog.ts"],
    galeria: ["./src/js/common.ts", "./src/galeria/galeria.ts"],
    shop: ["./src/js/common.ts", "./src/shop/shop.ts"],
    contact: ["./src/js/common.ts", "./src/contact/contact.ts"],
    404: ["./src/js/common.ts", "./src/404/404.ts"],
  },
  // 4. Salida: Configura dónde y cómo se guardan los archivos generados
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (pathData) => {
      if (pathData.chunk.name === "addblog") {
        return "blog/addblog/addblog.bundle.js";
      } else if (pathData.chunk.name === "blog") {
        return "blog/blog.bundle.js";
      }
      return "[name]/[name].bundle.js";
    },
  },

  // 5. Watch: Habilita el modo de observación (recompila al guardar cambios)
  watch: true,
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
  plugins: (() => {
    return [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        chunks: ["main"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "404/index.html",
        template: "./src/404/index.html",
        chunks: ["404"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "about/index.html",
        template: "./src/about/index.html",
        chunks: ["about"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "blog/index.html",
        template: "./src/blog/index.html",
        chunks: ["blog"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "blog/article.html",
        template: "./src/blog/article.html",
        chunks: ["blog"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "blog/addblog/index.html",
        template: "./src/blog/addblog/index.html",
        chunks: ["addblog"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "contact/index.html",
        template: "./src/contact/index.html",
        chunks: ["contact"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "galeria/index.html",
        template: "./src/galeria/index.html",
        chunks: ["galeria"],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        filename: "shop/index.html",
        template: "./src/shop/index.html",
        chunks: ["shop"],
        inject: true,
      }),

      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
    ];
  })(),
  devServer: {
    static: "./dist",
    port: 9000,
    open: true,
    hot: true,
    client: { overlay: true },
    compress: true,
    //proxy: { "/api": "http://localhost:5000" },
    //historyApiFallback: true, // si trabajas con una SPA, asegurándote de que las rutas no den error 404.
    allowedHosts: "all", // si estás desarrollando en una red local y quieres que otros dispositivos accedan a tu servidor de desarrollo.
    watchFiles: ["src/**/*"], // para asegurarte de que se recarguen correctamente los archivos al modificarlos.
  },
};
