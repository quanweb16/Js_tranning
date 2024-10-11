import InvoiceValidator from '../validation/invoiceValidate';
import ErrorMessageDisplay from '../helpers/errorHandler';
import Invoice from '../models/invoice';

class InvoiceBusiness {
  constructor(invoiceDataAccess) {
    this.dataAccess = invoiceDataAccess;
    this.invoiceValidator = new InvoiceValidator();
    this.errorMessageDisplay = new ErrorMessageDisplay();
  }
  
  // Retrieves all invoices, mapping raw data to Invoice instances.
  getInvoices() {
    const invoicesData = this.dataAccess.getInvoices();
    return invoicesData.map(invoiceData => new Invoice(invoiceData));
  }

  // Retrieves a single invoice by its ID, returning an Invoice instance.
  getInvoiceById(id) {
    const invoiceData = this.dataAccess.getInvoiceById(id);
    return invoiceData ? new Invoice(invoiceData) : null;
  }

  // Adds a new invoice after validating the data.
  addInvoice(data) {
    const invoices = this.getInvoices();
    const validationResult = this.invoiceValidator.validateInvoiceData(data, invoices);

    if (!validationResult.success) {
      return { success: false, errors: validationResult.errors };
    }

    const newInvoice = new Invoice(data);
    this.dataAccess.addInvoice(newInvoice);
    
    return { success: true, invoice: newInvoice };
  }

  // Edits an existing invoice by ID after validating the data.
  editInvoice(id, updatedData) {
    const invoices = this.getInvoices();
    const validationResult = this.invoiceValidator.validateInvoiceData(updatedData, invoices);
  
    if (!validationResult.success) {
      return { success: false, errors: validationResult.errors };
    }
  
    this.dataAccess.updateInvoice(id, updatedData);

    return { success: true, invoice: updatedData };
  }
  
  // Deletes an invoice by its ID.
  deleteInvoice(id) {
    this.dataAccess.deleteInvoice(id); 
  }

  // Searches for invoices matching the query across various fields.
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
