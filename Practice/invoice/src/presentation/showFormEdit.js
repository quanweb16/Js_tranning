import {createEditFormContainer} from'../template/formTemplate.js';
import { setupFormCloseEvent,setupImageUploadEdit,setupFormSubmitEventEdit,updateCardElement,updateLocalStorageInvoice } from '../business-logic/formEventEdit';

function showEditForm(cardElement, invoiceId, date, name, email, address, profileImgSrc) {
    // Tạo container cho form edit
    const formEdit = createEditFormContainer(invoiceId, date, name, email, address, profileImgSrc);

    // Thêm form vào container và áp dụng hiệu ứng mờ
    const container = document.querySelector('.container');
    container.appendChild(formEdit);
    container.classList.add('blurred');

    // Đóng form khi click ra ngoài
    setupFormCloseEvent(formEdit, container);

    // Hiển thị hình ảnh khi người dùng chọn file mới
    setupImageUploadEdit(formEdit);

    // Xử lý sự kiện submit form
    setupFormSubmitEventEdit(formEdit, cardElement, invoiceId, container);
}