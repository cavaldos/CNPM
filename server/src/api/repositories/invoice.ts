import DataConnect from '../../utils/DataConnect';

const InvoiceRepository = {
    // Invoice methods
    async createInvoice(totalAmount: number, invoiceStatus: string, studentID: number) {
        const proc = 'create_invoice';
        const params = {
            TotalAmount: totalAmount,
            InvoiceStatus: invoiceStatus,
            StudentID: studentID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateInvoice(invoiceID: number, totalAmount: number, invoiceStatus: string, studentID: number) {
        const proc = 'update_invoice';
        const params = {
            InvoiceID: invoiceID,
            TotalAmount: totalAmount,
            InvoiceStatus: invoiceStatus,
            StudentID: studentID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteInvoice(invoiceID: number) {
        const proc = 'delete_invoice';
        const params = {
            InvoiceID: invoiceID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getInvoice(invoiceID: number) {
        const proc = 'get_invoice';
        const params = {
            InvoiceID: invoiceID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getAllInvoices() {
        const proc = 'get_all_invoices';
        return await DataConnect.executeProcedure(proc, {});
    },

    async getInvoiceDetails(invoiceID: number) {
        const proc = 'get_invoice_details';
        const params = {
            InvoiceID: invoiceID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getInvoicesByStudent(studentID: number) {
        const proc = 'get_student_invoices';
        const params = {
            StudentID: studentID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getUnpaidInvoices() {
        const proc = 'get_unpaid_invoices';
        return await DataConnect.executeProcedure(proc, {});
    },

    async getPaidInvoices() {
        const proc = 'get_paid_invoices';
        return await DataConnect.executeProcedure(proc, {});
    },

    // Invoice Detail methods
    async createInvoiceDetail(price: number, invoiceID: number, courseID: number) {
        const proc = 'create_invoice_detail';
        const params = {
            Price: price,
            InvoiceID: invoiceID,
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateInvoiceDetail(invoiceDetailID: number, price: number, invoiceID: number, courseID: number) {
        const proc = 'update_invoice_detail';
        const params = {
            InvoiceDetailID: invoiceDetailID,
            Price: price,
            InvoiceID: invoiceID,
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteInvoiceDetail(invoiceDetailID: number) {
        const proc = 'delete_invoice_detail';
        const params = {
            InvoiceDetailID: invoiceDetailID
        };
        return await DataConnect.executeProcedure(proc, params);
    }
};

export default InvoiceRepository;