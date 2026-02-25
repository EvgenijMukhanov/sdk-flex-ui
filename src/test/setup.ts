import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock for SVG imports
vi.mock('./assets/react.svg', () => ({
  default: 'react-logo.svg',
}));

vi.mock('/vite.svg', () => ({
  default: 'vite.svg',
}));
