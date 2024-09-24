import Business from "./business/invoiceProcess.js";
import DataAccess from "./data-access/invoiceData.js";
import InvoicePresentation from "./presentation/invoice.js";

class App {
    constructor() {
        this.invoicePresentation = null;
        this.business = null;
        this.dataAccess = null;
    }

    init() {
        this.dataAccess = new DataAccess();
        this.business = new Business(this.dataAccess);
        this.invoicePresentation = new InvoicePresentation(this.business);
        this.invoicePresentation.init();
    }
}
export default App;
