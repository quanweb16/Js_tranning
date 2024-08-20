function deleteSelectedInvoices() {
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

// Kiểm tra xem cửa sổ xác nhận xóa đã tồn tại chưa
function isDeleteConfirmationDisplayed() {
    return document.querySelector('.confirm-delete') !== null;
}

// Thu thập tất cả các thẻ được chọn
function gatherSelectedCards(checkboxes, selectedCards) {
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const card = checkbox.closest('.card');
            if (card) {
                selectedCards.push(card);
            }
        }
    });
}

// Tạo container và gán HTML cho cửa sổ xác nhận xóa
function createDeleteConfirmation(numberOfSelectedCards) {
    const confirmContainer = document.createElement('div');
    confirmContainer.classList.add('confirm-delete');

    confirmContainer.innerHTML = `
        <div class="confirm-delete-container">
            <h2>Are you sure you want to delete ${numberOfSelectedCards} selected invoices?</h2>
            <div class="confirm-buttons">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
            </div>
        </div>
    `;

    return confirmContainer;
}

// Thiết lập sự kiện cho nút Yes để xóa tất cả các thẻ được chọn
function setupDeleteSelectedYesButton(confirmContainer, selectedCards, cardContainer) {
    const yesButton = confirmContainer.querySelector('.confirm-yes');
    yesButton.addEventListener('click', function() {
        let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

        selectedCards.forEach(card => {
            const invoiceId = card.querySelector('.invoice').textContent;
            cardContainer.removeChild(card);

            // Xóa hóa đơn khỏi localStorage
            invoices = invoices.filter(invoice => invoice.invoiceId !== invoiceId);
        });

        localStorage.setItem('invoices', JSON.stringify(invoices));

        // Xóa cửa sổ xác nhận và xóa hiệu ứng mờ
        cardContainer.removeChild(confirmContainer);
        cardContainer.classList.remove('blurred');
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
