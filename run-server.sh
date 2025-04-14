# Dừng container client-coursera
docker-compose -f docker-compose.yml stop server-coursera

# Xóa container client-coursera đã dừng
docker-compose rm -f docker-compose.yml server-coursera

# Chạy lại container client-coursera
docker-compose -f docker-compose.yml up -d server-coursera