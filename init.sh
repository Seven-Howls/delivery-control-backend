#Funções padrão para a instalação do CRM
for arg in "$@"; do
    case $arg in
        "--migrate" )
            npx sequelize-cli db:migrate;;
        "--npm" )
            npm install --unsafe-perm --legacy-peer-deps && npm build;;
        "--seed" )
            npx sequelize-cli db:seed:all;; 
        "--full" )
            npm install --unsafe-perm --legacy-peer-deps && npm build &&\
            npx sequelize-cli db:migrate &&\
            npx sequelize-cli db:seed:all 
    esac
done
