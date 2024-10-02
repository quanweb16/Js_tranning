import InvoiceBusiness from "./business/invoice/invoice.js";
import InvoiceData from "./data-access/invoiceData.js";
import InvoicePresentation from "./presentation/invoice.js";

class App {
    constructor() {
        this.invoicePresentation = null;
        this.InvoiceBusiness = null;
        this.InvoiceData = null;
    }

    init() {
        this.InvoiceData = new InvoiceData();
        this.InvoiceBusiness = new InvoiceBusiness(this.InvoiceData);
        this.invoicePresentation = new InvoicePresentation(this.InvoiceBusiness);
        this.invoicePresentation.init();
    }
}
export default App;

