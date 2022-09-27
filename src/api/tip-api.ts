class TipAPI {
  static #tipAmount: number = 0;
  static #total: number = 0;
  static #tipAmountSubscribers = new Set();
  static #totalSubscribers = new Set();

  static get tipAmount(): number {
    return this.#tipAmount;
  }

  static set tipAmount(newTipAmount: number) {
    this.#tipAmount = newTipAmount;
    this.dispatch("tipAmount");
  }

  static get total(): number {
    return this.#total;
  }

  static set total(newTotal: number) {
    this.#total = newTotal;
    this.dispatch("total");
  }

  static dispatch(propertyName: string) {
    switch (propertyName) {
      case "tipAmount":
        this.#tipAmountSubscribers.forEach((tipAmountSubscriber: any) => {
          tipAmountSubscriber.tipAmount = this.tipAmount;
        });
        break;
      case "total":
        this.#totalSubscribers.forEach((totalSubscriber: any) => {
          totalSubscriber.tipAmount = this.total;
        });
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static subscribe(propertyName: string, element: any) {
    switch (propertyName) {
      case "tipAmount":
        this.#tipAmountSubscribers.add(element);
        break;
      case "total":
        this.#totalSubscribers.add(element);
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static unsubscribe(propertyName: string, element: any) {
    switch (propertyName) {
      case "tipAmount":
        this.#tipAmountSubscribers.delete(element);
        break;
      case "total":
        this.#totalSubscribers.delete(element);
        break;
      default:
        throw new Error("The property name is not valid");
    }
  }

  static calculateTip(bill: number, tip: number, people: number) {
    this.tipAmount = (bill * tip) / people;
    this.total = ((bill * tip) + bill) / people;
  }
}

export default TipAPI;