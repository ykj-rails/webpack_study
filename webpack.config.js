const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const outputPath = path.resolve(__dirname, 'dist')

module.exports = {
  // バンドルするファイルの指定
  entry: './src/index.js',
  output: {
    // バンドル後のファイル名の指定
    filename: 'main.js',
    // バンドルしたファイルの出力先
    path: outputPath
  },
  // 使用するモジュールの定義
  module: {
    // ルールは個々に登録できるので配列で指定
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        // useに記載するローダーを適用するファイル(正規表現)
        test: /\.(sc|c)ss$/,
        // 使用するローダー。useに複数登録した場合、後述したものから順に実行される
        use: [
          // ああ
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        // 画像取り込み
        loader: 'url-loader',
        // 画像をファイルとして取り込み
        options: {
          // 2kbを超えるファイルはnameに指定したディレクトリへ分離
          limit: 2048,
          name: './images/[name].[ext]'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  // ローカルサーバーの設定
  devServer: {
    // ブラウザに表示させるファイルの指定
    contentBase: outputPath
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      // nameはデフォルトでmainが使用される
      // hashはバンドル時にユニークなハッシュをつける(キャッシュ回避)
      filename: '[name].[hash].css'
    })
  ]
}
