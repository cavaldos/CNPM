#!/bin/bash
# install.sh

# Chạy yarn test và lưu output vào biến
output=$(yarn test 2>&1)

# Kiểm tra nếu output chứa từ "failed" (không phân biệt hoa thường)
if echo "$output" | grep -i "Done in" > /dev/null; then
    echo "true"
else
    echo "false"
fi