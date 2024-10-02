// file modal.js
import Template from "./helpers/template/template.js";

class ModalPresentation {
  constructor(invoiceBusiness) {
    this.invoiceBusiness = invoiceBusiness;
  }
  init() {
    this.addInvoiceEl = document.querySelector(".add-invoice-btn");
    this.modalEl = document.querySelector(".content-form");
    this.addInvoiceEvent();
  }

  renderNotificationEdit() {
    this.modalEl.classList.add("overlay");
    this.modalEl.innerHTML += Template.notificationEdit();
  }

  renderNotificationCreate() {
    this.modalEl.classList.add("overlay");
    this.modalEl.innerHTML += Template.notificationCreate();
  }

  renderNotification() {
    this.modalEl.classList.add("overlay");
    this.modalEl.innerHTML += Template.notificationPopup();
  }

  renderModalAdd() {
    this.modalEl.classList.add("overlay");
    this.modalEl.innerHTML += Template.buildInvoiceForm();
  }

  renderModalEdit() {
    this.modalEl.classList.add("overlay");
    this.modalEl.innerHTML += Template.buildInvoiceFormEdit();
  }

  renderModalDelete() {
    this.modalEl.classList.add("overlay");
    this.modalEl.innerHTML += Template.buildDeletePopup();
  }

  renderModalDeleteAll() {
    this.modalEl.classList.add("overlay");
    this.modalEl.innerHTML += Template.buildDeleteAllPopup();
  }

  addInvoiceEvent() {
    this.addInvoiceEl.addEventListener("click", () => {
      this.openCreateInvoiceModal();
    });
  }

  openDeleteInvoiceModal(data) {
    this.renderModalDelete();
    document
      .querySelector(".confirm-yes")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.handleDeleteInvoice(data.id);
      });
    document.querySelector(".confirm-no").addEventListener("click", () => {
      this.closeModal();
    });
  }

  openDeleteAllInvoiceModal(data) {
    this.renderModalDeleteAll();
    document
      .querySelector(".confirm-yes-all")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.handleDeleteAllInvoices();
      });
    document.querySelector(".confirm-no-all").addEventListener("click", () => {
      this.closeModal();
    });
  }

  openNotificationDelete() {
    this.renderNotification();
    document.querySelector(".confirm-yes").addEventListener("click", () => {
      this.closeModal();
    });
  }

  openNotificationCreate() {
    this.renderNotificationCreate();
    document
      .querySelector(".confirm-ok-success")
      .addEventListener("click", () => {
        this.closeModal();
        location.reload();
      });
  }

  openNotificationEdit() {
    this.renderNotificationEdit();
    document
      .querySelector(".confirm-edit-success")
      .addEventListener("click", () => {
        this.closeModal();
        location.reload();
      });
  }

  openCreateInvoiceModal() {
    this.renderModalAdd();
    const id = Date.now();
    document.querySelector("#invoice-id").textContent = id;
    document
      .querySelector(".btn-invoice-create")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const result = this.handleCreateInvoice();
        if (result) {
          this.openNotificationCreate();
        }
      });
    document.querySelector(".close-popup").addEventListener("click", () => {
      this.closeModal();
    });
  }

  openEditInvoiceModal(data) {
    this.renderModalEdit();
    console.log("Data for editing:", data);
    document.querySelector("#invoice-id").textContent = data.id;
    document.querySelector("#date").value = data.date;
    document.querySelector("#first-name").value = data.firstName;
    document.querySelector("#last-name").value = data.lastName;
    document.querySelector("#email").value = data.email;
    document.querySelector("#city").value = data.city;
    document.querySelector("#region").value = data.region;
    document
      .querySelector(".btn-invoice-edit")
      .addEventListener("click", (event) => {
        event.preventDefault();
        const result = this.handleEditInvoices();
        console.log("Edit Result:", result);
        if (result) {
          this.openNotificationEdit();
        }
      });
    document
      .querySelector(".close-popup-edit")
      .addEventListener("click", () => {
        this.closeModal();
      });
  }

  handleCreateInvoice() {
    const id = document.querySelector("#invoice-id").textContent;
    const date = document.querySelector("#date").value;
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const city = document.querySelector("#city").value;
    const region = document.querySelector("#region").value;
    const invoiceData = {
      id,
      date,
      firstName,
      lastName,
      email,
      status: "Pending",
      city,
      region,
    };

    const result = this.invoiceBusiness.addInvoice(invoiceData);
    return result;
  }

  handleEditInvoices() {
    const id = document.querySelector("#invoice-id").textContent;
    const date = document.querySelector("#date").value;
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const city = document.querySelector("#city").value;
    const region = document.querySelector("#region").value;
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
    try {
      this.invoiceBusiness.deleteInvoice(id);
      this.closeModal();
      location.reload();
    } catch (error) {
      console.error("Error deleting invoice:", error.message);
    }
  }

  handleDeleteAllInvoices(id) {
    const selectedCheckboxes = document.querySelectorAll(
      ".invoice-checkbox:checked"
    );
    selectedCheckboxes.forEach((checkbox) => {
      const id = checkbox.closest(".table-item").getAttribute("data-id");
      this.invoiceBusiness.deleteInvoice(id);
    });
    this.closeModal();
    location.reload();
  }

  closeModal() {
    this.modalEl.innerHTML = "";
    this.modalEl.classList.remove("overlay");
  }
}

export default ModalPresentation;
