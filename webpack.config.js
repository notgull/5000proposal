const marked = require("marked");

module.exports = {
  mode: "production",
  devtool: "source-map",
  
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader'
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "raw-loader"
          },
          {
            loader: "markdown-loader",
            options: { }
          }
        ]
      },
      {
        test: /\.html$/,
        use: "raw-loader"
      }, 
    ]
  },

  externals: {
    "jquery": "$",
    "preact": "preact"
  },

  output: {
    library: "fifthist",
    libraryTarget: "assign",
    filename: "fifthist.js"
  }
}
