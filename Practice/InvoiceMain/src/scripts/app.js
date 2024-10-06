import InvoiceBusiness from './business/invoice.js';
import InvoiceDataAccess from './dataAccess/invoice.js';
import InvoicePresentation from './presentation/invoice.js';

class App {

    init() {
        this.invoiceDataAccess = new InvoiceDataAccess();
        this.invoiceBusiness = new InvoiceBusiness(this.invoiceDataAccess);
        this.invoicePresentation = new InvoicePresentation(this.invoiceBusiness);
        this.invoicePresentation.init();
    }
}
export default App;

