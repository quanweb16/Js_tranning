import { createInvoicePopup } from '../Template/createInvoicePopup.js';
import { editInvoicePopup } from '../Template/editInvoicePopup.js';
import { confirmDeletePopup } from '../Template/confirmDeletePopup.js';
import { addInvoice, updateInvoice, deleteInvoice, getInvoices } from '../BusinessLogic/invoiceService.js';
import { saveInvoices, getInvoicesFromStorage } from '../DataAsset/localStorageManager.js';

document.addEventListener('DOMContentLoaded', () => {
    renderInvoiceList();
});

document.querySelector('.addBtn').addEventListener('click', () => {
    const popup = createInvoicePopup(handleCreateInvoice);
    document.body.appendChild(popup);
});

function handleCreateInvoice(invoiceData) {
    if (!validateInvoiceData(invoiceData)) return; // Xác thực dữ liệu
    addInvoice(invoiceData); // Thêm hóa đơn (Business Logic Layer)
    saveInvoices(getInvoices()); // Lưu dữ liệu vào localStorage (Data Access Layer)
    renderInvoiceList(); // Cập nhật danh sách hóa đơn
}

function handleEditInvoice(updatedInvoice) {
    if (!validateInvoiceData(updatedInvoice)) return; // Xác thực dữ liệu
    updateInvoice(updatedInvoice); // Cập nhật hóa đơn (Business Logic Layer)
    saveInvoices(getInvoices()); // Lưu dữ liệu vào localStorage (Data Access Layer)
    renderInvoiceList(); // Cập nhật danh sách hóa đơn
}

function handleDeleteInvoice(invoiceId) {
    deleteInvoice(invoiceId); // Xóa hóa đơn (Business Logic Layer)
    saveInvoices(getInvoices()); // Cập nhật dữ liệu trong localStorage (Data Access Layer)
    renderInvoiceList(); // Cập nhật danh sách hóa đơn
}

function renderInvoiceList() {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Xóa các hóa đơn cũ trước khi hiển thị mới
    const invoices = getInvoices(); // Lấy danh sách hóa đơn từ Business Logic Layer

    invoices.forEach(invoice => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');
        const newInfo = document.createElement('div');
        newInfo.classList.add('info');
        newInfo.innerHTML = `
            <input type="checkbox" class="checkbox">
            <div class="invoice">${invoice.id}</div>
            <div class="profile-pic">
                <img src="${invoice.profileImgSrc}" alt="Profile Picture">
                <div class="name">${invoice.name}</div>
            </div>
            <div class="email">${invoice.email}</div>
            <div class="date"><i class="fas fa-calendar-alt"></i> ${invoice.date}</div>
            <div class="status-1">${invoice.status}</div>
            <div class="star">
                <button class="special"><i class="fas fa-star"></i></button>
            </div>
            <div class="menuu">
                <div class="dots">•••</div>
                <div class="menu-itemss">
                    <div class="menu-itemm edit-btn">Edit</div>
                    <div class="menu-itemm delete-btn">Delete</div>
                </div>
            </div>
        `;
        cardContainer.appendChild(newInfo);
        container.appendChild(cardContainer);

        newInfo.querySelector('.edit-btn').addEventListener('click', () => {
            const popup = editInvoicePopup(invoice, handleEditInvoice);
            document.body.appendChild(popup);
        });

        newInfo.querySelector('.delete-btn').addEventListener('click', () => {
            const popup = confirmDeletePopup(invoice.id, handleDeleteInvoice);
            document.body.appendChild(popup);
        });
    });
}

function validateInvoiceData(invoiceData) {
    if (!invoiceData.name || invoiceData.name.trim() === '') {
        alert('Name is required.');
        return false;
    }
    if (!invoiceData.email || !/^\S+@\S+\.\S+$/.test(invoiceData.email)) {
        alert('A valid email is required.');
        return false;
    }
    // Thêm các kiểm tra khác nếu cần
    return true;
}
