import InvoiceService from "./business-layer/invoiceService.js";
import DataAccess from "./data-access-layer/invoiceData.js";
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
