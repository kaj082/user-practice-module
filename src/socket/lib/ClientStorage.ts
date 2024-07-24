import Client from "./Client";

class ClientStorage {
  private clients: Client[] = [];

  public addClient(client: Client): void {
    this.clients.push(client);
  }

  public removeClient(socket_id: string): void {
    this.clients = this.clients.filter((c) => c.getSocketId() !== socket_id);
  }

  public getClientById(user_id: string): Client | undefined {
    return this.clients.find((c) => c.getUserId() === user_id);
  }

  public getClientsByUserId(user_id: string): Client[] {
    return this.clients.filter((c) => c.getUserId() === user_id);
  }

  public getClients(): Client[] {
    return this.clients;
  }

  public hasClientWithSameSessionId(session_id: string): boolean {
    return this.clients.some((c) => c.getSessionId() === session_id);
  }

  public sendEventToAll(user_id: string, session_id: string, data: any) {
    console.log("Sending event to all clients: ", data);

    const clients = this.getClientsByUserId(user_id);

    clients.forEach((c) => {
      if (c.getSessionId() !== session_id) {
        c.sendEvent(data);
      }
    });
  }
}

export default ClientStorage;
