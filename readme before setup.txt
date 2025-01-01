digital ociean  ( https://cloud.digitalocean.com/droplets/465831694/access?i=a3cdf3 ) 
Sanjayitcareer@gmail.com
Welcome2psm$

https://prosportsmanager.in/

we using node -v 20 ----------
 //-------------------
 this is godaddy 
user : admin
db name : prosportsmanager
Database pass : admin@psm 
//----------------------------------
//--------------------------------
digital ocian databse 
user : root
password : Pro$ports2024!
 

//-------------------

SHA256:yMm2VGuPYuqOSfE/vS4BowxU9X8APhq4SCIYSMAbkM0 rahul@Rahul

shh = prosportsmanager.in ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPGdtrkTa50fTkzqF+Q3g0Q/66gGUgNqFm8Z154zItBo


hostname ubuntu-s-1vcpu-1gb-blr1-01

cmd 
install node digital ocian on dropnet
1. SSH key installation 
2. open terminal 
3. sudo apt install nodejs
4. to check version of node     node -v
5. sudo apt install npm 



//--





//------------------------------
sudo apt update
sudo apt install mysql-server

sudo systemctl restart mysql

sudo systemctl start mysql
sudo systemctl enable mysql
sudo mysql_secure_installation     // this asking to set root password
  
  
cmd command on server 
1. mysql -u root -p
2. Pro$ports2024!

4. mysql -u root -p prosportsmanager < prosportsmanager20241220.sql   //setup databse schema from files on server

SELECT user, host FROM mysql.user; 

 CREATE USER 'root'@'%' IDENTIFIED BY 'Pro$ports2024!';  //set root user to % grant permission
GRANT ALL PRIVILEGES ON prosportsmanager.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
 
 
5. npm install dotenv    //install dotenv for fetch databse secured data 
6. pm2 restart server
7. sudo systemctl restart mysql
8. mysqladmin -u root -p flush-privileges       //Try clearing any cache or resetting the MySQL session:
  
9. ufw allow ssh && ufw allow http && ufw allow https 
10. sudo ufw status
11. sudo ufw allow 5000/tcp
12. sudo ufw enable

modification on this ( If you never update the Nginx configuration, it can lead to potential issues depending on what you want to achieve with your server setup.  ) 
13. sudo nano /etc/nginx/sites-available/default

[  
server {
    listen 80;
    listen [::]:80;

    # This is where your backend service (Node.js, etc.) will be forwarded
    server_name cloud.digitalocean.com www.prosportsmanager.in;

    # Location of your built React frontend files
    root /home/user/pro-sports-manager/build;  # Adjust the path to where your React app is built

    index index.html index.htm index.nginx-debian.html;

    location / {
        # Serve React app static files first
        try_files $uri $uri/ /index.html;
    }

    # Reverse proxy for API calls or backend requests
    location /api/ {
        proxy_pass http://localhost:5000;  # Forward requests starting with /api to your backend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
 
 ]
 

14. sudo systemctl reload nginx
 
  
//-------------------------

sudo apt-get install python-letsencrypt-apache

//---------------------------------

api -----------------------------------------------------
nginx ---
nano /etc/nginx/sites-available/default
sudo certbot --nginx
sudo certbot --apache

sudo apt-get install python3-certbot-nginx
api ----

http://api.prosportsmanager.in:5000/api/financial-records/all


// ng inx setup 
sudo nano /etc/nginx
sudo mkdir ssl
sudo chmod 700 ssl


Sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/example.key -out ssl/example.crt
nano /etc/nginx/sites-available/default

