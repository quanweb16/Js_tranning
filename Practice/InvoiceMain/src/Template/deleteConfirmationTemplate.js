
export function getDeleteConfirmationTemplate() {
    
    return `
         <div class="confirm-delete-container">
            <h2>Are you sure you want to delete this  invoice?</h2>
            <div class="confirm-buttons">
                <button class="confirm-yes">Yes</button>
                <button class="confirm-no">No</button>
            </div>
        </div>
    `;
}
