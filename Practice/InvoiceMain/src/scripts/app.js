import InvoiceService from "./business/invoiceService.js";
import DataAccess from "./data-access/invoiceData.js";
import InvoicePresentation from "./presentation/invoice.js";

class App {
    constructor() {
        this.invoicePresentation = null;
        this.InvoiceService = null;
        this.dataAccess = null;
    }

    init() {
        this.dataAccess = new DataAccess();
        this.InvoiceService = new InvoiceService(this.dataAccess);
        this.invoicePresentation = new InvoicePresentation(this.InvoiceService);
        this.invoicePresentation.init();
    }
}
export default App;
