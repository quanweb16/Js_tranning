import Invoice from "../data/invoice";

class InvoiceDataAccess {
    constructor() {}
    
    getInvoices() {
      const invoices = localStorage.getItem('invoices');
      const parsedInvoices = invoices ? JSON.parse(invoices) : [];
      return parsedInvoices.map(invoiceData => new Invoice(
          invoiceData.id,
          invoiceData.firstName,
          invoiceData.lastName,
          invoiceData.email,
          invoiceData.city,
          invoiceData.region,
          invoiceData.date,
          invoiceData.status
      ));

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
