# Burger Queen

## Índice

* [1. Resumo do projeto](#1-resumo-do-projeto)
* [2. Considerações gerais](#2-Considerações-gerais)
* [3. Critérios de aceitação cumpridos pelo projeto](#3-critérios-de-aceitação-cumpridos-pelo-projeto)


***

## 1. Resumo do projeto


Nesse projeto foi criado uma interface para ser utilizada em _tablet_, onde é possível realizar pedidos, enviá-los para a cozinha para que sejam preparados e visualizar os pedidos pendentes para entrega.

Seguem as informações sobre o cliente:

> Somos **Burger Queen**, um fast food 24hrs.
>
>A nossa proposta de serviço 24 horas foi muito bem recebida e, para continuar a
>crescer, precisamos de um sistema que nos ajude a receber pedidos de nossos
>clientes.
>
>Nós temos 2 menus. Um muito simples para o café da manhã:
>
>| Ítem                      |Preço R$|
>|---------------------------|------|
>| Café americano            |    5 |
>| Café com leite            |    7 |
>| Misto Quente              |   10 |
>| Suco de fruta natural     |    7 |
>
>E outro menu para o resto do dia:
>
>| Ítem                      |Preço |
>|---------------------------|------|
>|**Hambúrgueres**           |   **R$**   |
>|Hambúrguer simples         |    10|
>|Hambúrguer duplo           |    15|
>|**Acompanhamentos**        |   **R$**   |
>|Batata frita               |     5|
>|Anéis de cebola            |     5|
>|**Bebidas**                |   **R$**   |
>|Água 500ml                 |     5|
>|Água 750ml                 |     7|
>|Refrigerante 500ml         |     7|
>|Refrigerante 750ml         |    10|
>
>**Importante:** Os clientes podem escolher entre hambúrgueres de carne bovina,
>frango ou vegetariano. Além disso, por um adicional de R$ 1,00 , eles podem
>adicionar queijo ou ovo.
>
>Nossos clientes são bastante indecisos, por isso é muito comum que eles mudem o
>seu pedido várias vezes antes de finalizar.

A interface mostra os dois menus (café da manhã e restante do dia), cada
um com todos os seus produtos. O usuário pode
adicionar produtos e a interface mostra o _resumo do pedido_ com o custo total.

O projeto pode ser acessado pelo link: https://burguer-queen-16772.firebaseapp.com/


## 2. Considerações Gerais

A interface foi construida utilizando React Hooks, React Route, Aphrodite, Firebase,  e foi feita para rodar em **tablets**. O aplicativo é um _Single Page App_.

O aplicativo utilizou scripts `npm-scripts` e teve `start`, `build` e `deploy`, que são responsáveis por iniciar, empacotar e implantar o aplicativo, respectivamente.

## 3. Critérios de aceitação cumpridos pelo projeto


#### [História de usuário 1] Garçom/Garçonete deve poder anotar o seu pedido

Eu como cliente quero poder anotar o meu pedido saber o valor de cada 
produto e poder enviar o pedido para a cozinha para ser preparado.

##### Critérios de aceitação que foram atendidos.

* Anotar o nome e mesa.
* Adicionar produtos aos pedidos.
* Excluir produtos.
* Ver resumo e o total da compra.
* Enviar o pedido para a cozinha (guardar em algum banco de dados).
* Funcionar bem e se adequar a um _tablet_.

##### Definição de pronto

* Foram feitos _testes_ de usabilidade e incorporado o _feedback_ do usuário.
* Foi feito o _deploy_ do aplicativo.

***

#### [História de usuário 2] Chefe de cozinha deve ver os pedidos

Eu como chefe de cozinha quero ver os pedidos dos clientes em ordem, poder marcar que estão prontos e poder notificar os garçons/garçonetes que o pedido está pronto para ser entregue ao cliente.

##### Critérios de aceitação que foram atendidos

* Ver os pedidos à medida em que são feitos.
* Marcar os pedidos que foram preparados e estão prontos para serem servidos.
* Ver o tempo que levou para preparar o pedido desde que chegou, até ser marcado como concluído.

##### Definição de pronto

* Foram feitos _testes_ de usabilidade e incorporado o _feedback_ do usuário.
* Foi feito o _deploy_ do aplicativo.

#### [História de usuário 3] Garçom/Garçonete deve ver os pedidos prontos para servir

Eu como garçom/garçonete quero ver os pedidos que estão prontos para entregá-los rapidamente aos clientes.

##### Critérios de aceitação

* Ver a lista de pedidos prontos para servir.
* Marque os pedidos que foram entregues.

##### Definição de pronto

* Foram feitos _testes_ de usabilidade e incorporado o _feedback_ do usuário.
* Foi feito o _deploy_ do aplicativo.
* Os dados foram mantidos intactos, mesmo depois que um pedido foi terminado para ter estatísticas no futuro.
