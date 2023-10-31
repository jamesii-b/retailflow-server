# Nodejs-ERP

This is a backend system built for the frontend of ERP and POS system. 


## Routes


### Product Routes
`/add-product` <br>
`/sales`
`/sales/division` | Eg : ```/sales/pName=Marshmello``` <br>
`/sales/division?t=2023_10_20` ||  ```/sales/division? t=2023_10_20to2023_10_30``` -> Optional <br>
`/checkout`



### Graph Dataum & Widgests Routes

`/salesgraph` <br>
`/salesgraph/divison` | Eg: ```/salesgraph/pName=Marshmello```


## API Reference

### `Checkout`

```http
  POST /checkout
```

It accepts the data as as <br>
```
[ "1698000485604","1698000485604" ]
```
<br> Here these datum are individual product id.


### `Add-Product`


```http
  POST /add-product
```
Here, It expects data as: 
```
{
  "pID": '441144',
  "pName": 'JBL Headphone T450BT',
  "threshold": '100',
  "category": 'cat',
  "subCategory": 'subCat',
  "selfLocation": 'selfLoc',
  "image": 'img',
  "size": 'size',
  "sName": 'sName',
  "otherAttribute": 'others',
  "products": [ { "quantity": '150', "expireDate": '2023-12-22',"supplier": "111B Supplier","priceRate":150 },
  { "quantity": '150', "expireDate": '2023-10-22',"supplier": "111B Supplier","priceRate":150 } ]
}
```

### `Sales Graph Data`

```http
/salesgraph?t=2023-01-20to2023-02-20
```


```http
/salesgraph/:division
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Mongodb URL -> `URI`

Email to Notify -> `ADMIN_EMAIL`

`EMAIL`

`PASSWORD`

## Tech Stack


**Server:** Node, Express, Mongoose

