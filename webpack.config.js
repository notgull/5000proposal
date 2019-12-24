module.exports = {
  mode: "production",
  devtool: "source-map",
  
  resolve: {
    extensions: [ ".ts", ".tsx" ]
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
      }
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
