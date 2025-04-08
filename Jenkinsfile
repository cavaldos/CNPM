pipeline {
    agent any

    stages {
        stage('Deploy to Staging') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p 22 ubuntu@3.106.223.225 '
                            if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
                                echo "Node.js or npm is not installed or not in PATH. Installing Node.js 18.x..."
                                sudo apt-get update
                                sudo apt-get install -y curl
                                curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                                sudo apt-get install -y nodejs
                                
                                source ~/.bashrc || true
                                
                                if ! command -v npm &> /dev/null; then
                                    echo "npm still not found. Installing npm separately..."
                                    sudo apt-get install -y npm
                                fi
                            fi
                            
                            node -v || echo "Node.js not found in PATH"
                            npm -v || echo "npm not found in PATH"
                            
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
                      4          cd server
                                npm install
                                npm run test -- __test__/utils/sum.test.ts
                            else
                                echo "ERROR: npm installation failed. Cannot proceed with deployment."
                                exit 1
                            fi
                            echo "Deployment script completed."
                            
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
                            sh ./deploy.sh
                            echo "Running Tests..."
            
                        '
                    """
                }
            }
            post {
                success {
                    echo 'Successfully deployed to Production'
                }
                failure {
                    echo 'Failed to deploy to Production'
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
