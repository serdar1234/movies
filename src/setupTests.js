import '@testing-library/jest-dom';

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function mockMatchMedia() {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      };
    };
});
