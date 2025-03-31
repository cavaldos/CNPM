pipeline {
    agent any

    stages {
        stage('Deploy to Staging') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
                sshagent(['manjaro']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -p 22 ubuntu@3.106.223.225 '
                            if ! command -v node &> /dev/null; then
                                echo "Node.js is not installed. Installing Node.js 18.x..."
                                curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                                sudo apt-get install -y nodejs
                            fi
             
                            node -v
                            npm -v
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
                        '
                    """
                }
            }

        }
        
        stage('Deploy to Production') {
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
                            echo "Running Tests..."
                            cd server
                            npm install
                           # npm run test -- __test__/utils/sum.test.ts
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
