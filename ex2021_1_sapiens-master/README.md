Projeto de Desenvolvimento - ex2021_1_SAPIENS

Escopo do Projeto:

Desenvolvimento de uma plataforma web que possa suportar eventos online, sendo possível realizar o cadastramento de novos usuários, assim como, atualizar e deletar do banco de dados. A solução deverá deter a capacidade de ser personalizável, desta forma, a plataforma poderá ser utilizada para mais de um evento. Deve ser desenvolvido um “Hall 3D" após o momento do login, com interação de imagem em 360º para dar acesso às demais salas que irão dispor de informações específicas e direcionamento para as palestras/atividades ligadas ao evento. Criar novas temáticas de design para a logo da SAPIENS para auxiliar na imersão dos usuários.

Requisitos do Projeto:

Python - Versão Atual
Django - 3.1.7
Pillow - 8.2.0
Django-allauth - 0.44.0
Django-environ - 0.4.5
Whitenoise - 5.2.0
Gunicorn - 20.0.4
Psycopg2 - 2.8.5
Debian - 10.10

Guia de Instalação:

Os comandos abaixo devem ser executados durante o processo de instalação da solução:

Criação do Banco de Dados:
sudo -u postgres -i # muda o usuário para o usuário postgres
psql postgres # abre o shell do postgres
postgres=# create database sapiens10_deploy;
CREATE DATABASE
postgres=# create user sapiens_admdb with encrypted password 's@p!3ns10';
CREATE ROLE
postgres=# grant all privileges on database sapiens10_deploy to sapiens_admdb
python3 manage.py createsuperuser # criar o super usuário do django
sapiens10anos_adm @DM10SAP

python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
pip freeze (verificar se todos os requirements foram devidamente instalados)
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic
gunicorn core.wsgi -w4 --bind 0.0.0.0:8072 &

Equipe de Desenvolvimento:

Techleader: Walace Bonfim
Gerente de Projetos: Paulo Rodrigues
Equipe de Desenvolvimento:
Alexandre Costa - Front End
Juan Alencar - Front End
Laís Barreto - Front End
Lukas Figueiredo - Front End
Marcos Melo - Back End
