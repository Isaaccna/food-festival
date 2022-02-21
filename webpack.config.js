const path = require("path");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");

/*This is a plug that will analyze our bundle sizes to see 
 how much JS is being processed by the brownser*/
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = {
    entry: {
        app: "./public/assets/js/script.js",
        events: "./public/assets/js/events.js",
        schedule: "./public/assets/js/schedule.js",
        tickets: "./public/assets/js/tickets.js"
      },      
      output: {
        filename: "[name].bundle.js",
        path: __dirname + "./public/dist",
      },

      module: {
        rules: [
          {
            test: /\.jpg$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  esModule: false,
                  name (file) {
                    return "[path][name].[ext]"
                  },
                  publicPath: function(url) {
                    return url.replace("../", "/assets/")
                  }
                }  
              },
              {
          loader: 'image-webpack-loader'
        }
            ]
          }
        ]
      },
    
    plugins:[
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "disable", // the report outputs to an HTML file in the dist folder
          }),
          new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "..index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [{
              src: path.resolve("public/assets/img/icons/icon-512x512.png"),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join("assets", "icons")
            }]
          })
      ],
      

    mode: 'development'
  };
  