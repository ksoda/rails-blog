const { environment } = require("@rails/webpacker");
const erb = require("./loaders/erb");

for (const [name, loader] of ["css", "moduleCss"].map((name) => [
  name,
  environment.loaders.get(name),
])) {
  loader.test = /\.(p?css)$/i;
  environment.loaders.insert(name, loader);
}

environment.loaders.prepend("erb", erb);
module.exports = environment;
