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
        stage("Clone repos") {
            steps {

script { withCredentials([string(credentialsId: 'tokenDevops', variable: 'GIT_TOKEN')]) {
sh "git clone https://${GIT_TOKEN}@github.com/ghadaabassi/Manage_Books.git" }

            }
        }
        stage("Generate Angular image") {
            steps {
                dir("Manage_Books") {
                    sh "npm install -g @angular/cli"
                    sh "npm install" 
                    sh "ng build --configuration production"
                    sh "docker build -t frontend ." 
                }
            }
        }
        stage("Run docker compose") {
            steps {
                dir("Manage_Books") { 
                    sh "docker compose up -d"
                }
            }
        }

        
    }
}}