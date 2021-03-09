module.exports = {
  mode: 'development',
  entry: process.cwd() + '/src/app.js',
  watch: true,
  output: {
    path: process.cwd() + '/dist',
    filename: "bundle.js",
  }
};