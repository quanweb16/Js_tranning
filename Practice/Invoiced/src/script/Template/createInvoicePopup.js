export function createInvoicePopup(onCreate) {
    const formContainer = document.createElement('div');
    formContainer.classList.add('popup-form');

    formContainer.innerHTML = `
        <div class="create-invoice-container">
            <h2>Create New Invoice</h2>
            <form class="form-invoice">
                <div class="user-img">
                    <div class="image">
                        <img src="" alt="add image" id="profile-img-preview">
                        <input type="file" id="file-upload" name="file-upload">
                    </div>
                </div>
                <div class="form-group">
                    <label for="invoice-id">Invoice Id</label>
                    <input type="text" id="invoice-id" name="invoice-id" placeholder="#8181" required>
                </div>
                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="QuanDoan" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="name@gmail.com" required>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" placeholder="Name City" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn-invoice-create">Create Invoice</button>
                </div>
            </form>
            <button class="close-popup">Close</button>
        </div>
    `;

    // Xử lý sự kiện submit của form
    const form = formContainer.querySelector('.form-invoice');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const invoiceData = {
            id: form.querySelector('#invoice-id').value,
            date: form.querySelector('#date').value,
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            address: form.querySelector('#address').value,
            status: 'Pending', // Hoặc giá trị mặc định khác
        };
        if (typeof onCreate === 'function') {
            onCreate(invoiceData);
        }
        closePopup();
    });

    // Xử lý sự kiện đóng popup
    const closeButton = formContainer.querySelector('.close-popup');
    closeButton.addEventListener('click', closePopup);

    function closePopup() {
        formContainer.remove();
    }

    return formContainer;
}
