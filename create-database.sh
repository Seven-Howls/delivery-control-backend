
echo "User mysql"
read MYSQL_USER
echo "Password mysql"
read MYSQL_PASSWORD

# Comando para criar um novo banco de dados
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE \`delivery-control\`;"

echo "Banco de dados 'delivery-control' criado com sucesso."