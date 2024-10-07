// file modal.js
import Template from '../helpers/template.js';

class ModalPresentation {
  constructor(invoiceBusiness) {
    this.invoiceBusiness = invoiceBusiness;
  }

  init() {
    this.invoiceList = document.querySelector('.invoices .invoice-list .table-list-invoice');
    this.invoiceActionsContainer = document.querySelector('.invoices .invoice-header .actions');
    this.contentForm = document.querySelector('.main-content .modal-form');
    this.addInvoiceEl = this.invoiceActionsContainer.querySelector('.add-invoice-btn');
    this.modalEl = this.contentForm.querySelector('.modal-invoice-content');
    this.addInvoiceEvent();
  }

  renderNotificationEdit() {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += Template.notificationEdit();
  }

  renderNotificationCreate() {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += Template.notificationCreate();
  }

  renderNotification() {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += Template.notificationPopup();
  }

  renderModalAdd() {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += Template.buildInvoiceForm();
  }

  renderModalEdit() {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += Template.buildInvoiceFormEdit();
  }

  renderModalDelete() {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += Template.buildDeletePopup();
  }

  renderModalDeleteAll() {
    this.modalEl.classList.add('overlay');
    this.modalEl.innerHTML += Template.buildDeleteAllPopup();
  }

  addInvoiceEvent() {
    this.addInvoiceEl.addEventListener('click', () => {
      this.openCreateInvoiceModal();
    });
  }

  openDeleteInvoiceModal(data) {
    this.renderModalDelete();
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
    this.modalEl.querySelector('.confirm-yes').addEventListener('click', () => {
      this.closeModal();
    });
  }

  openNotificationCreate() {
    this.renderNotificationCreate();
    this.modalEl.querySelector('.confirm-ok-success').addEventListener('click', () => {
        this.closeModal();
        location.reload();
      });
  }

  openNotificationEdit() {
    this.renderNotificationEdit();
    this.modalEl.querySelector('.confirm-edit-success').addEventListener('click', () => {
        this.closeModal();
        location.reload();
      });
  }

  openCreateInvoiceModal() {
    this.renderModalAdd();
    const id = Date.now();
    this.modalEl.querySelector('.invoice-id').textContent = id;
    this.modalEl.querySelector('.btn-invoice-create').addEventListener('click', (event) => {
        event.preventDefault();
        const result = this.handleCreateInvoice();
        if (result) {
          this.openNotificationCreate();
        }
      });
    this.modalEl.querySelector('.close-popup').addEventListener('click', () => {
      this.closeModal();
    });
  }

  openEditInvoiceModal(data) {
    this.renderModalEdit();
    this.modalEl.querySelector('.invoice-id-edit').textContent = data.id;
    this.modalEl.querySelector('.invoice-date').value = data.date;
    this.modalEl.querySelector('.invoice-first-name').value = data.firstName;
    this.modalEl.querySelector('.invoice-last-name').value = data.lastName;
    this.modalEl.querySelector('.invoice-email').value = data.email;
    this.modalEl.querySelector('.invoice-city').value = data.city;
    this.modalEl.querySelector('.invoice-region').value = data.region;
    this.modalEl.querySelector('.btn-invoice-edit').addEventListener('click', (event) => {
        event.preventDefault();
        const result = this.handleEditInvoices();
        if (result) {
          this.openNotificationEdit();
        }
      });
    this.modalEl.querySelector('.close-popup-edit').addEventListener('click', () => {
        this.closeModal();
      });
  }

  handleCreateInvoice() {
    const id = this.modalEl.querySelector('.invoice-id').textContent;
    const date = this.modalEl.querySelector('.invoice-date').value;
    const firstName = this.modalEl.querySelector('.invoice-first-name').value;
    const lastName = this.modalEl.querySelector('.invoice-last-name').value;
    const email = this.modalEl.querySelector('.invoice-email').value;
    const city = this.modalEl.querySelector('.invoice-city').value;
    const region = this.modalEl.querySelector('.invoice-region').value;
    const invoiceData = {
      id,
      date,
      firstName,
      lastName,
      email,
      city,
      region,
    };

    const result = this.invoiceBusiness.addInvoice(invoiceData);
    return result;
  }

  handleEditInvoices() {
    const id = this.modalEl.querySelector('.invoice-id-edit').textContent;
    const date = this.modalEl.querySelector('.invoice-date').value;
    const firstName = this.modalEl.querySelector('.invoice-first-name').value;
    const lastName = this.modalEl.querySelector('.invoice-last-name').value;
    const email = this.modalEl.querySelector('.invoice-email').value;
    const city = this.modalEl.querySelector('.invoice-city').value;
    const region = this.modalEl.querySelector('.invoice-region').value;
    const data = this.invoiceBusiness.getInvoiceById(id);
    const updatedInvoice = {
      ...data,
      date,
      firstName,
      lastName,
      email,
      city,
      region,
    };
    const result = this.invoiceBusiness.editInvoice(id, updatedInvoice);
    return result;
  }

  handleDeleteInvoice(id) {
      this.invoiceBusiness.deleteInvoice(id);
      this.closeModal();
      location.reload();
  }

  handleDeleteAllInvoices() {
    const selectedCheckboxes = this.invoiceList.querySelectorAll('.invoice-checkbox:checked');
    selectedCheckboxes.forEach((checkbox) => {
      const id = checkbox.closest('.table-item').getAttribute('data-id');
      this.invoiceBusiness.deleteInvoice(id);
    });
    this.closeModal();
    location.reload();
  }

  closeModal() {
    this.modalEl.innerHTML = '';
    this.modalEl.classList.remove('overlay');
  }
}

export default ModalPresentation;

