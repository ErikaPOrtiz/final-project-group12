pipeline {
    agent any
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = '048201425592.dkr.ecr.us-east-1.amazonaws.com/final-project-group12'
        }
    stages {
        stage('Build') {
            agent{
                docker{
                    image 'node:20.16.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                ls -la
                node --version
                npm --version
                npm install
                npm run build
                ls -la
                '''
            }
        }
        stage('Test'){
            agent{
                docker{
                    image 'node:20.16.0-alpine'
                    reuseNode true
                }
            }
            steps{
                sh'''
                    test -f build/index.html
                    npm test
                '''
            }
        }    
        stage('Build My Docker Image') {

            steps {
                sh '''
                docker build -t my-react-app .
                docker images
                '''
            }
        }
        stage('Push to AWS ECR') {
             agent {
                docker {
                        image 'alpine:latest'
                        reuseNode true
                        }
                    }    
            steps {
                withCredentials([usernamePassword(credentialsId: 'aws-ecr-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                    apk add --no-cache curl python3 py3-pip bash
                    pip3 install awscli --upgrade
                    # remaining AWS ECR logic...
                    '''
                }
            }
        }       
    }
}    