pipeline {
    agent any

    stages {
        stage('SSH and Run Commands') {
            steps {
                // Ensure 'manjaro' matches the credential ID configured in Jenkins
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
                            npm run test
                        '
                    """
                }
            }
        }
    }
}
