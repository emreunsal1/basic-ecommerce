export default {
  preset: "./jest-preset.js",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Use babel-jest to transform JavaScript and JSX files
  },
  moduleNameMapper: {
    // This ensures proper module resolution for assets like CSS, images, etc.
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "jest-transform-stub",
  },
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["node_modules"],
  testPathIgnorePatterns: ["node_modules"], // Ignore node_modules and dist folders
  moduleDirectories: ["node_modules", "src"], // Resolve modules from src as well
  collectCoverage: true, // Enable coverage collection
  coverageReporters: ["text", "lcov"], // Report coverage in text and lcov formats
  coverageDirectory: "./coverage", // Coverage reports will be stored here
};
