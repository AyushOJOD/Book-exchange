class Book {
  constructor(title, author, genre, location, contact, ownerId) {
    this.id = Date.now(); // Simple unique ID
    this.title = title;
    this.author = author;
    this.genre = genre || "";
    this.location = location;
    this.contact = contact;
    this.ownerId = ownerId;
    this.status = "available"; // or 'rented', 'exchanged'
  }
}

module.exports = Book;
