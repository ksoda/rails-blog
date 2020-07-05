const { environment } = require("@rails/webpacker");

for (const [name, loader] of ["css", "moduleCss"].map((name) => [
  name,
  environment.loaders.get(name),
])) {
  loader.test = /\.(p?css)$/i;
  environment.loaders.insert(name, loader);
}

module.exports = environment;
