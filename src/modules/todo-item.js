class TodoItem {
  #title;
  #description;
  #date;
  #priority;

  constructor(title, description, date, priority) {
    this.#title = title;
    this.#description = description;
    this.#date = date;
    this.#priority = priority;
  }

  setTitle(title) {
    this.#title = title;
  }

  getTitle() {
    return this.#title;
  }

  setDescription(description) {
    this.#description = description;
  }

  getDescription() {
    return this.#description;
  }

  setDate(date) {
    this.#date = date;
  }

  getDate() {
    return this.#date;
  }

  setPriority(priority) {
    this.#priority = priority;
  }

  getPriority() {
    return this.#priority;
  }

  getDateFormatted() {
    const day = this.#date.split("/")[0];
    const month = this.#date.split("/")[1];
    const year = this.#date.split("/")[2];
    return `${month}/${day}/${year}`;
  }

  /* displayTitle() {
    console.log(this.#title);
  } */
}

export default TodoItem;
