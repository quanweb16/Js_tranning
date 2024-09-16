class Business {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
    }

    getInvoices() {
        return this.dataAccess.getInvoices();
    }

    addInvoice(data) {
        // Validate input data
        if (!this.validateInvoiceData(data)) {
            throw new Error('Invalid invoice data');
        }

        // Validate existing data
        const existingInvoices = this.dataAccess.getInvoices();
        if (this.isDuplicateInvoice(existingInvoices, data)) {
            throw new Error('Invoice with the same email or phone already exists');
        }

        // Generate ID
        const id = this.generateId();

        // Save to data access
        const newInvoice = { ...data, id };
        this.dataAccess.addInvoice(newInvoice);

        // Return data to presentation layer
        return newInvoice;
    }

    validateInvoiceData(data) {
        if (!data.email || !this.isValidEmail(data.email)) {
            return false;
        }
        if (!data.phone || !this.isValidPhoneNumber(data.phone)) {
            return false;
        }
        if (!data.invoiceId) {
            return false;
        }
        if (data.name.length < 2) {
            return false;
        }
        return true;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    isValidPhoneNumber(phone) {
        const re = /^\d+$/;
        return re.test(phone);
    }

    isDuplicateInvoice(invoices, data) {
        return invoices.some(invoice => 
            invoice.email === data.email || invoice.phone === data.phone
        );
    }

    generateId() {
        return 'INV' + Date.now();
    }

    editInvoice(id, data) {
        // Validate input data
        if (!this.validateInvoiceData(data)) {
            throw new Error('Invalid invoice data');
        }

        // Get data by id
        const invoices = this.dataAccess.getInvoices();
        const invoiceIndex = invoices.findIndex(invoice => invoice.id === id);

        if (invoiceIndex === -1) {
            throw new Error('Invoice not found');
        }

        // Validate existing data
        if (this.isDuplicateInvoice(invoices, data)) {
            throw new Error('Duplicate data');
        }

        // Update data
        const updatedInvoice = { ...invoices[invoiceIndex], ...data };
        invoices[invoiceIndex] = updatedInvoice;
        this.dataAccess.saveInvoices(invoices);

        // Return new data
        return updatedInvoice;
    }
}

export default Business;
