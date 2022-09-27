class TipAPI {
  static #bill: number = 0;
  static #tip: number = 0;
  static #people: number = 0;
  static #billSubscribers = new Set();
  static #tipSubscribers = new Set();
  static #peopleSubscribers = new Set();

  static get bill(): number {
    return this.#bill;
  }

  static set bill(newBill: number) {
    this.#bill = newBill;
    this.dispatch("bill");
  }

  static get tip(): number {
    return this.#tip;
  }

  static set tip(newTip: number) {
    this.#tip = newTip;
    this.dispatch("tip");
  }

  static get people(): number {
    return this.#people;
  }

  static set people(newPeople: number) {
    this.#people = newPeople;
    this.dispatch("people");
  }

  static dispatch(propertyName: string) {
    switch (propertyName) {
      case "bill":
        this.#billSubscribers.forEach((billSubscriber: any) => {
          billSubscriber.tipAmount = this.bill;
        });
        break;
      case "tip":
        this.#tipSubscribers.forEach((tipSubscriber: any) => {
          tipSubscriber.tipAmount = this.tip;
        });
        break;
      case "people":
        this.#peopleSubscribers.forEach((peopleSubscriber: any) => {
          peopleSubscriber.tipAmount = this.people;
        });
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static subscribe(propertyName: string, element: any) {
    switch (propertyName) {
      case "bill":
        this.#billSubscribers.add(element);
        break;
      case "tip":
        this.#tipSubscribers.add(element);
        break;
      case "people":
        this.#peopleSubscribers.add(element);
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static unsubscribe(propertyName: string, element: any) {
    switch (propertyName) {
      case "bill":
        this.#billSubscribers.delete(element);
        break;
      case "tip":
        this.#tipSubscribers.delete(element);
        break;
      case "people":
        this.#peopleSubscribers.delete(element);
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }
}

export default TipAPI;