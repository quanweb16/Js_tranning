import Business from "./business/invoiceProcess.js";
import DataAccess from "./data-access/invoiceData.js";
import Presentation from "./presentation/invoice.js";

class App {
    presentation = null;
    business = null;
    dataAccess = null;

    init() {
        this.dataAccess = new DataAccess();
        this.business = new Business(this.dataAccess);
        this.presentation = new Presentation(this.business);

        this.presentation.init();
    }
}

export default App;