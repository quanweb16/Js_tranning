import { getDeleteConfirmationTemplate } from '../../../Template/deleteConfirmationTemplate.js';
import { handleDeleteConfirmation } from '../FormEvent/deleteConfirmationHandler.js';

export function showDeleteConfirmationPopup(onConfirm) {
    const container = document.createElement('div');
    container.innerHTML = getDeleteConfirmationTemplate();
    container.classList.add('popup-overlay');
    document.body.appendChild(container);

    handleDeleteConfirmation(container, onConfirm);
}
