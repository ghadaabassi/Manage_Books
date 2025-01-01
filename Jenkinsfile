pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }

    environment {
        APP_NAME = "manage_books"
        RELEASE = "1-0-0"
        DOCKER_USER = "dockeruser387"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/angular" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        JENKINS_API_TOKEN = credentials("JENKINS_API_TOKEN")
    }

    stages {
        stage("Clean up") {
            steps {
                deleteDir() 
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/ghadaabassi/Manage_Books.git'
            }
        }


        stage('Build & Push Docker Image') {
            steps {
                script {
             
                        docker.withRegistry('', DOCKER_PASS) {
                            def image = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                            image.push("${IMAGE_TAG}")
                            image.push('latest')
                        }
                    }
                    
            }}

}}