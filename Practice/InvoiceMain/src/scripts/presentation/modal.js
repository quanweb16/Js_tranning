import Template from '../helpers/template.js';
import ErrorMessageDisplay from '../helpers/errorHandler.js';

class ModalPresentation {
  constructor(invoiceBusiness) {
    this.invoiceBusiness = invoiceBusiness;
    this.errorMessageDisplay = new ErrorMessageDisplay();
  }

  // Initializes the modal presentation component
  init() {
    this.invoiceList = document.querySelector('.invoices .invoice-list .table-list-invoice');
    this.invoiceActionsContainer = document.querySelector('.invoices .invoice-header .actions');
    this.contentForm = document.querySelector('.main-content .modal-form');
    this.addInvoiceEl = this.invoiceActionsContainer.querySelector('.add-invoice-btn');
    this.modalEl = this.contentForm.querySelector('.modal-invoice-content');
    this.addInvoiceEvent(); // Sets up event listener for adding an invoice
  }
  
 // Renders a modal by applying the provided template function
  renderModal(templateFunction) {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += templateFunction();
  }

  // Renders the modal for adding a new invoice
  renderModalAdd() {
    this.renderModal(Template.buildInvoiceForm);
  }

  // Renders the modal for editing an existing invoice
  renderModalEdit() {
    this.renderModal(Template.buildInvoiceFormEdit);
  }

  // Renders the modal for deleting an invoice
  renderModalDelete() {
    this.renderModal(Template.buildDeletePopup);
  }

  // Renders the modal for deleting all invoices
  renderModalDeleteAll() {
    this.renderModal(Template.buildDeleteAllPopup);
  }

  // Renders the notification for editing an invoice
  renderNotificationEdit() {
    this.renderModal(Template.notificationEdit);
  }

  // Renders the notification for creating an invoice
  renderNotificationCreate() {
    this.renderModal(Template.notificationCreate);
  }

  // Renders a generic notification popup
  renderNotification() {
    this.renderModal(Template.notificationPopup);
  }

  addInvoiceEvent() {
    // Adds an event listener to the "Add Invoice" button
    this.addInvoiceEl.addEventListener('click', () => {
      this.openCreateInvoiceModal();
    });
  }
  
  openDeleteInvoiceModal(data) {
    this.renderModalDelete();
    // Adds event listeners for the confirm and cancel buttons in the delete modal
    this.modalEl.querySelector('.confirm-yes').addEventListener('click', (event) => {
      event.preventDefault();
      this.handleDeleteInvoice(data.id);
    });
    this.modalEl.querySelector('.confirm-no').addEventListener('click', () => {
      this.closeModal();
    });
  }
  
  openDeleteAllInvoiceModal() {
    this.renderModalDeleteAll();
    // Adds event listeners for the confirm and cancel buttons in the delete all modal
    this.modalEl.querySelector('.confirm-yes-all').addEventListener('click', (event) => {
      event.preventDefault();
      this.handleDeleteAllInvoices();
    });
    this.modalEl.querySelector('.confirm-no-all').addEventListener('click', () => {
      this.closeModal();
    });
  }
  
  openNotificationDelete() {
    this.renderNotification();
    // Adds an event listener for the confirmation button in the delete notification
    this.modalEl.querySelector('.confirm-yes').addEventListener('click', () => {
      this.closeModal();
    });
  }
  
  openNotificationCreate() {
    this.renderNotificationCreate();
    // Adds an event listener for the confirmation button in the create notification
    this.modalEl.querySelector('.confirm-ok-success').addEventListener('click', () => {
      this.closeModal();
      location.reload();
    });
  }
  
  openNotificationEdit() {
    this.renderNotificationEdit();
    // Adds an event listener for the confirmation button in the edit notification
    this.modalEl.querySelector('.confirm-edit-success').addEventListener('click', () => {
      this.closeModal();
      location.reload();
    });
  }
  
