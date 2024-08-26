import{createConfirmContainer} from '../business-logic/formEventDeleteConfrim.js';


export function showDeleteConfirm(cardElement) {
    // Tạo container cho cửa sổ xác nhận
    const confirmContainer = createConfirmContainer();

    // Thêm cửa sổ xác nhận vào container và áp dụng hiệu ứng mờ
    const container = document.querySelector('.container');
    container.appendChild(confirmContainer);
    container.classList.add('blurred');

    const invoiceId = cardElement.querySelector('.invoice').textContent;

    // Thiết lập sự kiện cho nút Yes để xóa hóa đơn
    setupYesButtonEvent(confirmContainer, cardElement, invoiceId, container);

    // Thiết lập sự kiện cho nút No để đóng cửa sổ xác nhận
    setupNoButtonEvent(confirmContainer, container);

    // Thiết lập sự kiện để đóng cửa sổ xác nhận khi click ra ngoài
    setupCloseOnOutsideClick(confirmContainer, container);
}