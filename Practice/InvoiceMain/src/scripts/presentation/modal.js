// file modal.js
import Template from './helpers/template.js';

class ModalPresentation {
    constructor(business) {
        this.business = business;  
    }
    init() {
        this.addInvoiceEl = document.querySelector('.addBtn');
        this.modalEl = document.querySelector('.content-Form'); 
        this.modalTitleEl = this.modalEl.querySelector('.create-invoice-container h2'); 
        this.modalContentEl = this.modalEl.querySelector('.popup-form'); 
        this.modalTitleElEdit = this.modalEl.querySelector('.Edit-invoice-container h2'); 
        this.modalContentElEdit = this.modalEl.querySelector('.popup-form-edit'); 
        this.modalTitleElDelete = this.modalEl.querySelector('.confirm-delete-container h2'); 
        this.modalContentElDelete = this.modalEl.querySelector('.confirm-buttons'); 
        this.modalTitleElDeleteAll = this.modalEl.querySelector('.confirm-deleteAll-container h2'); 
        this.modalContentElDeleteAll = this.modalEl.querySelector('.confirm-select-buttons'); 
        this.addInvoiceEvent(); 
        
    }
    renderModalAdd() { 
        this.modalEl.classList.add('overlay');
        this.modalEl.innerHTML += Template.buildInvoiceForm();  
    }
    renderModalEdit(){
        this.modalEl.classList.add('overlay');
        this.modalEl.innerHTML += Template.buildInvoiceFormEdit();
    }
    renderModalDelete(){
        this.modalEl.classList.add('overlay');
        this.modalEl.innerHTML+= Template.buildDeletePopup();
    }
    renderModalDeleteAll(){
        this.modalEl.classList.add('overlay');
        this.modalEl.innerHTML+= Template.buildDeleteAllPopup();
    } 
    addInvoiceEvent() {
        this.addInvoiceEl.addEventListener('click', () => {
            this.openCreateInvoiceModal();
        });
    }
    openDeleteInvoiceModal(data) {      
        this.renderModalDelete();
        document.querySelector('.confirm-yes').addEventListener('click', (event) => {
            event.preventDefault();
            this.handleDeleteInvoice(data.id);
        });
        document.querySelector('.confirm-no').addEventListener('click', () => {
            this.closeModal();
        });
    }
    openDeleteAllInvoiceModal(data) {      
        this.renderModalDeleteAll();
        document.querySelector('.confirm-yes-all').addEventListener('click', (event) => {
            event.preventDefault();
            this.handleDeleteAllInvoices();
        });
        
        document.querySelector('.confirm-no-all').addEventListener('click', () => {
            this.closeModal();
        });
    }

    openCreateInvoiceModal() {        
        this.renderModalAdd();
        document.querySelector('.btn-invoice-create').addEventListener('click', (event) => {
            event.preventDefault(); 
            const result = this.handleCreateInvoice();
            if (result) {
                alert('Create successfully');
                this.closeModal(); 
                location.reload(); 
            }
        });
        document.querySelector('.close-popup').addEventListener('click', () => {
            this.closeModal();
        });
    }
    openEditInvoiceModal(data) {
        this.renderModalEdit(); 
        document.querySelector('#invoice-id').value = data.id;
        document.querySelector('#date').value = data.date;
        document.querySelector('#name').value = data.name;
        document.querySelector('#email').value = data.email;
        document.querySelector('#address').value = data.address;
    
        document.querySelector('.btn-invoice-edit').addEventListener('click', (event) => {
            event.preventDefault();          
            const result = this.handleEditInvoices();  
            console.log('Edit Result:', result);   
            if (result) {
                alert('Edit successfully ');
                this.closeModal();
                location.reload(); 
            }
        });  
        document.querySelector('.close-popup').addEventListener('click', () => {
            this.closeModal();
            location.reload(); 
        });
    }
       
    handleCreateInvoice() {
        const id = document.querySelector('#invoice-id').value;
        const date = document.querySelector('#date').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const address = document.querySelector('#address').value;
        const profileImgSrc = document.getElementById('profile-img-preview').src;
        const invoiceData = {
            id,
            date,
            name,
            email,
            status: 'Pending',
            address,
            profileImgSrc
        };       
    
        const result = this.business.addInvoice(invoiceData); 
        return result; 
    }
    handleEditInvoices() {
        const id = document.querySelector('#invoice-id').value; 
        const data = this.business.getInvoiceById(id);
    
        const date = document.querySelector('#date').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const address = document.querySelector('#address').value;
        const profileImgSrc = document.getElementById('profile-img-preview').src;
    
        const updatedInvoice = {
            ...data,
            date,
            name,
            email,
            address,
            profileImgSrc
        };     
        const result = this.business.editInvoice(id, updatedInvoice);     
        return result; 
    }
    handleDeleteInvoice(id) {
        try {
            this.business.deleteInvoice(id);  
            this.closeModal();
            location.reload(); 
        } catch (error) {
            console.error('Error deleting invoice:', error.message);
        }
    }
    handleDeleteAllInvoices(id) {
        const selectedCheckboxes = document.querySelectorAll('.invoice-checkbox:checked');
        selectedCheckboxes.forEach(checkbox => {
            const id = checkbox.closest('.table-item').getAttribute('data-id');
            this.business.deleteInvoice(id);
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
