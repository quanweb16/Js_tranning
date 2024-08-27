export function confirmDeletePopup(numberOfSelectedCards) {
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
