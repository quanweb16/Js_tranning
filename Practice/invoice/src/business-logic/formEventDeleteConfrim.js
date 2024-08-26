export function setupYesButtonEvent(confirmContainer, cardElement, invoiceId, container) {
    const yesButton = confirmContainer.querySelector('.confirm-yes');
    yesButton.addEventListener('click', function() {
        // Xóa hóa đơn khỏi DOM
        container.removeChild(cardElement);

        // Lấy dữ liệu hóa đơn từ localStorage
        let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

        // Xóa hóa đơn với invoiceId tương ứng
        invoices = invoices.filter(invoice => invoice.invoiceId !== invoiceId);

        // Cập nhật lại localStorage
        localStorage.setItem('invoices', JSON.stringify(invoices));

        // Xóa cửa sổ xác nhận
        container.removeChild(confirmContainer);
        container.classList.remove('blurred');
    });
}

// Thiết lập sự kiện cho nút No để đóng cửa sổ xác nhận
export function setupNoButtonEvent(confirmContainer, container) {
    const noButton = confirmContainer.querySelector('.confirm-no');
    noButton.addEventListener('click', function() {
        container.removeChild(confirmContainer);
        container.classList.remove('blurred');
    });
}

// Thiết lập sự kiện để đóng cửa sổ xác nhận khi click ra ngoài
export function setupCloseOnOutsideClick(confirmContainer, container) {
    confirmContainer.addEventListener('click', function(event) {
        if (event.target === confirmContainer) {
            container.removeChild(confirmContainer);
            container.classList.remove('blurred');
        }
    });
}
