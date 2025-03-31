pipeline {
    agent any

    stages {
        stage('Deploy to Staging') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p 22 ubuntu@3.106.223.225 '
                            # Cài đặt Node.js và npm
                            if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
                                echo "Node.js or npm is not installed or not in PATH. Installing Node.js 18.x..."
                                sudo apt-get update
                                sudo apt-get install -y curl
                                curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                                sudo apt-get install -y nodejs
                                
                                # Khởi động lại shell để cập nhật PATH
                                source ~/.bashrc || true
                                
                                # Cài đặt npm riêng nếu cần
                                if ! command -v npm &> /dev/null; then
                                    echo "npm still not found. Installing npm separately..."
                                    sudo apt-get install -y npm
                                fi
                            fi
                            
                            # Kiểm tra lại
                            echo "Node.js version:"
                            node -v || echo "Node.js not found in PATH"
                            echo "npm version:"
                            npm -v || echo "npm not found in PATH"
                            
                            # Tiếp tục với quy trình deployment chỉ khi npm đã được cài đặt
                            if command -v npm &> /dev/null; then
                                echo "Node.js and npm are installed. Proceeding with the deployment..."
                                
                                mkdir -p ~/Code/CICD
                                cd ~/Code/CICD
                                if [ -d "CNPM" ]; then
                                    echo "Project already exists. Updating from GitHub..."
                                    cd CNPM
                                    git fetch
                                    git reset --hard origin/jenkins
                                    git pull origin jenkins
                                else
                                    echo "Project does not exist. Cloning from GitHub..."
                                    git clone https://github.com/cavaldos/CNPM.git
                                    cd CNPM
                                    git checkout jenkins
                                fi
                                
                                echo "Running Tests..."
                                cd server
                                npm install
                                npm run test -- __test__/utils/sum.test.ts
                            else
                                echo "ERROR: npm installation failed. Cannot proceed with deployment."
                                exit 1
                            fi
                        '
                    """
                }
            }
            post {
                success {
                    echo 'Successfully deployed to Staging'
                }
                failure {
                    echo 'Failed to deploy to Staging'
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                expression {
                    currentBuild.resultIsBetterOrEqualTo('SUCCESS') 
                }
            }
            steps {
                sshagent(['manjaro']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p 2323 bourbon@bourbon.zapto.org '
                            # Cài đặt Node.js và npm
                            if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
                                echo "Node.js or npm is not installed or not in PATH. Installing Node.js 18.x..."
                                sudo apt-get update
                                sudo apt-get install -y curl
                                curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                                sudo apt-get install -y nodejs
                                
                                # Khởi động lại shell để cập nhật PATH
                                source ~/.bashrc || true
                                
                                # Cài đặt npm riêng nếu cần
                                if ! command -v npm &> /dev/null; then
                                    echo "npm still not found. Installing npm separately..."
                                    sudo apt-get install -y npm
                                fi
                            fi
                            
                            # Kiểm tra lại
                            echo "Node.js version:"
                            node -v || echo "Node.js not found in PATH"
                            echo "npm version:"
                            npm -v || echo "npm not found in PATH"
                            
                            if command -v npm &> /dev/null; then
                                mkdir -p ~/Code/CICD
                                cd ~/Code/CICD
                                if [ -d "CNPM" ]; then
                                    echo "Project already exists. Updating from GitHub..."
                                    cd CNPM
                                    git fetch
                                    git reset --hard origin/jenkins
                                    git pull origin jenkins
                                else
                                    echo "Project does not exist. Cloning from GitHub..."
                                    git clone https://github.com/cavaldos/CNPM.git
                                    cd CNPM
                                    git checkout jenkins
                                fi
                                
                                echo "Deploying to Production..."
                                cd server
                                npm install
                                # Khởi động ứng dụng - thay thế bằng lệnh phù hợp
                                npm start || nohup node index.js > app.log 2>&1 &
                                echo "Application deployed to Production"
                            else
                                echo "ERROR: npm installation failed. Cannot proceed with deployment."
                                exit 1
                            fi
                        '
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully! Project deployed to both staging and production.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
}
