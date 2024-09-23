import Template from './helpers/template.js';
import ModelPresentation from './modal.js';

class InvoicePresentation {
    constructor(business) {
        this.business = business;
        this.modal = new ModelPresentation(this.business);
        
    }

    init() {
        // Initial elements
        this.invoiceList = document.querySelector('.invoices .invoice-list .table-list');
        this.editInvoiceEl = '.edit-btn';
        this.deleteInvoiceEl = '.delete-btn';
        this.selectAllEl = document.getElementById('checkbox'); 
        this.deleteAllEl = document.querySelector('.delete-all');
        this.searchInputEl = document.getElementById('search-input');
        this.searchButtonEl = document.querySelector('.search-button');
        
        this.setupActionMenuToggle();
        this.addSelectAllEvent();       
        this.addDeleteAllEvent();       
        this.showInvoices();
        this.addEditInvoiceEvent();
        this.addDeleteInvoiceEvent();
        this.addSearchEvent();
        this.modal.init();
        
    }  
    showInvoices() {
        const data = this.business.getInvoices();
        this.addInvoice(data);
    }


    setupActionMenuToggle() {
        this.invoiceList.addEventListener('click', (event) => {
            const dotsButton = event.target.closest('.dots');
            if (dotsButton) {
                // Đóng tất cả các menu trước khi mở một menu mới
                this.invoiceList.querySelectorAll('.button-action').forEach(btn => btn.style.display = 'none');
    
                // Mở menu hành động tương ứng
                const buttonAction = dotsButton.closest('.action').querySelector('.button-action');
                buttonAction.style.display = 'block'; 
            }
        });
        
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.action')) {
                this.invoiceList.querySelectorAll('.button-action').forEach(btn => btn.style.display = 'none');
            }
        });
    }
    addEditInvoiceEvent() {
        this.invoiceList.addEventListener('click', (event) => {
            if (!event.target.closest(this.editInvoiceEl)) return;
    
            const tableItem = event.target.closest('.table-item');
            const id = tableItem.getAttribute('data-id');
            
            this.openEditModal(id);
    
            // Tìm và ẩn action menu sau khi nhấn nút Edit
            const buttonAction = tableItem.querySelector('.button-action');
            if (buttonAction) {
                buttonAction.style.display = 'none';
            }
        });
    }

    addDeleteInvoiceEvent() {
        this.invoiceList.addEventListener('click', (event) => {
            if (!event.target.closest(this.deleteInvoiceEl)) return;
    
            const tableItem = event.target.closest('.table-item');
            const id = tableItem.getAttribute('data-id');
            
            this.openDeleteModal(id);
    
            // Tìm và ẩn action menu sau khi nhấn nút Delete
            const buttonAction = tableItem.querySelector('.button-action');
            if (buttonAction) {
                buttonAction.style.display = 'none';
            }
        });
    }

    addSelectAllEvent() {
        this.selectAllEl.addEventListener('change', (event) => {
            const isChecked = event.target.checked;
            const checkboxes = this.invoiceList.querySelectorAll('.invoice-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = isChecked);
        });
    }

    
    addDeleteAllEvent() {
        if (this.deleteAllEl) { 
            this.deleteAllEl.addEventListener('click', () => {
                const selectedCheckboxes = this.invoiceList.querySelectorAll('.invoice-checkbox:checked');
                if (selectedCheckboxes.length === 0) {
                    alert('Please select at least one invoice to delete.');
                    return; 
                }
                this.modal.openDeleteAllInvoiceModal(); 
            });
        }
    }
    
    addSearchEvent() {
        this.searchButtonEl.addEventListener('click', () => this.performSearch());
    
        this.searchInputEl.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.performSearch();
            }
   
            if (this.searchInputEl.value.trim() === '') {
                this.showInvoices(); 
            }
        });
    }
    
    performSearch() {
        const query = this.searchInputEl.value;
        console.log('Search Query:', query);
        
        const filteredInvoices = this.business.searchInvoices(query);
        console.log('Filtered Invoices:', filteredInvoices);
        
        this.displaySearchInvoices(filteredInvoices);  
    }
    displaySearchInvoices(filteredData = null) {
        const data = filteredData || this.business.getInvoices(); 
        this.addInvoice(data);
    }
    
    openDeleteAllModal(){
        this.modal.openDeleteAllInvoiceModal();
    }
    openDeleteModal(id) {
        const data = this.business.getInvoiceById(id);
        this.modal.openDeleteInvoiceModal(data);
    }

    openEditModal(id) {
        const data = this.business.getInvoiceById(id);
        this.modal.openEditInvoiceModal(data);
    }

    addInvoice(data) {
        const template = Template.buildInvoices(data);   
        this.invoiceList.innerHTML = template;
    }
}

export default InvoicePresentation;
