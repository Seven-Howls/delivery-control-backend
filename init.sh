echo "Valor de $1"
echo "User mysql"
read MYSQL_USER
echo "Password mysql"
read MYSQL_PASSWORD

# Comando para criar um novo banco de dados
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE \`delivery-control\`;"

echo "\n\n##Banco de dados 'delivery-control' criado com sucesso.##"

cat > '.env' <<EOT
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$MYSQL_PASSWORD
DB_NAME=delivery-control
DB_PORT=3306
DB_DIALECT=mysql
API_PORT=8080
BCRYPT_COST=10
BCRYPT_KEY=12345
EOT

echo "\n\n##.env criado com sucesso##"

npm install

echo "\n\n##Dependencias instaladas com sucesso##"

npx sequelize-cli db:migrate

echo "\n\nMigrações executadas com sucesso"

if [ "$1" = "limpa" ]; then
  echo "\n\nA base subiu limpa"
  
else
    npx sequelize-cli db:seed:all
    echo "\n\nTodas as seeds foram executadas"
  
fi
