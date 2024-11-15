import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';

// window.matchMedia 모의 처리
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

// localStorage 모의 처리 (필요 시)
beforeAll(() => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

describe('ThemeToggle Component', () => {
  test('초기 상태일 때 올바른 label 표시', () => {
    render(<ThemeToggle />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent(/다크 모드/i);
  });

  test('버튼 클릭하면 모드 변경', () => {
    render(<ThemeToggle />);
    const buttonElement = screen.getByRole('button');

    // 다크 모드로 전환
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent(/라이트 모드/i);

    // 다시 클릭 시 라이트 모드로 전환
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent(/다크 모드/i);
  });
});
