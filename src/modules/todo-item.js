class TodoItem {
  title;
  description;
  date;

  constructor(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setDate(date) {
    this.date = date;
  }

  getDate() {
    return this.date;
  }
}

export default TodoItem;
