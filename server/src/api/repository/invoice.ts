import DataConnect from "../../utils/DataConnect";

const InvoiceRepository = {
  async getInvoices() {
    try {
      const query = "SELECT * FROM [Invoice]";
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting invoices: ${error.message}`);
      }
      throw new Error('Error getting invoices');
    }
  },

  async getInvoiceById(id: number) {
    try {
      const query = `SELECT * FROM [Invoice] WHERE InvoiceID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting invoice by id: ${error.message}`);
      }
      throw new Error('Error getting invoice by id');
    }
  },

  async createInvoice(invoice: {
    totalAmount: number;
    invoiceStatus: 'Paied' | 'UnPaied';
    studentId: number;
    courses: Array<{ courseId: number; price: number; }>;
  }) {
    try {
      // Start transaction
      await DataConnect.execute('BEGIN TRANSACTION');
      
      // Create invoice
      const invoiceQuery = `
        INSERT INTO [Invoice] (InvoiceDate, TotalAmount, InvoiceStatus, StudentID)
        OUTPUT INSERTED.InvoiceID
        VALUES (GETDATE(), ${invoice.totalAmount}, '${invoice.invoiceStatus}', ${invoice.studentId})`;
      
      const invoiceResult = await DataConnect.execute(invoiceQuery);
      const invoiceId = invoiceResult[0].InvoiceID;

      // Create invoice details
      for (const course of invoice.courses) {
        const detailQuery = `
          INSERT INTO [InvoiceDetail] (Price, InvoiceID, CourseID)
          VALUES (${course.price}, ${invoiceId}, ${course.courseId})`;
        await DataConnect.execute(detailQuery);
      }

      // Commit transaction
      await DataConnect.execute('COMMIT');
      return invoiceResult;
    } catch (error) {
      // Rollback on error
      await DataConnect.execute('ROLLBACK');
      if (error instanceof Error) {
        throw new Error(`Error creating invoice: ${error.message}`);
      }
      throw new Error('Error creating invoice');
    }
  },

  async updateInvoice(id: number, invoice: {
    totalAmount?: number;
    invoiceStatus?: 'Paied' | 'UnPaied';
  }) {
    try {
      let updateFields = [];
      if (invoice.totalAmount) updateFields.push(`TotalAmount = ${invoice.totalAmount}`);
      if (invoice.invoiceStatus) updateFields.push(`InvoiceStatus = '${invoice.invoiceStatus}'`);

      const query = `
        UPDATE [Invoice] 
        SET ${updateFields.join(', ')}
        WHERE InvoiceID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating invoice: ${error.message}`);
      }
      throw new Error('Error updating invoice');
    }
  },

  async deleteInvoice(id: number) {
    try {
      // Start transaction
      await DataConnect.execute('BEGIN TRANSACTION');
      
      // Delete invoice details first
      await DataConnect.execute(`DELETE FROM [InvoiceDetail] WHERE InvoiceID = ${id}`);
      
      // Then delete invoice
      await DataConnect.execute(`DELETE FROM [Invoice] WHERE InvoiceID = ${id}`);
      
      // Commit transaction
      await DataConnect.execute('COMMIT');
    } catch (error) {
      // Rollback on error
      await DataConnect.execute('ROLLBACK');
      if (error instanceof Error) {
        throw new Error(`Error deleting invoice: ${error.message}`);
      }
      throw new Error('Error deleting invoice');
    }
  },

  async getInvoicesByStudent(studentId: number) {
    try {
      const query = `
        SELECT i.*, id.Price, id.CourseID 
        FROM [Invoice] i
        LEFT JOIN [InvoiceDetail] id ON i.InvoiceID = id.InvoiceID
        WHERE i.StudentID = ${studentId}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting invoices by student: ${error.message}`);
      }
      throw new Error('Error getting invoices by student');
    }
  }
};

export default InvoiceRepository;