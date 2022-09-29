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

  static updateBill(newBill: number | undefined, sender: HTMLElement) {
    this.#bill = newBill;
    this.dispatch("bill", sender);
  }

  static updateTip(newTip: number | undefined, sender: HTMLElement) {
    this.#tip = newTip;
    this.dispatch("tip", sender);
  }

  static updatePeople(newPeople: number | undefined, sender: HTMLElement) {
    this.#people = newPeople;
    this.dispatch("people", sender);
  }

  static dispatch(propertyName: string, sender: HTMLElement) {
    switch (propertyName) {
      case "bill":
        this.#billSubscribers.forEach((callback, htmlElement) => {
          if (htmlElement !== sender) callback();
        });
        break;
      case "tip":
        this.#tipSubscribers.forEach((callback, htmlElement) => {
          if (htmlElement !== sender) callback();
        });
        break;
      case "people":
        this.#peopleSubscribers.forEach((callback, htmlElement) => {
          if (htmlElement !== sender) {
            callback();
            console.log("people has been changed outside the element");
          };
        });
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static subscribe(propertyName: string, sender: HTMLElement, callback: Callback) {
    switch (propertyName) {
      case "bill":
        this.#billSubscribers.set(sender, callback);
        break;
      case "tip":
        this.#tipSubscribers.set(sender, callback);
        break;
      case "people":
        this.#peopleSubscribers.set(sender, callback);
        break;
      default:
        throw new Error("The property name is not valid");
    }
    console.log(this.#peopleSubscribers);
  }

  static unsubscribe(propertyName: string, sender: HTMLElement) {
    switch (propertyName) {
      case "bill":
        this.#billSubscribers.delete(sender);
        break;
      case "tip":
        this.#tipSubscribers.delete(sender);
        break;
      case "people":
        this.#peopleSubscribers.delete(sender);
        break;
      default:
        throw new Error("The property name is not valid");
    }
    console.log(this.#peopleSubscribers);
  }
}

export default TipAPI;