//file invoiceData
class DataAccess {
    constructor() {}

    getInvoices() {
        const invoices = localStorage.getItem('invoices');
        return invoices ? JSON.parse(invoices) : [];
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