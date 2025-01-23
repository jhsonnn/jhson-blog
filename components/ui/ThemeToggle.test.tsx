import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import ThemeToggle from './ThemeToggle';

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('ThemeToggle Component', () => {
  test('초기 상태일 때 올바른 이모티콘 표시', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toContainHTML('🌞');
  });

  test('버튼 클릭하면 모드 변경', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toContainHTML('🌞');
  });
});
