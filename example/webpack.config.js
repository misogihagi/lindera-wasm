const path = require('path');

module.exports = {
    entry: './src/index.js', // エントリーポイント
    output: {
        filename: 'bundle.js', // 出力ファイル名
        path: path.resolve(__dirname, 'dist'), // 出力先をexample内のdistに設定
        publicPath: '/example/', // サーバーでのパスを指定
    },
    mode: 'development',
    experiments: {
        asyncWebAssembly: true, // WASMの非同期読み込みを有効化
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'), // 静的ファイルの提供元
        },
        open: true, // サーバー起動時にブラウザを自動で開く
        port: 8080, // ポート番号
    },
};
