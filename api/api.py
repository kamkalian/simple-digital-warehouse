import time
from flask import Flask, request
import pymongo
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["store_db"]
mycol = mydb["products"]

"""
x = mycol.delete_many({})
print(x.deleted_count, " documents deleted.") 

x = mycol.insert_one({
    'barcode': '4311501675250',
    'count': 0,
    'product_name': 'Thunfisch Filets'
})
"""

#product_list = [d for d in mycol.find()]
product_list = mycol.find()
#print(product_list)
for d in mycol.find():
    print(d)


app = Flask(__name__, static_folder='../build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/product_info/<barcode>', methods=['POST'])
def get_product_from_barcode(barcode):
    """Route /product_info

    Holt die Daten des Produkts um sie später als Info anzuzeigen.
    """
    x = _get_product(barcode)
    if x:
        return x

    return {'not_found': True}


@app.route('/product_in/<barcode>', methods=['POST', 'GET'])
def increase_from_barcode(barcode):
    """Route product_in
    
    Erhöht die Anzahl des Produkts.
    """
    x = _get_product(barcode)
    if x:
        _update_product(barcode, 1)
        x = _get_product(barcode)
        return x

    return {'not_found': True}


@app.route('/product_out/<barcode>', methods=['POST'])
def decrease_from_barcode(barcode):
    """Route /product_out
    
    Verringert die Anzahl des Produkts.
    """
    x = _get_product(barcode)
    if x:
        _update_product(barcode, -1)
        x = _get_product(barcode)
        return x

    return {'not_found': True}


@app.route('/product_new/<barcode>', methods=['POST'])
def insert_new_product_from_barcode(barcode):
    """Route /product_new

    Erstellt ein neues Product in der Datenbank.
    """
    json = request.json
    product_name = json['product_name']

    x = mycol.insert_one({
    'barcode': barcode,
    'count': 0,
    'product_name': product_name
    })
    return {'success': True}


@app.route('/product_list/', methods=['POST'])
def product_list():
    """Route /product_new
    """
    x = mycol.find({},{ "_id":0, "barcode": 1, "count": 1, "product_name": 1 })

    return json.dumps([d for d in x])


def _update_product(barcode, step):
    """Aktualisiert das Produkt auf der DB  
    """
    x = _get_product(barcode)
    count = x['count']
    count += step
    if count < 0:
        count = 0
    new_value = { "$set": { "count": count } }
    mycol.update_one({ "barcode": barcode }, new_value)


def _get_product(barcode):
    """Holt die Daten des Produkts aus der DB
    """
    myquery = { "barcode": barcode }
    x = mycol.find_one(myquery, { "_id":0, "barcode": 1, "count": 1, "product_name": 1 })
    return x
