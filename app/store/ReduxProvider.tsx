'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '@/app/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

//상태 저장소를 앱 전역에 주입하는 역할
const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
