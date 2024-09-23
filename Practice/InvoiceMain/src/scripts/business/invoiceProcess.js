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
    editInvoice(id, updatedData) {
        let invoices = this.getInvoices();
        const index = invoices.findIndex(invoice => invoice.id === id);
        
        if (index === -1) {            
            return false;
        }
        if (!this.isValidName(updatedData.name)) {
            alert('Invalid name: Name cannot contain numbers.');
            return false; 
        }
        if (!this.isValidEmail(updatedData.email)) {
            alert('Invalid email: Email must contain at least one letter and be properly formatted.');
            return false; 
        }
    
        
        if (this.isDuplicateInvoice(invoices, updatedData) && updatedData.email !== invoices[index].email) {
            alert('Invoice with the same email already exists');
            return false; 
        }
        if (!this.isValidDate(updatedData.date)) {
            return false; // Thông báo đã được hiển thị trong hàm isValidDate
        }
    
        if (!this.isValidAddress(updatedData.address)) {
            alert('Invalid address: Address must contain at least two letters.');
            return false; 
        }
    
        invoices[index] = { ...invoices[index], ...updatedData };
        this.dataAccess.saveInvoices(invoices);
        return true; 
    }
    

    addInvoice(data) {
        if (!this.isValidId(data.id)) {
            return null; // Thông báo đã được hiển thị trong hàm isValidId
        }
    
        const isValid = this.validateInvoiceData(data);
        if (!isValid) {
            return null; 
        }
        const existingInvoices = this.getInvoices();
  
        if (this.isDuplicateId(existingInvoices, data.id)) {
            alert('Invoice with the same ID already exists');
            return null; 
        } 
        if (this.isDuplicateInvoice(existingInvoices, data)) {
            alert('Invoice with the same email already exists');
            return null; 
        }
        if (!this.isValidDate(data.date)) {
            return null; // Thông báo đã được hiển thị trong hàm isValidDate
        }
        

        if (!this.isValidAddress(data.address)) {
            alert('Invalid address: Address must contain at least two letters.');
            return null;
        }
        
        const newInvoice = { ...data };
        this.dataAccess.addInvoice(newInvoice);
        return newInvoice;
    }
    
    validateInvoiceData(data) {
        if (!data.id) {
            alert('Invalid id');
            return false; 
        }
        if (!data.date) {
            alert('Date is required.');
            return false;
        }
        if (!this.isValidName(data.name)) {
            alert('Invalid name: Name cannot contain numbers and must be at least 2 characters long.');
            return false;
        }
    
        if (!data.email || !this.isValidEmail(data.email)) {
            alert('Invalid email: Email must contain at least one letter.');
            return false;
        }
    
        
    
        if (!data.address) {
            alert('Address is required.');
            return false;
        }
    
        if (!data.profileImgSrc || data.profileImgSrc === 'path/to/default/image.png') {
            alert('Profile image is required.');
            return false;
        }
    
        return true; 
    }
    isValidId(id) {
        const hasNumber = /\d/.test(id);
        if (!hasNumber) {
            alert('Invalid ID: ID must contain at least one number.');
        }
        return hasNumber;
    }
    isValidName(name) {
        const nameContainsNumbers = /\d/.test(name);
        return name && name.length >= 2 && !nameContainsNumbers;
    }

    isValidEmail(email) {
        const re = /^[a-zA-Z][\w.-]*@[a-zA-Z][\w.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
    isValidAddress(address) {
        const re = /[a-zA-Z].*[a-zA-Z]/;
        return re.test(address); 
    }
    isValidDate(date) {
        const inputDate = new Date(date);
        const minDate = new Date('2020-01-01');
        const currentDate = new Date();
    
        if (inputDate < minDate) {
            alert('Invalid date: Date must be after January 1, 2020.');
            return false;
        }
    
        if (inputDate > currentDate) {
            alert('Invalid date: Date cannot be in the future.');
            return false;
        }
    
        return true;
    }
    
    
    isDuplicateId(invoices, id) {
        return invoices.some(invoice => invoice.id === id);
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
