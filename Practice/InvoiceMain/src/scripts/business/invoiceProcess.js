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
        const validationResult = this.validateInvoiceData(data);
    if (!validationResult.success) {
        console.log(validationResult.errors);
        document.getElementById('invoice-id-error').innerHTML = validationResult.errors.id || '';
        document.getElementById('date-error').innerHTML = validationResult.errors.date || '';
        document.getElementById('first-name-error').innerHTML = validationResult.errors.firstName || '';
        document.getElementById('last-name-error').innerHTML = validationResult.errors.lastName || '';
        document.getElementById('email-error').innerHTML = validationResult.errors.email || '';
        document.getElementById('city-error').innerHTML = validationResult.errors.city || '';
        document.getElementById('region-error').innerHTML = validationResult.errors.region || '';
        return null; 
    }
    const invoices = this.getInvoices();
    if (this.isDuplicateId(invoices, data.id)) {
        document.getElementById('invoice-id-error').innerHTML = "ID already exists!";
        return null; 
    }
    
    if (this.isDuplicateInvoice(invoices, data)) {
        document.getElementById('email-error').innerHTML = "Email already exists!";
        return null; 
    }

        const newInvoice = { ...data };
        this.dataAccess.addInvoice(newInvoice);
        return newInvoice;
    }
    editInvoice(id, updatedData) {
        const validationResult = this.validateInvoiceData(updatedData);
    if (!validationResult.success) {
        console.log(validationResult.errors);
        document.getElementById('invoice-id-error').innerHTML = validationResult.errors.id || '';
        document.getElementById('date-error').innerHTML = validationResult.errors.date || '';
        document.getElementById('first-name-error').innerHTML = validationResult.errors.firstName || '';
        document.getElementById('last-name-error').innerHTML = validationResult.errors.lastName || '';
        document.getElementById('email-error').innerHTML = validationResult.errors.email || '';
        document.getElementById('city-error').innerHTML = validationResult.errors.city || '';
        document.getElementById('region-error').innerHTML = validationResult.errors.region || '';
        return null; 
    }
        let invoices = this.getInvoices();
        const index = invoices.findIndex(invoice => invoice.id === id);       
        if (index === -1) {            
            return false;
        }
        if (this.isDuplicateInvoice(invoices, updatedData) && updatedData.email !== invoices[index].email) {
            console.log(`Duplicate Email: ${updatedData.email}`);
            document.getElementById('email-error').innerHTML = 'Email already exists!';
            return null;
        }
        invoices[index] = { ...invoices[index], ...updatedData };
        this.dataAccess.saveInvoices(invoices);
        return true; 
    }
    
    validateInvoiceData(data) {
        const errors = {};

        if (!data.id) {
            errors.id = "Invoice ID id is required";
        } else if (!this.isValidId(data.id)) {
            errors.id = "Invalid Invoice ID!";
        }
    

        if (!data.date) {
            errors.date = "Date id is required ";
        } else if (!this.isValidDate(data.date)) {
            errors.date = "Invalid date!";
        }
    

        if (!data.email) {
            errors.email = "Email is required";
        } else if (!this.isValidEmail(data.email)) {
            errors.email = "Invalid email!";
        }

        if (!data.firstName) {
            errors.firstName = "First Name id is required";
        } else if (!this.isValidFirstName(data.firstName)) {
            errors.firstName = "Invalid first name!";
        }
    

        if (!data.lastName) {
            errors.lastName = "Last Name id is required.";
        } else if (!this.isValidLastName(data.lastName)) {
            errors.lastName = "Invalid last name!";
        }
    

        if (!data.city) {
            errors.city = "City id is required";
        } else if (!this.isValidCity(data.city)) {
            errors.city = "Invalid City!";
        } 
    

        if (!data.region) {
            errors.region = "Region id is required";
        } else if (!this.isValidRegion(data.region)) {
            errors.region = "Invalid region!";
        }
    

        if (Object.keys(errors).length > 0) {
            return { success: false, errors };
        }
    
        return { success: true };
    }
    isValidId(id) {
        const hasNumber = /\d/.test(id);
        if (!hasNumber) {
        }
        return hasNumber;
    }
    isValidDate(date) {
        const inputDate = new Date(date);
        const minDate = new Date('2020-01-01');
        const currentDate = new Date();
        if (inputDate < minDate) {
            return false;
        }
        if (inputDate > currentDate) {
            return false;
        }
        return true;
    }
    isValidFirstName(firstName) {
        const nameContainsNumbers = /\d/.test(firstName);
        return firstName && firstName.length >= 2 && !nameContainsNumbers;
    }
    isValidLastName(lastName) {
        const nameContainsNumbers = /\d/.test(lastName);
        return lastName && lastName.length >= 2 && !nameContainsNumbers;
    }
    isValidEmail(email) {
        const re = /^[a-zA-Z][\w.-]*@[a-zA-Z][\w.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
    isValidCity(city) {
        const re = /[a-zA-Z].*[a-zA-Z]/;
        return re.test(city); 
    }
    isValidRegion(region) {
        const re = /[a-zA-Z].*[a-zA-Z]/;
        return re.test(region); 
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
            const firstNameMatch = invoice.firstName.toLowerCase().includes(query);
            const lastNameMatch = invoice.lastName.toLowerCase().includes(query);
            const emailMatch = invoice.email.toLowerCase().includes(query);
            const dateMatch = invoice.date.toLowerCase().includes(query);
            const statusMatch = invoice.status.toLowerCase().includes(query);

            console.log('ID Match:', idMatch);
            console.log('First Name Match:', firstNameMatch);
            console.log('Last Name Match:', lastNameMatch);
            console.log('Email Match:', emailMatch);
            console.log('Date Match:', dateMatch);
            console.log('Status Match:', statusMatch);

            return idMatch || firstNameMatch ||lastNameMatch || emailMatch || dateMatch || statusMatch;
        });
    }
}

export default Business;
