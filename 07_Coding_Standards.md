# Quy định chuẩn mã nguồn (Coding Standards)

Tài liệu này định nghĩa các quy tắc và quy ước mã nguồn mà tất cả các thành viên trong nhóm phát triển phải tuân thủ. Việc tuân thủ các quy tắc này giúp đảm bảo tính nhất quán, dễ đọc và dễ bảo trì của mã nguồn.

## Mục lục

1. [Quy tắc chung](#quy-tắc-chung)
2. [Quy tắc cho TypeScript (Backend)](#quy-tắc-cho-typescript-backend)
3. [Quy tắc cho JavaScript/React (Frontend)](#quy-tắc-cho-javascriptreact-frontend)
4. [Quy tắc cho Domain-Driven Design](#quy-tắc-cho-domain-driven-design)
5. [Quy tắc cho kiểm thử (Testing)](#quy-tắc-cho-kiểm-thử-testing)
6. [Quy tắc cho quản lý phiên bản (Git)](#quy-tắc-cho-quản-lý-phiên-bản-git)
7. [Quy trình kiểm tra mã nguồn](#quy-trình-kiểm-tra-mã-nguồn)

## Quy tắc chung

### Định dạng mã nguồn

- Sử dụng **2 khoảng trắng** cho việc thụt lề (indentation).
- Sử dụng dấu chấm phẩy (;) ở cuối mỗi câu lệnh.
- Giới hạn độ dài mỗi dòng không quá 80 ký tự.
- Sử dụng dấu ngoặc nhọn ({}) cho tất cả các khối lệnh, ngay cả khi chỉ có một câu lệnh.
- Đặt dấu ngoặc nhọn mở ({) ở cùng dòng với câu lệnh điều kiện hoặc khai báo hàm.
- Sử dụng dấu nháy đơn (') cho chuỗi trong JavaScript/TypeScript.

### Đặt tên

- Sử dụng **camelCase** cho tên biến, tên hàm, và tên thuộc tính.
- Sử dụng **PascalCase** cho tên lớp, tên interface, tên enum, và tên component React.
- Sử dụng **UPPER_CASE** cho hằng số.
- Tên phải có ý nghĩa và mô tả chính xác mục đích sử dụng.
- Tránh sử dụng tên viết tắt trừ khi chúng phổ biến (ví dụ: HTTP, URL).
- Tên file nên phản ánh nội dung của file và tuân theo quy ước đặt tên của ngôn ngữ/framework.

### Tổ chức mã nguồn

- Mỗi file chỉ nên chứa một lớp, một component, hoặc một nhóm chức năng liên quan.
- Sắp xếp các import theo thứ tự: thư viện bên thứ ba, thư viện nội bộ, và các file cục bộ.
- Nhóm các import theo loại và sắp xếp theo thứ tự bảng chữ cái.
- Sử dụng comment để giải thích mã nguồn phức tạp hoặc không rõ ràng.
- Tránh comment không cần thiết cho mã nguồn đã rõ ràng.

## Quy tắc cho TypeScript (Backend)

### Kiểu dữ liệu

- Luôn khai báo kiểu dữ liệu cho biến, tham số hàm, và giá trị trả về.
- Sử dụng interface thay vì type khi định nghĩa đối tượng.
- Tránh sử dụng kiểu `any` khi có thể.
- Sử dụng kiểu `unknown` thay vì `any` khi không biết kiểu dữ liệu.
- Sử dụng kiểu `void` cho hàm không trả về giá trị.
- Sử dụng kiểu `never` cho hàm không bao giờ trả về (ví dụ: hàm luôn ném ra ngoại lệ).

### Cấu trúc dự án

- Tuân thủ cấu trúc Domain-Driven Design (DDD) cho các module.
- Mỗi module nên có cấu trúc thư mục rõ ràng: domain, application, infrastructure, presentation.
- Sử dụng barrel exports (index.ts) để xuất các thành phần của module.
- Tách biệt rõ ràng giữa các layer trong kiến trúc DDD.

### Xử lý lỗi

- Sử dụng try-catch cho các hoạt động có thể gây ra lỗi.
- Tạo các lớp lỗi tùy chỉnh kế thừa từ Error.
- Ghi log đầy đủ thông tin lỗi.
- Trả về mã lỗi HTTP phù hợp cho các API.

### Cấu hình TypeScript

- Bật strict mode trong tsconfig.json.
- Bật noImplicitAny, noImplicitThis, và noImplicitReturns.
- Sử dụng ES2022 làm target.
- Sử dụng commonjs làm module system.

## Quy tắc cho JavaScript/React (Frontend)

### Cấu trúc component

- Sử dụng functional components với hooks thay vì class components.
- Mỗi component nên được định nghĩa trong một file riêng biệt.
- Đặt tên file component trùng với tên component.
- Sử dụng JSX syntax với các thẻ tự đóng cho các element không có children.
- Sử dụng destructuring cho props.

```jsx
// Tốt
function UserProfile({ name, email, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Không tốt
function UserProfile(props) {
  return (
    <div>
      <img src={props.avatar} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  );
}
```

### State Management

- Sử dụng Redux cho state management toàn cục.
- Sử dụng React Context cho state management cục bộ.
- Sử dụng useState và useReducer cho state management trong component.
- Tổ chức store Redux theo tính năng hoặc domain.
- Sử dụng Redux Toolkit để giảm boilerplate code.

### Styling

- Sử dụng Tailwind CSS cho styling.
- Tuân thủ quy tắc đặt tên class của Tailwind CSS.
- Tránh sử dụng inline styles trừ khi cần thiết.
- Sử dụng CSS modules hoặc styled-components khi cần styling phức tạp.

### Performance

- Sử dụng React.memo cho các component không cần re-render thường xuyên.
- Sử dụng useCallback và useMemo để tối ưu hóa performance.
- Tránh re-render không cần thiết.
- Sử dụng lazy loading cho các component lớn.

## Quy tắc cho Domain-Driven Design

### Entities

- Entities phải có một định danh duy nhất (ID).
- Entities nên chứa các phương thức domain để thực hiện các hành vi nghiệp vụ.
- Entities nên được immutable khi có thể.
- Sử dụng factory methods để tạo entities.

### Value Objects

- Value Objects nên immutable.
- Value Objects không có ID, chúng được so sánh bằng giá trị.
- Value Objects nên chứa các phương thức validation.
- Sử dụng Value Objects để đóng gói các khái niệm nghiệp vụ.

### Repositories

- Repositories chỉ nên làm việc với Aggregates.
- Repositories nên cung cấp các phương thức CRUD cơ bản.
- Repositories nên trừu tượng hóa cơ sở dữ liệu.
- Sử dụng interface để định nghĩa repositories.

### Services

- Services nên xử lý các logic nghiệp vụ không thuộc về một entity cụ thể.
- Services nên stateless.
- Services nên được inject vào các thành phần khác thông qua dependency injection.
- Phân biệt rõ ràng giữa Domain Services và Application Services.

## Quy tắc cho kiểm thử (Testing)

### Unit Testing

- Mỗi hàm/phương thức nên có ít nhất một unit test.
- Sử dụng Jest làm testing framework.
- Sử dụng mocking để cô lập các dependency.
- Đặt tên test rõ ràng, mô tả hành vi được kiểm tra.

```javascript
// Tốt
test('should return user when valid ID is provided', () => {
  // ...
});

// Không tốt
test('getUserById works', () => {
  // ...
});
```

### End-to-End Testing

- Sử dụng Selenium WebDriver cho E2E testing.
- Tổ chức các test E2E theo tính năng.
- Sử dụng Page Object Model để tổ chức code test.
- Đảm bảo các test E2E độc lập với nhau.

### API Testing

- Sử dụng Supertest để kiểm tra API.
- Kiểm tra cả happy path và error cases.
- Kiểm tra các edge cases.
- Đảm bảo các test API độc lập với nhau.

## Quy tắc cho quản lý phiên bản (Git)

### Branches

- Sử dụng Git Flow làm workflow.
- Tên nhánh feature: `feature/tên-tính-năng`
- Tên nhánh bugfix: `bugfix/tên-lỗi`
- Tên nhánh hotfix: `hotfix/tên-lỗi`
- Tên nhánh release: `release/x.y.z`

### Commits

- Viết commit message rõ ràng, mô tả những gì đã thay đổi.
- Sử dụng thì hiện tại cho commit message.
- Giới hạn dòng đầu tiên của commit message không quá 50 ký tự.
- Sử dụng dấu gạch đầu dòng (-) cho các điểm trong phần mô tả chi tiết.

```
// Tốt
Add user authentication feature

- Implement JWT authentication
- Add login and register endpoints
- Create user repository

// Không tốt
Fixed stuff
```

### Pull Requests

- Mỗi Pull Request nên tập trung vào một tính năng hoặc sửa lỗi cụ thể.
- Mô tả Pull Request rõ ràng, bao gồm những gì đã thay đổi và lý do.
- Đảm bảo tất cả các test đều pass trước khi tạo Pull Request.
- Yêu cầu ít nhất một người review trước khi merge.

## Quy trình kiểm tra mã nguồn

### Linting

- Sử dụng ESLint cho JavaScript/TypeScript.
- Sử dụng Prettier cho việc định dạng mã nguồn.
- Chạy linting trước khi commit.
- Cấu hình CI/CD để chạy linting tự động.

### Code Review

- Mọi mã nguồn phải được review trước khi merge vào nhánh chính.
- Tập trung vào logic, cấu trúc, và khả năng bảo trì của mã nguồn.
- Đảm bảo mã nguồn tuân thủ các quy tắc đã đề ra.
- Đưa ra phản hồi xây dựng và cụ thể.

### Continuous Integration

- Cấu hình CI/CD để chạy test tự động khi có thay đổi.
- Đảm bảo tất cả các test đều pass trước khi deploy.
- Tự động kiểm tra code coverage.
- Tự động kiểm tra lỗi bảo mật.

---

Tài liệu này sẽ được cập nhật khi cần thiết để phản ánh các thay đổi trong quy trình phát triển và công nghệ sử dụng. Mọi thành viên trong nhóm phát triển có trách nhiệm tuân thủ các quy tắc này và đề xuất cải tiến khi thấy cần thiết.

**Lần cập nhật cuối: [Ngày hiện tại]**
