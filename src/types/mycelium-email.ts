import { Email } from "./accounts";

export class MyceliumEmail {
    private username: string;
    private domain: string;

    constructor(username: string, domain: string) {
        this.username = username;
        this.domain = domain;
    }

    public toString(): string {
        return `${this.username}@${this.domain}`;
    }

    public getUsername(): string {
        return this.username;
    }

    public getDomain(): string {
        return this.domain;
    }

    public static fromEmailInterface(email: Email): MyceliumEmail {
        return new MyceliumEmail(email.username, email.domain);
    }
}
