//file invoice.js
import Template from './helpers/template.js';
import ModelPresentation from './modal.js';

class InvoicePresentation {
    constructor(business) {
        this.business = business;
        this.modal = new ModelPresentation(this.business)
    }

    init() {
        // Initial elements
        this.invoiceList = document.querySelector('.invoices .invoice-list .table-list');
        this.editInvoiceEl = '.edit-btn';
        this.deleteInvoiceEl = '.delete-btn';
        this.addInvoiceEl = document.querySelector('.addBtn');

        // ... 

        this.showInvoices();
        this.addEditInvoiceEvent();
        this.addDeleteInvoiceEvent();
        this.addInvoiceEvent();
        this.modal.init();
    }

    showInvoices() {
        // Get data
        const data = this.business.getInvoices();

        // Get invoice list template
        const template = Template.buildInvoices(data);

        // Render invoice list
        this.invoiceList.innerHTML = template;
    }
    addInvoiceEvent(){
        this.addInvoiceEl.addEventListener('click',()=>{
            this.modal.openCreateInvoiceModal();
        });
    }

    addEditInvoiceEvent() {
        this.invoiceList.addEventListener('click', (event) => {
            // If not edit button
            if (!event.target.closest(this.editInvoiceEl)) return;

            // If edit button clicked, process edit event
            const id = event.target.closest('.table-item').getAttribute('data-id');

            // Open edit modal
            this.openEditModal(id);
        })
    }

    addDeleteInvoiceEvent() {
        this.invoiceList.addEventListener('click', (event) => {
            // If not delete button
            if (!event.target.closest(this.editInvoiceEl)) return;

            // If delete button clicked, process delete event
            // Open delete confirmation modal
        })
    }

    openEditModal(id) {
        const data = this.business.getInvoiceById(id);

        // Open modal
        this.modal.openEditInvoiceModal(data);
    }

    addInvoice(data) {
        // Get invoice template
        const template = Template.buildInvoiceItem(data);

        
    }
}

export default InvoicePresentation;