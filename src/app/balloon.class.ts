import { IBalloon } from "./balloon.interface";
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'brown'];
export class Balloon implements IBalloon {
    id: string;
    color: string;
    constructor() {
        this.id = window.crypto.randomUUID();
        this.color = colors[Math.floor(Math.random() * colors.length)];

    }
}