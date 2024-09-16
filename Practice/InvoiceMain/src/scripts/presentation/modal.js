//file modal.js
import Template from './helpers/template.js';

class ModelPresentation {
    init() {
        // Initial elements
        this.modalEl = document.querySelector('.modal');
        this.modalTitleEl = modalEl.querySelector('.modal-title');
        this.modalContentEl = document.querySelector('.modal-content');
    }

    renderModal(title, content) {
        this.modalTitleEl.innerHTML = title;
        this.modalContentEl.innerHTML = content;
    }

    
    openCreateInvoiceModal(data){
        const title = 'Create New Invoice';
        const content = Template.buildInvoiceForm();
        this.renderModal(title, content);
            
        document.querySelector('.btn-invoice-create').addEventListener('click', () => {
            this.handleCreateInvoice();
        });
    
    
        document.querySelector('.close-popup').addEventListener('click', () => {
            this.closeModal();
        });

    }
    openEditInvoiceModal(data) {
        // Build template

        this.renderModal(title, content);

        // Event handler
        // close
    }
    handleCreateInvoice() {
        // Lấy dữ liệu từ form
        const invoiceId = document.querySelector('#invoice-id').value;
        const date = document.querySelector('#date').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const address = document.querySelector('#address').value;
    
        // Tạo đối tượng dữ liệu hóa đơn
        const invoiceData = {
            id: invoiceId,
            date: date,
            name: name,
            email: email,
            address: address
        };
    
        // Gửi dữ liệu đến lớp xử lý nghiệp vụ
        this.business.addInvoice(invoiceData);
    
        // Cập nhật giao diện người dùng (nếu cần)
        this.updateInvoiceList();
    
        // Đóng modal
        this.closeModal();
    }

    closeModal() {
        this.modalEl.style.display = 'none'; // Ẩn modal
    }
}

export default ModelPresentation;