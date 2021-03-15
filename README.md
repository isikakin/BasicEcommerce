# Basic E-Commerce App

Basic E-Commerce App ürünlerin bulunduğu, basit bir admin paneline sahip olan web platformudur. Identity Server, ProductService ve Frontend olmak üzere 3 platformdan oluşmaktadır. Servisler ve frontend uygulaması Azure Kubernetes üzerinde çalışmakta olup, sitenin ürün görselleri Azure Blob storage üzerinde bulunmaktadır. Uygulama database olarak Azure üzerinde PostgreSQL kullanmakta. Uygulamanın logları ise ElasticSearch üzerinde tutulmakta.

Identity Server: Kullanıcıların login işlemlerinin yapıldığı servis. (identity.akinisik.com altında çalışmakta)\
ProductService: Ürünlerle ilgili işlemlerin yapıldığı servis. (product.akinisik.com)\
Frontend: Uygulama arayüzü (web.akinisik.com).

Tech Stack:

Azure AKS, Azure Blob Storage, ElasticSearch, .Net Core, Angular, Azure PostgreSQL


http://product.akinisik.com/swagger/index.html


![Elastic](https://github.com/isikakin/BasicEcommerce/blob/main/screenshots/elastic.png?raw=true)

![Kubernetes](https://github.com/isikakin/BasicEcommerce/blob/main/screenshots/kubectl.png?raw=true)

![Frontend](https://github.com/isikakin/BasicEcommerce/blob/main/screenshots/frontend.png?raw=true)

