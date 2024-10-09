import Template from '../helpers/template.js';
import ModelPresentation from './modal.js';

class InvoicePresentation {
  constructor(invoiceBusiness) {
    this.invoiceBusiness = invoiceBusiness;
    this.modal = new ModelPresentation(this.invoiceBusiness);
  }

  init() {
    // Initial elements
    this.invoiceList = document.querySelector('.invoices .invoice-list .table-list-invoice');
    this.invoiceActionsContainer = document.querySelector('.invoices .invoice-header .actions');
    this.invoiceTableHeader = document.querySelector('.invoices .invoice-list .table-head');
    this.editInvoiceEl = '.edit-invoice-btn';
    this.deleteInvoiceEl = '.delete-invoice-btn';
    this.searchInputEl = this.invoiceActionsContainer.querySelector('.search-input');
    this.searchButtonEl = this.invoiceActionsContainer.querySelector('.search-button');
    this.selectAllEls = this.invoiceTableHeader.querySelectorAll('.invoice-checkbox-all');
    this.deleteAllEl = this.invoiceTableHeader.querySelector('.delete-all');

    // Setting up action menu toggle and events
    this.setupActionMenuToggle();
    this.addSelectAllEvent();
    this.addDeleteAllEvent();
    this.showInvoices();
    this.addEditInvoiceEvent();
    this.addDeleteInvoiceEvent();
    this.addSearchEvent();
    this.modal.init();
  }

  showInvoices() {
    // Retrieves and displays invoices
    const data = this.invoiceBusiness.getInvoices();
    this.addInvoiceToList(data);
  }

  setupActionMenuToggle() {
    // Toggles the action menu visibility
    this.invoiceList.addEventListener('click', (event) => {
      const dotsButton = event.target.closest('.dots');
      if (dotsButton) {
        this.invoiceList.querySelectorAll('.button-action').forEach((btn) => (btn.style.display = 'none'));
        const buttonAction = dotsButton.closest('.action').querySelector('.button-action');
        buttonAction.style.display = 'block';
      }
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.action')) {
        this.invoiceList.querySelectorAll('.button-action').forEach((btn) => (btn.style.display = 'none'));
      }
    });
  }

  addEditInvoiceEvent() {
    // Adds event listener for editing invoices
    this.invoiceList.addEventListener('click', (event) => {
      if (!event.target.closest(this.editInvoiceEl)) return;
      const tableItem = event.target.closest('.table-item');
      const id = tableItem.getAttribute('data-id');
      this.openEditModal(id);
      const buttonAction = tableItem.querySelector('.button-action');
      if (buttonAction) {
        buttonAction.style.display = 'none';
      }
    });
  }

  addDeleteInvoiceEvent() {
    // Adds event listener for deleting invoices
    this.invoiceList.addEventListener('click', (event) => {
      if (!event.target.closest(this.deleteInvoiceEl)) return;
      const tableItem = event.target.closest('.table-item');
      const id = tableItem.getAttribute('data-id');
      this.openDeleteModal(id);
      const buttonAction = tableItem.querySelector('.button-action');
      if (buttonAction) {
        buttonAction.style.display = 'none';
      }
    });
  }

  addSelectAllEvent() {
    // Adds event listener for select all checkboxes
    this.selectAllEls.forEach(selectAllEl => {
      selectAllEl.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const checkboxes = this.invoiceList.querySelectorAll('.invoice-checkbox');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;
        });
      });
    });
  }

  addDeleteAllEvent() {
    // Adds event listener for deleting all selected invoices
    this.deleteAllEl.addEventListener('click', () => {
      const selectedCheckboxes = this.invoiceList.querySelectorAll('.invoice-checkbox:checked');
      if (selectedCheckboxes.length === 0) {
        this.modal.openNotificationDelete();
        return;
      }
      this.modal.openDeleteAllInvoiceModal();
    });
  }

  addSearchEvent() {
    // Adds event listeners for search button and input field
    this.searchButtonEl.addEventListener('click', () => this.performSearch());
    this.searchInputEl.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.performSearch();
      }
      if (this.searchInputEl.value.trim() === '') {
        this.showInvoices();
      }
    });
  }
  
  performSearch() {
    // Executes the search and displays the filtered invoices
    const query = this.searchInputEl.value;
    const filteredInvoices = this.invoiceBusiness.searchInvoices(query);
    this.displaySearchInvoices(filteredInvoices);
  }
  
  displaySearchInvoices(filteredData = null) {
    // Displays search results or shows all invoices if no filtered data is provided
    const data = filteredData || this.invoiceBusiness.getInvoices();
    this.addInvoiceToList(data);
  }
  
  openDeleteAllModal() {
    // Opens the modal to delete all invoices
    this.modal.openDeleteAllInvoiceModal();
  }
  
  openDeleteModal(id) {
    // Opens the modal to delete a specific invoice by ID
    const data = this.invoiceBusiness.getInvoiceById(id);
    this.modal.openDeleteInvoiceModal(data);
  }
  
  openEditModal(id) {
    // Opens the modal to edit a specific invoice by ID
    const data = this.invoiceBusiness.getInvoiceById(id);
    this.modal.openEditInvoiceModal(data);
  }
  
  addInvoiceToList(data) {
    // Adds invoices to the list in the UI
    const template = Template.buildInvoices(data);
    this.invoiceList.innerHTML = template;
  }
}

export default InvoicePresentation;
  

