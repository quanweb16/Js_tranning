import Business from "./business/invoiceProcess.js";
import DataAccess from "./data-access/invoiceData.js";
import InvoicePresentation from "./presentation/invoice.js";

class App {
    InvoicePresentation = null;
    business = null;
    dataAccess = null;

    init() {
        this.dataAccess = new DataAccess();
        this.business = new Business(this.dataAccess);
        this.InvoicePresentation= new InvoicePresentation(this.business);
        this.InvoicePresentation.init();
    }
}


export default App;