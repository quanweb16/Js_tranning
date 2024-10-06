import InvoiceValidator from '../validation/invoiceValidate';
import ErrorMessageDisplay from '../helpers/errorHandler';
import Invoice from '../models/invoice';

class InvoiceBusiness {
  constructor(invoiceDataAccess) {
    this.dataAccess = invoiceDataAccess;
    this.validateInvoices = new InvoiceValidator();
    this.displayErrorMessages = new ErrorMessageDisplay();
  }

  getInvoices() {
    return this.dataAccess.getInvoices();
  }

  getInvoiceById(id) {
    const invoices = this.getInvoices();
    return invoices.find((invoice) => invoice.id === id) || null;
  }

  deleteInvoice(id) {
    let invoices = this.getInvoices();
    invoices = invoices.filter((invoice) => invoice.id !== id);
    this.dataAccess.saveInvoices(invoices);
  }

  addInvoice(data) {
    const invoices = this.getInvoices();
    const validationResult = this.validateInvoices.validateInvoiceData(data, invoices);
    
    if (!validationResult.success) {
      this.displayErrorMessages.showErrorsCreateInvoice(validationResult.errors);
      return null;
    }

    const newInvoice = new Invoice(data);
    this.dataAccess.addInvoice(newInvoice);
    
    return newInvoice;
  }

  editInvoice(id, updatedData) {
    const invoices = this.getInvoices();
    const validationResult = this.validateInvoices.validateInvoiceData(updatedData, invoices);
    
    if (!validationResult.success) {
      this.displayErrorMessages.showErrorsEditInvoice(validationResult.errors);
      return null;
    }

    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) {
      return false;
    }

    invoices[index] = { ...invoices[index], ...updatedData };
    this.dataAccess.saveInvoices(invoices);
    return true;
  }

  searchInvoices(query) {
    const invoices = this.getInvoices();

    if (!Array.isArray(invoices)) {
      return [];
    }

    query = query.toLowerCase().trim();

    return invoices.filter((invoice) => {
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

      return (
        idMatch ||
        firstNameMatch ||
        lastNameMatch ||
        emailMatch ||
        dateMatch ||
        statusMatch
      );
    });
  }
}

export default InvoiceBusiness;
