import { BehaviorSubject } from 'rxjs';
import { WebSocketMessage } from '../models/websocket-message';
import { AppState } from 'react-native';

export const webSocketMessage: BehaviorSubject<WebSocketMessage> = new BehaviorSubject<WebSocketMessage>({
  speed: 0,
  timer: 0,
});

export const webSocketStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

class WebSocketService {
  static instance: WebSocketService|null = null;

  socket: WebSocket|null = null;
  isConnected: boolean = false;
  onMessageCallback: any;
  appState: string;
  url: string;

  constructor() {
    this.socket = null;
    this.url = '';
    this.appState = AppState.currentState;
  }

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(url: string) {
    this.url = url;
    this.initSocket();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  initSocket() {
    // eslint-disable-next-line curly
    if (this.socket && this.isConnected) return;

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      webSocketStatus.next(true);
    };

    this.socket.onmessage = (event) => {
      try {
        const socketData = JSON.parse(event.data);
        webSocketMessage.next({
            speed: socketData.speed || 0,
            timer: socketData.timer || 0,
        });
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.log('❌ WebSocket error:', error.message);
    };

    this.socket.onclose = (event) => {
      console.log('🔌 WebSocket closed:', event.code);
      this.isConnected = false;
      webSocketStatus.next(false);
    };
  }

  send(message: any) {
    if (this.socket && this.isConnected) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  onMessage(callback: any) {
    this.onMessageCallback = callback;
  }

  handleAppStateChange = (nextAppState: string) => {
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {

      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
        this.initSocket();
      }
    }

    this.appState = nextAppState;
  };
}

export default WebSocketService.getInstance();
