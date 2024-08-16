function deleteSelectedInvoices() {
    const checkboxes = document.querySelectorAll('.checkbox');
    const cardContainer = document.querySelector('.container');
    const selectedCards = [];

    // Kiểm tra xem cửa sổ xác nhận xóa đã tồn tại chưa
    if (document.querySelector('.confirm-delete')) {
        return; // Nếu đã tồn tại, không tạo thêm
    }

    // Thu thập tất cả các thẻ được chọn
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const card = checkbox.closest('.card');
            if (card) {
                selectedCards.push(card);
            }
        }
    });

    // Nếu có ít nhất một thẻ được chọn, hiển thị xác nhận xóa
    if (selectedCards.length > 0) {
        const confirmContainer = document.createElement('div');
        confirmContainer.classList.add('confirm-delete');

        confirmContainer.innerHTML = `
            <div class="confirm-delete-container">
                <h2>Are you sure you want to delete ${selectedCards.length} selected invoices?</h2>
                <div class="confirm-buttons">
                    <button class="confirm-yes">Yes</button>
                    <button class="confirm-no">No</button>
                </div>
            </div>
        `;

        cardContainer.appendChild(confirmContainer);
        cardContainer.classList.add('blurred');

        // Xóa tất cả các thẻ được chọn khi nhấn nút Yes
        const yesButton = confirmContainer.querySelector('.confirm-yes');
        yesButton.addEventListener('click', function() {
            const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
            
            selectedCards.forEach(card => {
                const invoiceId = card.querySelector('.invoice').textContent;
                cardContainer.removeChild(card);

                // Xóa hóa đơn khỏi localStorage
                const updatedInvoices = invoices.filter(invoice => invoice.invoiceId !== invoiceId);
                localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
            });
            
            cardContainer.removeChild(confirmContainer);
            cardContainer.classList.remove('blurred');
        });

        // Đóng xác nhận khi nhấn nút No
        const noButton = confirmContainer.querySelector('.confirm-no');
        noButton.addEventListener('click', function() {
            cardContainer.removeChild(confirmContainer);
            cardContainer.classList.remove('blurred');
        });

        // Đóng xác nhận khi click ra ngoài
        confirmContainer.addEventListener('click', function(event) {
            if (event.target === confirmContainer) {
                cardContainer.removeChild(confirmContainer);
                cardContainer.classList.remove('blurred');
            }
        });
    }
}