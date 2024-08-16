function showDeleteConfirm(cardElement) {
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

    const container = document.querySelector('.container');
    container.appendChild(confirmContainer);
    container.classList.add('blurred');

    const invoiceId = cardElement.querySelector('.invoice').textContent;

    // Xóa hóa đơn khỏi localStorage khi nhấn nút Yes
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

    // Đóng xác nhận khi nhấn nút No
    const noButton = confirmContainer.querySelector('.confirm-no');
    noButton.addEventListener('click', function() {
        container.removeChild(confirmContainer);
        container.classList.remove('blurred');
    });

    // Đóng xác nhận khi click ra ngoài
    confirmContainer.addEventListener('click', function(event) {
        if (event.target === confirmContainer) {
            container.removeChild(confirmContainer);
            container.classList.remove('blurred');
        }
    });
}