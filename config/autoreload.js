module.exports.autoreload = {
  active: true,
  usePolling: false,
  dirs: [
    "api/models",
    "api/controllers",
    "api/services",
    "config/locales",
    "config/routes",
    "seeds/development"
  ],
  ignored: [
    // Ignore all files with .ts extension
    "**.ts"
  ]
};
