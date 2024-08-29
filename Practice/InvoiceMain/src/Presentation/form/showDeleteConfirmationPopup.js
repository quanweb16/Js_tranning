// src/Presentation/showDeleteConfirmationPopup.js

import { getDeleteConfirmationTemplate } from '../../Template/deleteConfirmationTemplate.js';

export function showDeleteConfirmationPopup(onConfirm) {
    const container = document.createElement('div');
    container.innerHTML = getDeleteConfirmationTemplate();
    container.classList.add('popup-overlay'); // Thêm lớp để định dạng popup
    document.body.appendChild(container);

    const confirmYesButton = container.querySelector('.confirm-yes');
    const confirmNoButton = container.querySelector('.confirm-no');

    if (confirmYesButton) {
        confirmYesButton.addEventListener('click', () => {
            onConfirm();  // Call the provided onConfirm function
            document.body.removeChild(container);  // Remove the popup
        });
    }

    if (confirmNoButton) {
        confirmNoButton.addEventListener('click', () => {
            document.body.removeChild(container);  // Close the popup without deleting
        });
    }

    // Close popup when clicking outside of it
    container.addEventListener('click', (event) => {
        if (event.target === container) {
            document.body.removeChild(container);
        }
    });
}
