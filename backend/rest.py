from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, errors
from bson import ObjectId
app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas

client = MongoClient('mongodb://localhost')
db = client["tecweb2"]  # Nombre de la base de datos
productos = db.Producto  # Definición de la colección
# Rutas para Productos
@app.route('/productos', methods=['POST'])
def add_producto():
    producto_data = request.json
    try:
        required_fields = ["title", "price", "description", "category", "image", "rating"]
        rating_fields = ["rate", "count"]

        missing_fields = [key for key in required_fields if key not in producto_data]
        if missing_fields:
            return jsonify({'error': f"Faltan campos requeridos en el producto: {missing_fields}"}), 400

        missing_rating_fields = [key for key in rating_fields if key not in producto_data.get("rating", {})]
        if missing_rating_fields:
            return jsonify({'error': f"Faltan campos requeridos en rating: {missing_rating_fields}"}), 400

        if not isinstance(producto_data["price"], (int, float)):
            return jsonify({'error': "El campo 'price' debe ser un número"}), 400
        if not isinstance(producto_data["rating"]["rate"], (int, float)):
            return jsonify({'error': "El campo 'rate' debe ser un número"}), 400
        if not isinstance(producto_data["rating"]["count"], int):
            return jsonify({'error': "El campo 'count' debe ser un entero"}), 400

        max_id_doc = productos.find_one(sort=[("id", -1)])
        new_id = max_id_doc["id"] + 1 if max_id_doc else 1
        producto_data["id"] = new_id
        producto_data["rating"]["count"] = producto_data["rating"]["count"]
        print(producto_data)
        result = productos.insert_one(producto_data)
        producto_data['_id'] = str(result.inserted_id)
        return jsonify(producto_data), 201

    except Exception as e:
        return jsonify({'error': f"Unexpected error: {str(e)}"}), 500
    


@app.route('/productos', methods=['GET'])
def get_productos():
    products = db.Producto.find()
    products_list = []
    for product in products:
        product['_id'] = str(product['_id'])
        products_list.append(product)
    print(products_list)
    return jsonify(products_list), 200



@app.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    try:
        producto_data = request.json
        result = productos.update_one(
            {'id': id},  # Buscar por el campo 'id'
            {
                '$set': {
                    'title': producto_data['title'],
                    'price': producto_data['price'],
                    'description': producto_data['description'],
                    'category': producto_data['category'],
                    'image': producto_data['image'],
                    'rating': {
                        'rate': producto_data['rating']['rate'],
                        'count': producto_data['rating']['count']
                    }
                }
            }
        )

        if result.matched_count == 0:
            return jsonify({'message': 'Producto no encontrado'}), 404

        return jsonify({'message': 'Producto actualizado'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Rutas para Carritos
@app.route('/carritos', methods=['POST'])
def add_carrito():
    carrito_data = request.json
    result = db.carritos.insert_one(carrito_data)
    return jsonify({'id': str(result.inserted_id)}), 201

@app.route('/carritos', methods=['GET'])
def get_carritos():
    carritos = list(db.carritos.find())
    for carrito in carritos:
        carrito['_id'] = str(carrito['_id'])
    return jsonify(carritos)

# Rutas para Usuarios
@app.route('/usuarios', methods=['POST'])
def add_usuario():
    usuario_data = request.json
    result = db.usuarios.insert_one(usuario_data)
    return jsonify({'id': str(result.inserted_id)}), 201

@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = list(db.usuarios.find())
    for usuario in usuarios:
        usuario['_id'] = str(usuario['_id'])
    return jsonify(usuarios)

if __name__ == '__main__':
    app.run(debug=True)
