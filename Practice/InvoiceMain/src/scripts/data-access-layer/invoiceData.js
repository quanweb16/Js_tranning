//file invoiceData
class DataAccess {
    constructor() {}

    getInvoices() {
        const invoices = localStorage.getItem('invoices');
        return invoices ? JSON.parse(invoices) : [];
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

export default DataAccess;