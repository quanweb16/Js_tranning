import ValidateInvoices from "./validateInvoices";
import DisplayErrorMessages from "../display/displayErrorMessages";
class InvoiceBusiness {
  constructor(InvoiceData) {
    this.DataAccess = InvoiceData;
    this.ValidateInvoices = new ValidateInvoices();
    this.DisplayErrorMessages = new DisplayErrorMessages();
  }

  getInvoices() {
    return this.DataAccess.getInvoices();
  }

  getInvoiceById(id) {
    const invoices = this.getInvoices();
    return invoices.find((invoice) => invoice.id === id) || null;
  }

  deleteInvoice(id) {
    let invoices = this.getInvoices();
    invoices = invoices.filter((invoice) => invoice.id !== id);
    this.DataAccess.saveInvoices(invoices);
  }

  addInvoice(data) {
    const invoices = this.getInvoices();
    const validationResult = this.ValidateInvoices.validateInvoiceData(
      data,
      invoices
    );
    if (!validationResult.success) {
      this.DisplayErrorMessages.showErrorsCreateInvoice(
        validationResult.errors
      );
      return null;
    }

    const newInvoice = { ...data };
    this.DataAccess.addInvoice(newInvoice);
    return newInvoice;
  }

  editInvoice(id, updatedData) {
    const invoices = this.getInvoices();
    const validationResult = this.ValidateInvoices.validateInvoiceData(
      updatedData,
      invoices
    );
    if (!validationResult.success) {
      this.DisplayErrorMessages.showErrorsEditInvoice(validationResult.errors);
      return null;
    }

    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) {
      return false;
    }

    invoices[index] = { ...invoices[index], ...updatedData };
    this.DataAccess.saveInvoices(invoices);
    return true;
  }

  searchInvoices(query) {
    const invoices = this.getInvoices();

    if (!Array.isArray(invoices)) {
      console.error("Invoices data is not initialized correctly.");
      return [];
    }

    query = query.toLowerCase().trim();
    console.log("Search Query:", query);

    return invoices.filter((invoice) => {
      const idMatch = invoice.id.toLowerCase().includes(query);
      const firstNameMatch = invoice.firstName.toLowerCase().includes(query);
      const lastNameMatch = invoice.lastName.toLowerCase().includes(query);
      const emailMatch = invoice.email.toLowerCase().includes(query);
      const dateMatch = invoice.date.toLowerCase().includes(query);
      const statusMatch = invoice.status.toLowerCase().includes(query);

      console.log("ID Match:", idMatch);
      console.log("First Name Match:", firstNameMatch);
      console.log("Last Name Match:", lastNameMatch);
      console.log("Email Match:", emailMatch);
      console.log("Date Match:", dateMatch);
      console.log("Status Match:", statusMatch);

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
