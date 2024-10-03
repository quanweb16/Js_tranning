import Invoice from "../models/invoice";

class InvoiceDataAccess {
    constructor() {}
    
    getInvoices() {
      const invoices = localStorage.getItem('invoices');
      const parsedInvoices = invoices ? JSON.parse(invoices) : [];

      return parsedInvoices.map(invoiceData => new Invoice(invoiceData));

    }

    addInvoice(invoice) {
        const invoices = this.getInvoices();
        invoices.push(invoice);
        this.saveInvoices(invoices);  
    }

    saveInvoices(invoices) {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }
}

export default InvoiceDataAccess;
