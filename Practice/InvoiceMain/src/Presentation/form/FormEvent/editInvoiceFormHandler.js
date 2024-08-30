import { invoiceService } from '../../../BusinessLogic/invoiceService.js';

export function handleEditInvoiceSubmit(form, originalInvoice, container) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedInvoice = {
            id: formData.get('invoice-id'),
            date: formData.get('date'),
            name: formData.get('name'),
            email: formData.get('email'),
            address: formData.get('address'),
            status:'Pending',
            profileImgSrc: formData.get('file-upload-edit') ? URL.createObjectURL(formData.get('file-upload-edit')) : originalInvoice.profileImgSrc,
        };

        invoiceService.updateInvoice(updatedInvoice); // Cập nhật hóa đơn trong dịch vụ
        document.body.removeChild(container);
        window.location.reload(); 
    });
}
