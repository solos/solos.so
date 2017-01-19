---
title: Sentry部署
date: 2016-09-06 09:16:43
comments: true
tag: 
  - Sentry
  - Linux
categories:
  - Linux
---

``` bash
yum install python-devel 
postgresql-devel (libpq-dev in Debian/Ubuntu, libpq-devel on Cygwin/Babun.
libjpeg-devel libxslt-devel libxml2-devel libsasl2-devel libldap2-devel libssl-devel openldap-devel mysql-server mysql-devel

sudo apt-get install libffi-dev 

apt-get install libsasl2-dev python-dev libldap2-dev libssl-dev


sudo easy_installl virtualenv

virtualenv /opt/sentry/env
source /opt/sentry/env/bin/activate
sudo easy_install sentry python-memcached django-auth-ldap MySQL-python


sentry init /opt/sentry/


mysql -u root -p

create database sentry charset utf8;


sentry --config=/opt/sentry/sentry.conf.py config generate-secret-key

sentry --config=/opt/sentry/sentry.conf.py upgrade
```
