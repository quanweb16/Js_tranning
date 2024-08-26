import{createDeleteConfirmation} from '../template/formTemplate.js';
import { isDeleteConfirmationDisplayed,gatherSelectedCards,setupDeleteSelectedYesButton,setupNoButtonEvent,setupCloseOnOutsideClick } from '../../business-logic/eventDeleteSelect.js';
export function deleteSelectedInvoices() {
    const checkboxes = document.querySelectorAll('.checkbox');
    const cardContainer = document.querySelector('.container');
    const selectedCards = [];

    // Kiểm tra xem cửa sổ xác nhận xóa đã tồn tại chưa
    if (isDeleteConfirmationDisplayed()) {
        return; // Nếu đã tồn tại, không tạo thêm
    }

    // Thu thập tất cả các thẻ được chọn
    gatherSelectedCards(checkboxes, selectedCards);

    // Nếu có ít nhất một thẻ được chọn, hiển thị xác nhận xóa
    if (selectedCards.length > 0) {
        const confirmContainer = createDeleteConfirmation(selectedCards.length);

        cardContainer.appendChild(confirmContainer);
        cardContainer.classList.add('blurred');

        // Thiết lập sự kiện cho nút Yes để xóa tất cả các thẻ được chọn
        setupDeleteSelectedYesButton(confirmContainer, selectedCards, cardContainer);

        // Thiết lập sự kiện cho nút No để đóng cửa sổ xác nhận
        setupNoButtonEvent(confirmContainer, cardContainer);

        // Thiết lập sự kiện để đóng cửa sổ xác nhận khi click ra ngoài
        setupCloseOnOutsideClick(confirmContainer, cardContainer);
    }
}
