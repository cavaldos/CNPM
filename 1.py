def generate_create_course_script():
    # Nhập số lượng lệnh muốn tạo
    num_commands =10000
    
    # Các thông tin cố định
    topic = "Sample Topic"
    description = "This is a sample course description."
    image = "sample_image.jpg"
    instructor_id = 2
    
    # Tạo danh sách các lệnh
    commands = []
    
    for i in range(1, num_commands + 1):
        # Tạo title khác nhau dựa trên số thứ tự
        title = f"Course {i}"
        
        # Tạo lệnh execute
        command = f"execute create_course @Title = '{title}', @Topic = '{topic}', @Description = '{description}', @Image = '{image}', @InstructorID = {instructor_id};"
        
        # Thêm lệnh vào danh sách
        commands.append(command)
    
    # Lưu vào file SQL
    with open('output.sql', 'w', encoding='utf-8') as file:
        # Ghi từng lệnh trực tiếp vào file
        for cmd in commands:
            file.write(cmd + '\n')
    
    print(f"\nĐã lưu {num_commands} lệnh vào file 'output.sql'")

# Chạy hàm
generate_create_course_script()