import '@testing-library/jest-dom';
// Silence Node's punycode deprecation in test output
const originalWarn = console.warn;
const originalError = console.error;
console.warn = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('DEP0040')) return;
  return originalWarn(...args);
};
console.error = (...args: any[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  // Filter react-dom test utils deprecation noise from legacy hook util
  if (msg.includes('ReactDOMTestUtils.act') || msg.includes('ReactDOM.render')) return;
  if (msg.includes('DEP0040')) return;
  return originalError(...args);
};
