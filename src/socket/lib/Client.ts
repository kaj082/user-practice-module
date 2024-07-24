// create client class

import { Socket } from "socket.io";

class Client {
  private socket: Socket;
  private user_id: string;
  private session_id: string;

  constructor(socket: Socket, user_id: string, session_id: string) {
    this.socket = socket;
    this.user_id = user_id;
    this.session_id = session_id;
  }

  // create get and set methods for user_id and session_id
  public getUserId(): string {
    return this.user_id;
  }

  public getSessionId(): string {
    return this.session_id;
  }

  public setUserId(user_id: string): void {
    this.user_id = user_id;
  }

  public setSessionId(session_id: string): void {
    this.session_id = session_id;
  }

  public send(message: string): void {
    this.socket.send(message);
  }

  public getSocketId(): string {
    return this.socket.id;
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public sendEvent(data: any): void {
    console.log("Sending event to client: ", data);

    this.socket.emit("message", data);
  }
}

export default Client;
