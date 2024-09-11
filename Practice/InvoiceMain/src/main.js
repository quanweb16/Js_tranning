import { InvoicePopupManager } from "./Presentation/formUi/showInvoicePopup.js";

// Khi trang đã được tải hoàn toàn
document.addEventListener('DOMContentLoaded', () => {
    // Thiết lập sự kiện cho nút "Add Invoice"
    document.querySelector('.addBtn').addEventListener('click', () => {
        InvoicePopupManager.showCreateInvoicePopup();
    });
    InvoicePopupManager.showInvoices();
    document.querySelector('.edit-btn').addEventListener('click',()=>{
        InvoicePopupManager.showEditInvoicePopup();
    });
});