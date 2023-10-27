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


## Individual Route Definition

### `Checkout`
It accepts the json as <br>
Data=[<br>
"1698000485604","1698000485604" <br>
]
<br> Here these datum are individual product id.
