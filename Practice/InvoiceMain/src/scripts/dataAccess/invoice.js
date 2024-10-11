class InvoiceDataAccess {
  // Retrieve the list of invoices from localStorage.
  getInvoices() {
      const invoices = localStorage.getItem('invoices');
      // If there is invoice data in localStorage, parse and return it as an array.
      // If not, return an empty array.
      return invoices ? JSON.parse(invoices) : [];
  }

  // Retrieve a specific invoice by ID from the list of invoices.
  getInvoiceById(id) {
      const invoices = this.getInvoices();
      // Find the invoice with the matching ID, if not found return null.
      return invoices.find((invoice) => invoice.id === id) || null;
  }

  // Add a new invoice to the list and update localStorage.
  addInvoice(invoice) {
      const invoices = this.getInvoices();
      invoices.push(invoice); // Add the new invoice to the existing array of invoices.
      this.saveInvoices(invoices); // Update localStorage with the new list of invoices.
  }

  // Update the list of invoices in localStorage.
  updateInvoice(id, updatedData) {
    const invoices = this.getInvoices();
    const index = invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) {
      return false;
    }
    invoices[index] = { ...invoices[index], ...updatedData };
    this.saveInvoices(invoices);// Updates localStorage with the new list of invoices.
    return true;
  }
  
  // Deletes an invoice by its ID
  deleteInvoice(id) {
    let invoices = this.getInvoices();
    invoices = invoices.filter((invoice) => invoice.id !== id);
    this.saveInvoices(invoices); // Updates localStorage with the new list of invoices.
  }

  // Saves the list of invoices to localStorage
  saveInvoices(invoices) {
    localStorage.setItem('invoices', JSON.stringify(invoices)); 
  }
}

export default InvoiceDataAccess;
