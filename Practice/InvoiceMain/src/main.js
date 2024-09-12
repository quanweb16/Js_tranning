import { InvoicePopupManager } from "./Presentation/formUi/showInvoicePopup.js";


document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.addBtn').addEventListener('click', () => {
        InvoicePopupManager.showCreateInvoicePopup();
    });
    InvoicePopupManager.showInvoices();

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.dataset.invoiceId;
            InvoicePopupManager.showEditInvoicePopup(invoiceId);
        });
    });
});

