// src/BusinessLogic/processEditInvoice.js

import { invoiceService } from '../invoiceService.js';

export function processEditInvoice(updatedInvoiceData) {
    // Xử lý URL của ảnh
    const profileImgSrc = updatedInvoiceData.profileImgFile 
        ? URL.createObjectURL(updatedInvoiceData.profileImgFile) 
        : updatedInvoiceData.currentProfileImgSrc;

    // Cập nhật hóa đơn
    const updatedInvoice = {
        id: updatedInvoiceData.id,
        date: updatedInvoiceData.date,
        name: updatedInvoiceData.name,
        email: updatedInvoiceData.email,
        address: updatedInvoiceData.address,
        profileImgSrc: profileImgSrc,
        status: 'Pending'
    };

    invoiceService.updateInvoice(updatedInvoice);
}
