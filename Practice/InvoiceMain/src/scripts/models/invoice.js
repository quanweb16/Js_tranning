import INVOICE_STATUS from "../constants/invoiceStatus";

class Invoice {
  constructor(data) {
    // Assigning values to the Invoice properties from the data object
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.city = data.city;
    this.region = data.region;
    this.date = data.date;
    // If status is not provided, default to PENDING
    this.status = data.status || INVOICE_STATUS.PENDING;
  }
}

export default Invoice;
