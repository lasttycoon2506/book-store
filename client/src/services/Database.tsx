export class Database {
    async createBook(title: string, author: string) {
        return "book created";
    }

    isAuthorized() {
        return true;
    }
}