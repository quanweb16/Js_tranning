import { createFormContainer } from '../template/formTemplate.js';
import { setupImageUpload, setupFormCloseEvent, setupFormSubmitEvent } from '../business-logic/formEvAdd.js';

export function showForm() {
    // Tạo phần container cho form
    const formContainer = createFormContainer();

    // Thêm form vào container và áp dụng hiệu ứng mờ
    const container = document.querySelector('.container');
    container.appendChild(formContainer);
    container.classList.add('blurred');

    // Xử lý hiển thị hình ảnh khi người dùng chọn file
    setupImageUpload(formContainer);

    // Đóng form khi người dùng click ra ngoài
    setupFormCloseEvent(formContainer, container);

    // Xử lý sự kiện submit form
    setupFormSubmitEvent(formContainer, container);
}
