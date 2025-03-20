import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

window.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn().mockImplementation((callback) => ({
  root: null,
  rootMargin: '',
  thresholds: [],
  observe: jest.fn(() => {
    callback([{
      isIntersecting: true,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      target: document.createElement('div'),
      time: Date.now()
    }], this);
  }),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: jest.fn()
}));

window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;

// Suppress antd warning messages in tests
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning:') &&
    args[0].includes('antd')
  ) {
    return;
  }
  originalError.call(console, ...args);
}; 