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
        this.saveInvoices(invoices);  // Lưu lại vào localStorage
    }

    saveInvoices(invoices) {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }


    // Save

    // Add
    // -- Get invoice list
    // -- Add item to list
    // Save()

    // Update

    // Delete
}

export default DataAccess;