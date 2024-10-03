import INVOICE_STATUS from "../constants/invoiceStatus";

class Invoice {
  constructor(data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.city = data.city;
      this.region = data.region;
      this.date = data.date;
      this.status = data.status || INVOICE_STATUS.PENDING;
  }
}

export default Invoice;
