module.exports = {
  mode: 'development',
  watch: true,
  entry: process.cwd() + '/src/app.js',
  watch: true,
  output: {
    path: process.cwd() + '/dist',
    filename: "bundle.js",
  },
  experiments: {
    topLevelAwait: true
  }
};