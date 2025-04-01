import InvoiceRepository from '../../../src/api/repositories/invoice';
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('InvoiceRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Invoice methods', () => {
        it('should call create_invoice procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.createInvoice(100, 'Pending', 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_invoice', {
                TotalAmount: 100,
                InvoiceStatus: 'Pending',
                StudentID: 1
            });
        });

        it('should call update_invoice procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.updateInvoice(1, 150, 'Paid', 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_invoice', {
                InvoiceID: 1,
                TotalAmount: 150,
                InvoiceStatus: 'Paid',
                StudentID: 1
            });
        });

        it('should call delete_invoice procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.deleteInvoice(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_invoice', {
                InvoiceID: 1
            });
        });

        it('should call get_invoice procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.getInvoice(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_invoice', {
                InvoiceID: 1
            });
        });

        it('should call get_all_invoices procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.getAllInvoices();
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_all_invoices', {});
        });

        it('should call get_invoice_details procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.getInvoiceDetails(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_invoice_details', {
                InvoiceID: 1
            });
        });

        it('should call get_student_invoices procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.getInvoicesByStudent(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_student_invoices', {
                StudentID: 1
            });
        });

        it('should call get_unpaid_invoices procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.getUnpaidInvoices();
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_unpaid_invoices', {});
        });

        it('should call get_paid_invoices procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.getPaidInvoices();
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_paid_invoices', {});
        });
    });

    describe('Invoice Detail methods', () => {
        it('should call create_invoice_detail procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.createInvoiceDetail(50, 1, 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_invoice_detail', {
                Price: 50,
                InvoiceID: 1,
                CourseID: 1
            });
        });

        it('should call update_invoice_detail procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.updateInvoiceDetail(1, 75, 1, 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_invoice_detail', {
                InvoiceDetailID: 1,
                Price: 75,
                InvoiceID: 1,
                CourseID: 1
            });
        });

        it('should call delete_invoice_detail procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await InvoiceRepository.deleteInvoiceDetail(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_invoice_detail', {
                InvoiceDetailID: 1
            });
        });
    });
});