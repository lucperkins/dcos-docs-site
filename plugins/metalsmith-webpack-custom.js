var path = require('path');
var webpack = require('webpack');

function plugin(options) {
  return function metalsmithWebpackPlugin(files, metalsmith, done) {
    let webpackOptions;
    if (typeof options === 'string') {
      const configPath = path.resolve(path.dirname(require.main.filename), options);
      webpackOptions = require(configPath);
      console.log("Post options load");
    } else {
      webpackOptions = options;
    }
    if (webpackOptions) {
      console.log("webpack options found, starting webpack");
      console.log(webpack);
      console.log(webpackOptions);
      webpack(webpackOptions, (err, stats) => {
        const info = stats.toString({ chunkModules: false, colors: true });
        if (err || stats.hasErrors()) {
          console.log("webpack error");
          console.error(err);
        }
        console.log(info);

        for (var file in files) {
          files[file].webpackStats = stats;
        }

        console.log("webpack done");

        done();
      });
    } else {
      console.warn('Warning: No webpack configuration provided.');
    }
  };
}

module.exports = plugin;
