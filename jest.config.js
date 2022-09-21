module.exports = {
  collectCoverageFrom: ['src/Input/!(type).{ts,tsx,js,jsx}'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
};
