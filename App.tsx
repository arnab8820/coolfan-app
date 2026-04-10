import React from 'react';
import { Main } from './src/components/main';
import WebSocketService from './src/services/comm-service';

function App(): React.JSX.Element {
  WebSocketService.connect('ws://192.168.1.151:81');
  return (
    <Main />
  );
}


export default App;
