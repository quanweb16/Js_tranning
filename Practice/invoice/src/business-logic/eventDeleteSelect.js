export function isDeleteConfirmationDisplayed() {
    return document.querySelector('.confirm-delete') !== null;
}

// Thu thập tất cả các thẻ được chọn
export function gatherSelectedCards(checkboxes, selectedCards) {
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

// Thiết lập sự kiện cho nút Yes để xóa tất cả các thẻ được chọn
export function setupDeleteSelectedYesButton(confirmContainer, selectedCards, cardContainer) {
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
