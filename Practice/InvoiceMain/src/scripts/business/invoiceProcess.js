class Business {
    constructor(dataAccess) {
        this.dataAccess = dataAccess;
        
    }

    getInvoices() {
        return this.dataAccess.getInvoices();
    }
    getInvoiceById(id) {
        const invoices = this.getInvoices();
        return invoices.find(invoice => invoice.id === id) || null;
        
    }
    deleteInvoice(id) {
        let invoices = this.getInvoices();
        invoices = invoices.filter(invoice => invoice.id !== id);
        this.dataAccess.saveInvoices(invoices);  
    }

    addInvoice(data) {
        if (!this.validateInvoiceData(data)) {
            throw new Error('Invalid invoice data');
        }

        const existingInvoices = this.getInvoices();
        if (this.isDuplicateInvoice(existingInvoices, data)) {
            throw new Error('Invoice with the same email or phone already exists');
        }

        const id =data.id;
        const newInvoice = { ...data, id };
        this.dataAccess.addInvoice(newInvoice);

        return newInvoice;
    }
    editInvoice(id, updatedData) {
        let invoices = this.getInvoices();
        const index = invoices.findIndex(invoice => invoice.id === id);

        if (index === -1) {
            throw new Error('Invoice not found');
        }

        invoices[index] = { ...invoices[index], ...updatedData };
        this.dataAccess.saveInvoices(invoices);
    }

    validateInvoiceData(data) {
        if (!data.email || !this.isValidEmail(data.email)) return false;
        if (!data.id) return false;
        if (data.name.length < 2) return false;
        return true;
    }
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    isDuplicateInvoice(invoices, data) {
        return invoices.some(invoice => invoice.email === data.email);
    }
   
    searchInvoices(query) {
        const invoices = this.getInvoices();  
        
        if (!Array.isArray(invoices)) {
            console.error('Invoices data is not initialized correctly.');
            return [];
        }
    
        query = query.toLowerCase().trim();
        console.log('Search Query:', query); 
    
        return invoices.filter(invoice => {
            
            const idMatch = invoice.id.toLowerCase().includes(query);
            const nameMatch = invoice.name.toLowerCase().includes(query);
            const emailMatch = invoice.email.toLowerCase().includes(query);
            const dateMatch = invoice.date.toLowerCase().includes(query);
            const statusMatch = invoice.status.toLowerCase().includes(query);
    
            
            console.log('ID Match:', idMatch);
            console.log('Name Match:', nameMatch);
            console.log('Email Match:', emailMatch);
            console.log('Date Match:', dateMatch);
            console.log('Status Match:', statusMatch);
    
    
            return idMatch || nameMatch || emailMatch || dateMatch || statusMatch;
        });
    }

}

export default Business;
