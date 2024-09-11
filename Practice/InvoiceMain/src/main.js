import { InvoicePopupManager } from "./Presentation/formUi/showInvoicePopup.js";

// Khi trang đã được tải hoàn toàn
document.addEventListener('DOMContentLoaded', () => {
    // Thiết lập sự kiện cho nút "Add Invoice"
    document.querySelector('.addBtn').addEventListener('click', () => {
        InvoicePopupManager.showCreateInvoicePopup();
    });
    InvoicePopupManager.showInvoices();

    // Gán sự kiện click cho tất cả các nút "Edit"
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.dataset.invoiceId;
            InvoicePopupManager.showEditInvoicePopup(invoiceId);
        });
    });
});
