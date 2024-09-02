module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios/)"
  ]
};
