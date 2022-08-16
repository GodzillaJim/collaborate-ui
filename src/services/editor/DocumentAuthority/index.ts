import { Update } from "@codemirror/collab";
import { ChangeSet, Text } from "@codemirror/state";
import { ClientChanges } from "../../../types/services/editor";
import { Socket } from "socket.io-client";

export default class DocumentAuthority {
  doc: Text;
  private readonly updates: Update[] = [];

  constructor(initDoc: string[] = [""], newUpdates?: Update[]) {
    this.doc = Text.of(initDoc);
    if (newUpdates) this.updates = newUpdates;
  }

  public receiveUpdates(
    changes: ClientChanges,
    socket: Socket,
    roomId: string
  ) {
    if (this.getUpdates().length === changes.version) {
      changes.updates.forEach((update) => {
        const deserializedUpdate = ChangeSet.fromJSON(update.updateJSON);
        this.updates.push({
          changes: deserializedUpdate,
          clientID: update.clientID,
        });
        this.doc = deserializedUpdate.apply(this.doc);
      });
      this.sendUpdates(changes, socket, roomId);
    } else {
      console.log("Version mismatch!");
    }
  }

  sendUpdates(changes: ClientChanges, socket: Socket, roomId: string) {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("doc", { room: roomId, ...changes });
  }

  getUpdates() {
    return this.updates;
  }
}