  openCreateInvoiceModal() {
    this.renderModalAdd();
    const id = Date.now();
    this.modalEl.querySelector('.invoice-id').textContent = id;
    // Adds an event listener for the create button in the create invoice modal
    this.modalEl.querySelector('.btn-invoice-create').addEventListener('click', async (event) => {
      event.preventDefault();
      const result = await this.handleCreateInvoice();
      if (result.success) {
        this.openNotificationCreate();
      } else {
        this.errorMessageDisplay.showErrorsCreateInvoice(result.errors);
      }
    });
    this.modalEl.querySelector('.close-popup').addEventListener('click', () => {
      this.closeModal();
    });
  }
  
  openEditInvoiceModal(data) {
    this.renderModalEdit();
    // Pre-populates the edit form fields with the existing invoice data
    this.modalEl.querySelector('.invoice-id').textContent = data.id;
    this.modalEl.querySelector('.invoice-date').value = data.date;
    this.modalEl.querySelector('.invoice-first-name').value = data.firstName;
    this.modalEl.querySelector('.invoice-last-name').value = data.lastName;
    this.modalEl.querySelector('.invoice-email').value = data.email;
    this.modalEl.querySelector('.invoice-city').value = data.city;
    this.modalEl.querySelector('.invoice-region').value = data.region;
    
    // Adds an event listener for the edit button in the edit invoice modal
    this.modalEl.querySelector('.btn-invoice-edit').addEventListener('click', (event) => {
      event.preventDefault();
      const result = this.handleEditInvoices();
      if (result.success) {
        this.openNotificationEdit();
      } else {
        this.errorMessageDisplay.showErrorsEditInvoice(result.errors);
      }
    });
  
    this.modalEl.querySelector('.close-popup-edit').addEventListener('click', () => {
      this.closeModal();
    });
  }
  
// Retrieves form data from the provided modal element
  getFormData(modalEl) {
    return {
      id: modalEl.querySelector('.invoice-id').textContent, // Gets the invoice ID
      date: modalEl.querySelector('.invoice-date').value, // Gets the invoice date
      firstName: modalEl.querySelector('.invoice-first-name').value, // Gets the first name
      lastName: modalEl.querySelector('.invoice-last-name').value, // Gets the last name
      email: modalEl.querySelector('.invoice-email').value, // Gets the email
      city: modalEl.querySelector('.invoice-city').value, // Gets the city
      region: modalEl.querySelector('.invoice-region').value // Gets the region
  };
  }

// Handles the creation of a new invoice
  handleCreateInvoice() {
    const invoiceData = this.getFormData(this.modalEl); // Retrieves form data
    const result = this.invoiceBusiness.addInvoice(invoiceData); // Adds the new invoice
    return result;
  }

// Handles the editing of an existing invoice
  handleEditInvoices() {
    const invoiceData = this.getFormData(this.modalEl); // Retrieves form data
    const result = this.invoiceBusiness.editInvoice(invoiceData.id, invoiceData); // Edits the existing invoice
    return result;
  }

  
  handleDeleteInvoice(id) {
    // Delete the invoice using the business logic
    this.invoiceBusiness.deleteInvoice(id);
    this.closeModal();
    location.reload(); // Reload the page to reflect changes
  }
  
  handleDeleteAllInvoices() {
    // Get all selected checkboxes for invoices to delete
    const selectedCheckboxes = this.invoiceList.querySelectorAll('.invoice-checkbox:checked');
    selectedCheckboxes.forEach((checkbox) => {
      const id = checkbox.closest('.table-item').getAttribute('data-id');
      this.invoiceBusiness.deleteInvoice(id);
    });
    this.closeModal();
    location.reload(); // Reload the page to reflect changes
  }
  
  clearErrorMessages() {
    // Clear all error messages in the modal
    const errorMessages = this.modalEl.querySelectorAll('.error-message');
    errorMessages.forEach(errorElement => {
      errorElement.innerHTML = '';
    });
  }
  
  closeModal() {
    // Close the modal and remove its content
    this.modalEl.innerHTML = '';
    this.modalEl.classList.remove('overlay');
  }
}

export default ModalPresentation;
  

