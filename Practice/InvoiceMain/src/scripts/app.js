import InvoiceBusiness from './business/invoice.js';
import InvoiceDataAccess from './dataAccess/invoiceStorage.js';
import InvoicePresentation from './presentation/invoice.js';

class App {
    constructor() {
        this.invoicePresentation = null;
        this.invoiceBusiness = null;
        this.invoiceDataAccess = null;
    }

    init() {
        this.invoiceDataAccess = new InvoiceDataAccess();
        this.invoiceBusiness = new InvoiceBusiness(this.invoiceDataAccess);
        this.invoicePresentation = new InvoicePresentation(this.invoiceBusiness);
        this.invoicePresentation.init();
    }
}
export default App;

