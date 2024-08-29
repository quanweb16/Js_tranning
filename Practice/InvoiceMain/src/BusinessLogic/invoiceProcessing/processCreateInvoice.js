// src/BusinessLogic/processCreateInvoice.js

import { invoiceService } from '../invoiceService.js';

export function processCreateInvoice(invoiceData) {
    // Xử lý URL của ảnh nếu có file ảnh được tải lên
    const profileImgSrc = invoiceData.profileImgFile ? URL.createObjectURL(invoiceData.profileImgFile) : '';

    // Tạo đối tượng hóa đơn
    const invoice = {
        id: invoiceData.id,
        date: invoiceData.date,
        name: invoiceData.name,
        email: invoiceData.email,
        address: invoiceData.address,
        profileImgSrc: profileImgSrc,
        status: 'Pending'
    };

    // Thêm hóa đơn vào dịch vụ
    invoiceService.addInvoice(invoice);
}
