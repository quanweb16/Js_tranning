export function handleDeleteConfirmation(container, onConfirm) {
    const confirmYesButton = container.querySelector('.confirm-yes');
    const confirmNoButton = container.querySelector('.confirm-no');

    if (confirmYesButton) {
        confirmYesButton.addEventListener('click', () => {
            onConfirm();  // Gọi hàm onConfirm được truyền vào
            document.body.removeChild(container);  // Xóa popup
        });
    }

    if (confirmNoButton) {
        confirmNoButton.addEventListener('click', () => {
            document.body.removeChild(container);  // Đóng popup mà không xóa
        });
    }

    // Đóng popup khi nhấn ra ngoài vùng popup
    container.addEventListener('click', (event) => {
        if (event.target === container) {
            document.body.removeChild(container);
        }
    });
}
