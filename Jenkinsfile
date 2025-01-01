pipeline {
    agent any
    tools {
        nodejs 'nodejs'
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

}}