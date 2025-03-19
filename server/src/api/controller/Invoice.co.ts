import { Request, Response } from "express";
import InvoiceRepository from "../repositories/invoice";

const InvoiceController = {
    // Invoice management
    createInvoice: async (req: Request, res: Response) => {
        try {
            const { totalAmount, invoiceStatus, studentID } = req.body;
            const result = await InvoiceRepository.createInvoice(
                totalAmount,
                invoiceStatus,
                studentID
            );
            res.status(201).json({
                success: true,
                message: "Invoice created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create invoice",
                error: error
            });
        }
    },

    updateInvoice: async (req: Request, res: Response) => {
        try {
            const { invoiceID, totalAmount, invoiceStatus, studentID } = req.body;
            const result = await InvoiceRepository.updateInvoice(
                invoiceID,
                totalAmount,
                invoiceStatus,
                studentID
            );
            res.status(200).json({
                success: true,
                message: "Invoice updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update invoice",
                error: error
            });
        }
    },

    deleteInvoice: async (req: Request, res: Response) => {
        try {
            const { invoiceID } = req.body;
            const result = await InvoiceRepository.deleteInvoice(invoiceID);
            res.status(200).json({
                success: true,
                message: "Invoice deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete invoice",
                error: error
            });
        }
    },

    getInvoice: async (req: Request, res: Response) => {
        try {
            const { invoiceID } = req.body;
            const result = await InvoiceRepository.getInvoice(invoiceID);
            res.status(200).json({
                success: true,
                message: "Invoice retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get invoice",
                error: error
            });
        }
    },

    getAllInvoices: async (_req: Request, res: Response) => {
        try {
            const result = await InvoiceRepository.getAllInvoices();
            res.status(200).json({
                success: true,
                message: "Invoices retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get invoices",
                error: error
            });
        }
    },

    getInvoicesByStudent: async (req: Request, res: Response) => {
        try {
            const { studentID } = req.body;
            const result = await InvoiceRepository.getInvoicesByStudent(studentID);
            res.status(200).json({
                success: true,
                message: "Student invoices retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get student invoices",
                error: error
            });
        }
    },

    getUnpaidInvoices: async (_req: Request, res: Response) => {
        try {
            const result = await InvoiceRepository.getUnpaidInvoices();
            res.status(200).json({
                success: true,
                message: "Unpaid invoices retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get unpaid invoices",
                error: error
            });
        }
    },

    getPaidInvoices: async (_req: Request, res: Response) => {
        try {
            const result = await InvoiceRepository.getPaidInvoices();
            res.status(200).json({
                success: true,
                message: "Paid invoices retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get paid invoices",
                error: error
            });
        }
    },

    // Invoice Detail management
    createInvoiceDetail: async (req: Request, res: Response) => {
        try {
            const { price, invoiceID, courseID } = req.body;
            const result = await InvoiceRepository.createInvoiceDetail(
                price,
                invoiceID,
                courseID
            );
            res.status(201).json({
                success: true,
                message: "Invoice detail created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create invoice detail",
                error: error
            });
        }
    },

    updateInvoiceDetail: async (req: Request, res: Response) => {
        try {
            const { invoiceDetailID, price, invoiceID, courseID } = req.body;
            const result = await InvoiceRepository.updateInvoiceDetail(
                invoiceDetailID,
                price,
                invoiceID,
                courseID
            );
            res.status(200).json({
                success: true,
                message: "Invoice detail updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update invoice detail",
                error: error
            });
        }
    },

    deleteInvoiceDetail: async (req: Request, res: Response) => {
        try {
            const { invoiceDetailID } = req.body;
            const result = await InvoiceRepository.deleteInvoiceDetail(invoiceDetailID);
            res.status(200).json({
                success: true,
                message: "Invoice detail deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete invoice detail",
                error: error
            });
        }
    },

    getInvoiceDetails: async (req: Request, res: Response) => {
        try {
            const { invoiceID } = req.body;
            const result = await InvoiceRepository.getInvoiceDetails(invoiceID);
            res.status(200).json({
                success: true,
                message: "Invoice details retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get invoice details",
                error: error
            });
        }
    }
};

export default InvoiceController;