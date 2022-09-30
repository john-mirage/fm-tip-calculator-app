type SubscriberCallback = () => void;

class TipAPI {
  static #billSubscribers: Map<HTMLElement, SubscriberCallback> = new Map();
  static #tipSubscribers: Map<HTMLElement, SubscriberCallback> = new Map();
  static #peopleSubscribers: Map<HTMLElement, SubscriberCallback> = new Map();
  static #bill: string = "";
  static #tip: string = "";
  static #people: string = "";

  static get bill(): string {
    return this.#bill;
  }

  static get tip(): string {
    return this.#tip;
  }

  static get people(): string {
    return this.#people;
  }

  static updateBill(newBill: string, emitter: HTMLElement) {
    this.#bill = newBill;
    this.#billSubscribers.forEach((callback, htmlElement) => {
      if (htmlElement !== emitter) callback();
    });
  }

  static updateTip(newTip: string, emitter: HTMLElement) {
    this.#tip = newTip;
    this.#tipSubscribers.forEach((callback, htmlElement) => {
      if (htmlElement !== emitter) callback();
    });
  }

  static updatePeople(newPeople: string, emitter: HTMLElement) {
    this.#people = newPeople;
    this.#peopleSubscribers.forEach((callback, htmlElement) => {
      if (htmlElement !== emitter) callback();
    });
  }

  static subscribe(key: string, htmlElement: HTMLElement, callback: SubscriberCallback) {
    switch (key) {
      case "bill":
        this.#billSubscribers.set(htmlElement, callback);
        break;
      case "tip":
        this.#tipSubscribers.set(htmlElement, callback);
        break;
      case "people":
        this.#peopleSubscribers.set(htmlElement, callback);
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static unsubscribe(htmlElement: HTMLElement) {
    if (this.#billSubscribers.has(htmlElement)) this.#billSubscribers.delete(htmlElement);
    if (this.#tipSubscribers.has(htmlElement)) this.#tipSubscribers.delete(htmlElement);
    if (this.#peopleSubscribers.has(htmlElement)) this.#peopleSubscribers.delete(htmlElement);
  }
}

export default TipAPI;