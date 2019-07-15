module.exports = {
  automock: false,
  testRegex: "\\.test\\.ts$",
  testURL: "http://localhost/",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
  //testPathIgnorePatterns: ['<rootDir>/stories/', '<rootDir>/node_modules/', '<rootDir>/lib/', '<rootDir>/src/scripts/components/smd/common/core/'],
};
