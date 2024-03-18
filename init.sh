
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
EOT

echo "\n\n##.env criado com sucesso##"

npm install

echo "\n\n##Dependencias instaladas com sucesso##"