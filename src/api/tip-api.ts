type Callback = () => void;

class TipAPI {
  static #billSubscribers: Map<HTMLElement, Callback> = new Map();
  static #tipSubscribers: Map<HTMLElement, Callback> = new Map();
  static #peopleSubscribers: Map<HTMLElement, Callback> = new Map();
  static #bill?: number;
  static #tip?: number;
  static #people?: number;

  static get bill(): number | undefined {
    return this.#bill;
  }

  static get tip(): number | undefined {
    return this.#tip;
  }

  static get people(): number | undefined {
    return this.#people;
  }

  static subscribe(
    propertyName: string,
    element: HTMLElement,
    callback: Callback
  ) {
    switch (propertyName) {
      case "bill":
        this.#billSubscribers.set(element, callback);
        break;
      case "tip":
        this.#tipSubscribers.set(element, callback);
        break;
      case "people":
        this.#peopleSubscribers.set(element, callback);
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static unsubscribe(element: HTMLElement) {
    if (this.#billSubscribers.has(element)) this.#billSubscribers.delete(element);
    if (this.#tipSubscribers.has(element)) this.#tipSubscribers.delete(element);
    if (this.#peopleSubscribers.has(element)) this.#peopleSubscribers.delete(element);
  }

  static updateBill(newBill: number | undefined, sender: HTMLElement) {
    this.#bill = newBill;
    this.#billSubscribers.forEach((callback, htmlElement) => {
      if (htmlElement !== sender) callback();
    });
  }

  static updateTip(newTip: number | undefined, sender: HTMLElement) {
    this.#tip = newTip;
    this.#tipSubscribers.forEach((callback, htmlElement) => {
      if (htmlElement !== sender) callback();
    });
  }

  static updatePeople(newPeople: number | undefined, sender: HTMLElement) {
    this.#people = newPeople;
    this.#peopleSubscribers.forEach((callback, htmlElement) => {
      if (htmlElement !== sender) callback();
    });
  }
}

export default TipAPI;