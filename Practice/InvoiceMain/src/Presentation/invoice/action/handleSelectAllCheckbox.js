// src/Presentation/invoice/action/handleSelectAllCheckbox.js

export function setupSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('checkbox');
    selectAllCheckbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const checkboxes = document.querySelectorAll('.invoice-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });
}
