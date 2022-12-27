import React from 'react';
import {Routers} from './routers';
import {Header} from "./components";

export const App = () => {
  return (
      <div>
          <header>
              <Header />
          </header>
          <main style={{padding: '0 36px'}}>
              <Routers />
          </main>
      </div>
  );
};
