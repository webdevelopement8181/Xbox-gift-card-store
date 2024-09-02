import '@testing-library/jest-dom';

// src/setupTests.js
global.matchMedia = global.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    }
  }