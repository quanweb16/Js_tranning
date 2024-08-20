function showDeleteConfirm(cardElement) {
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

// Tạo container và gán HTML cho cửa sổ xác nhận xóa
function createConfirmContainer() {
    const confirmContainer = document.createElement('div');
    confirmContainer.classList.add('confirm-delete');

    confirmContainer.innerHTML = `
        <div class="confirm-delete-container">
            <h2>Are you sure you want to delete this invoice?</h2>
            <div class="confirm-buttons">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
            </div>
        </div>
    `;

    return confirmContainer;
}

// Thiết lập sự kiện cho nút Yes để xóa hóa đơn
function setupYesButtonEvent(confirmContainer, cardElement, invoiceId, container) {
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
function setupNoButtonEvent(confirmContainer, container) {
    const noButton = confirmContainer.querySelector('.confirm-no');
    noButton.addEventListener('click', function() {
        container.removeChild(confirmContainer);
        container.classList.remove('blurred');
    });
}

// Thiết lập sự kiện để đóng cửa sổ xác nhận khi click ra ngoài
function setupCloseOnOutsideClick(confirmContainer, container) {
    confirmContainer.addEventListener('click', function(event) {
        if (event.target === confirmContainer) {
            container.removeChild(confirmContainer);
            container.classList.remove('blurred');
        }
    });
}
