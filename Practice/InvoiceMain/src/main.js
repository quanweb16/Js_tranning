import { showForm } from './presentation/showForm.js';
import { showEditForm } from './presentation/showEditForm.js';
import { showDeleteConfirm } from './presentation/showDeleteConfirm.js';
import { InvoiceService } from './application/invoiceService.js';
import invoiceItemTemplate from './template/invoiceItemTemplate.js';

// Hiển thị form tạo hóa đơn khi nhấn nút "Add New"
const addBtn = document.querySelector('.addBtn');
if (addBtn) {
    addBtn.addEventListener('click', showForm);
}

// Xử lý sự kiện chọn/deselect tất cả các checkbox khi checkbox ở header được chọn
const selectAllCheckbox = document.querySelector('.select-all-checkbox');
if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (event) => {
        const checked = event.target.checked;
        document.querySelectorAll('.invoice-checkbox').forEach(checkbox => {
            checkbox.checked = checked;
        });
    });
}

// Xử lý sự kiện chọn/deselect khi nhấn checkbox trong danh sách hóa đơn
const container = document.querySelector('.container');
if (container) {
    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('invoice-checkbox')) {
            const allCheckboxes = document.querySelectorAll('.invoice-checkbox');
            const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
            const selectAllCheckbox = document.querySelector('.select-all-checkbox');
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
            }
        }
    });
}

// Hàm để render danh sách hóa đơn
function renderInvoices() {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = '';
        const invoices = InvoiceService.getAllInvoices();
        invoices.forEach(invoice => {
            const invoiceItem = invoiceItemTemplate(invoice);
            container.innerHTML += invoiceItem;
        });

        // Thêm sự kiện cho các nút chỉnh sửa và xóa
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const invoiceId = button.closest('.invoice-item').querySelector('.invoice').textContent;
                const invoice = InvoiceService.getAllInvoices().find(inv => inv.id === invoiceId);
                if (invoice) {
                    showEditForm(invoice);
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const invoiceId = button.closest('.invoice-item').querySelector('.invoice').textContent;
                showDeleteConfirm(invoiceId);
            });
        });
    }
}

// Hiển thị danh sách hóa đơn khi trang được tải
document.addEventListener('DOMContentLoaded', renderInvoices);