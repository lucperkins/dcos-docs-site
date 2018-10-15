var path = require('path');
var webpack = require('webpack');

function plugin(options) {
  return function metalsmithWebpackPlugin(files, metalsmith, done) {
    console.log("In webpack middleware");
    let webpackOptions;
    if (typeof options === 'string') {
      const configPath = path.resolve(path.dirname(require.main.filename), options);
      console.log("Pre options load");
      webpackOptions = require(configPath);
      console.log("Post options load");
    } else {
      webpackOptions = options;
    }
    if (webpackOptions) {
      webpack(webpackOptions, (err, stats) => {
        const info = stats.toString({ chunkModules: false, colors: true });
        if (err || stats.hasErrors()) {
          console.error(err);
        }
        console.log(info);

        for (var file in files) {
          files[file].webpackStats = stats;
        };

        done();
      });
    } else {
      console.warn('Warning: No webpack configuration provided.');
    }
  };
}

module.exports = plugin;
