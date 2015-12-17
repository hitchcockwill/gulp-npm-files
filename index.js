var fs = require('fs');

module.exports = function(devDependencies, packageJsonFilePath, opts) {
  var buffer, packages, keys;

  opts = opts || {};

  buffer = fs.readFileSync(packageJsonFilePath || './package.json');
  packages = JSON.parse(buffer.toString());
  keys = [];

  for (key in packages.dependencies) {
    if (opts.includeDist) {
      var package = JSON.parse(fs.readFileSync('./node_modules/' + key + '/package.json'));
      keys.push('./node_modules/' + key + '/' + package.main);
    } else {
      keys.push('./node_modules/' + key + '/**/*');
    }
  }

  if (devDependencies) {
    for (key in packages.devDependencies) {
      keys.push('./node_modules/' + key + '/**/*');
    }
  }

  return keys;
};
