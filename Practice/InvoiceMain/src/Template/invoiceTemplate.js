// src/Template/invoiceTemplate.js

export function getInvoiceTemplate(invoice) {
    return `
        <div class="invoice-item">
            <input type="checkbox" class="invoice-checkbox">
            <div class="invoice">${invoice.id}</div>
            <div class="profile-pic">
                <img src="${invoice.profileImgSrc}" alt="Profile Picture">
                <div class="name">${invoice.name}</div>
            </div>
            <div class="email">${invoice.email}</div>
            <div class="date"><i class="fas fa-calendar-alt"></i> ${invoice.date}</div>
            <div class="status-1">${invoice.status}</div>
            <div class="star">
                <button class="special"><i class="fas fa-star"></i></button>
            </div>
            <div class="menuu">
                <div class="dots">•••</div>
                <div class="menu-itemss">
                    <div class="menu-itemm edit-btn">Edit</div>
                    <div class="menu-itemm delete-btn">Delete</div>
                </div>
            </div>
        </div>
    `;
}
