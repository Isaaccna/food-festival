const path = require("path");
const webpack = require("webpack");

/*This is a plug that will analyze our bundle sizes to see 
 how much JS is being processed by the brownser*/
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
      },      
      output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
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
          })
      ],
      

    mode: 'development'
  };
  