import { Client } from '@elastic/elasticsearch';
import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

// Cấu hình kết nối MSSQL
const sqlConfig = {
    user: 'sa',
    password: 'password123@',
    server: 'bourbon.zapto.org', // Hoặc địa chỉ server MSSQL của bạn
    database: 'CourseDB',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
    },
};

// Cấu hình client Elasticsearch
const elasticClient = new Client({
    node: 'http://bourbon.zapto.org:9200',
    auth: {
        username: 'elastic', // Thêm username nếu dùng xác thực
        password: 'your_elastic_password' // Thêm password nếu dùng xác thực
    }
});

// Hàm đồng bộ dữ liệu từ MSSQL sang Elasticsearch
async function syncDataToElasticsearch() {
    try {
        // Kết nối MSSQL
        await sql.connect(sqlConfig);
        const result = await sql.query('SELECT * FROM Course'); // Thay 'your_table' bằng bảng của bạn
        const records = result.recordset;

        // Đẩy dữ liệu vào Elasticsearch
        for (const record of records) {
            await elasticClient.index({
                index: 'course_index', // Thay 'your_index_name' bằng tên index cụ thể
                id: record.id, // ID duy nhất của bản ghi
                body: record // Dữ liệu bản ghi
            });
        }

        console.log('Dữ liệu đã được đồng bộ thành công!');
    } catch (error) {
        console.error('Lỗi đồng bộ dữ liệu:', error);
    } finally {
    }
}

// Hàm truy vấn và in dữ liệu từ Elasticsearch
async function searchDataFromElasticsearch() {
    try {
        const result = await elasticClient.search({
            index: 'course_index', // Tên index bạn đã đồng bộ
            query: {
                match_all: {} // Truy vấn lấy tất cả bản ghi
            }
        });

        // In kết quả ra terminal
        console.log('Kết quả truy vấn từ Elasticsearch:');
        result.hits.hits.forEach((hit, index) => {
            console.log(`Bản ghi ${index + 1}:`, hit._source);
        });

    } catch (error) {
        console.error('Lỗi khi truy vấn Elasticsearch:', error);
    }
}

// Chạy các hàm
async function main() {
    await syncDataToElasticsearch(); // Đồng bộ dữ liệu trước
    await searchDataFromElasticsearch(); // Truy vấn và in kết quả
}

main().catch(console.error);

export default syncDataToElasticsearch; // Giữ export để tái sử dụng nếu cần