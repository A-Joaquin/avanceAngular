from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, errors
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from bson import ObjectId

app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas

# Configuración del secreto para JWT
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Cambia esto a una clave secreta real
jwt = JWTManager(app)

client = MongoClient('mongodb://localhost')
db = client["tecwebJuego"]  # Nombre de la base de datos
juegos = db.Juego  # Colección de Juegos
usuarios = db.Usuario  # Colección de Usuarios
carritos = db.Carrito  # Colección de Carritos


# Rutas para Juegos
@app.route('/juegos', methods=['POST'])
def add_juego():
    juego_data = request.json
    try:
        required_fields = ["title", "price", "description", "category", "image", "rating"]
        rating_fields = ["rate", "count"]

        missing_fields = [key for key in required_fields if key not in juego_data]
        if missing_fields:
            return jsonify({'error': f"Faltan campos requeridos en el juego: {missing_fields}"}), 400

        missing_rating_fields = [key for key in rating_fields if key not in juego_data.get("rating", {})]
        if missing_rating_fields:
            return jsonify({'error': f"Faltan campos requeridos en rating: {missing_rating_fields}"}), 400

        if not isinstance(juego_data["price"], (int, float)):
            return jsonify({'error': "El campo 'price' debe ser un número"}), 400
        if not isinstance(juego_data["rating"]["rate"], (int, float)):
            return jsonify({'error': "El campo 'rate' debe ser un número"}), 400
        if not isinstance(juego_data["rating"]["count"], int):
            return jsonify({'error': "El campo 'count' debe ser un entero"}), 400

        max_id_doc = juegos.find_one(sort=[("id", -1)])
        new_id = max_id_doc["id"] + 1 if max_id_doc else 1
        juego_data["id"] = new_id
        result = juegos.insert_one(juego_data)
        return jsonify({"id": new_id}), 201

    except errors.PyMongoError as e:
        return jsonify({'error': str(e)}), 500

@app.route('/juegos', methods=['GET'])
def get_juegos():
    juegos = db.Juego.find()
    juegos_list = []
    for juego in juegos:
        juego['_id'] = str(juego['_id'])
        juegos_list.append(juego)
    print(juegos_list)
    return jsonify(juegos_list), 200

@app.route('/juegos/<int:id>', methods=['PUT'])
def update_juego(id):
    juego_data = request.json
    result = juegos.update_one(
        {'id': id},
        {'$set': juego_data}
    )
    if result.matched_count == 0:
        return jsonify({'message': 'Juego no encontrado'}), 404
    return jsonify({'message': 'Juego actualizado'}), 200

@app.route('/juegos/<int:id>', methods=['DELETE'])
def delete_juego(id):
    result = juegos.delete_one({'id': id})
    if result.deleted_count == 0:
        return jsonify({'message': 'Juego no encontrado'}), 404
    return jsonify({'message': 'Juego eliminado'}), 200


@app.route('/juegos/<int:id>', methods=['GET'])
def get_juego(id):
    juego = juegos.find_one({'id': id})
    if juego:
        juego['_id'] = str(juego['_id'])
        return jsonify(juego), 200
    else:
        return jsonify({'message': 'Juego no encontrado'}), 404

# Rutas para Usuarios
@app.route('/usuarios', methods=['POST'])
def add_usuario():
    usuario_data = request.json

    try:
        # Buscar el ID más alto actual
        max_id_doc = usuarios.find_one(sort=[("id", -1)])
        new_id = max_id_doc["id"] + 1 if max_id_doc else 1
        
        # Asignar el nuevo ID al usuario
        usuario_data["id"] = new_id

        # Insertar el nuevo usuario
        result = usuarios.insert_one(usuario_data)
        return jsonify({'id': str(result.inserted_id)}), 201
    except errors.PyMongoError as e:
        return jsonify({'error': str(e)}), 500


@app.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios_list = list(usuarios.find())
    for usuario in usuarios_list:
        usuario['_id'] = str(usuario['_id'])
    return jsonify(usuarios_list), 200

@app.route('/usuarios/<int:id>', methods=['PUT'])
def update_usuario(id):
    usuario_data = request.json
    result = usuarios.update_one(
        {'id': id},
        {'$set': usuario_data}
    )
    if result.matched_count == 0:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify({'message': 'Usuario actualizado'}), 200

@app.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    result = usuarios.delete_one({'id': id})
    if result.deleted_count == 0:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify({'message': 'Usuario eliminado'}), 200

@app.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = usuarios.find_one({'id': id})
    if usuario:
        usuario['_id'] = str(usuario['_id'])
        return jsonify(usuario), 200
    else:
        return jsonify({'message': 'Usuario no encontrado'}), 404

# Rutas para Carritos
@app.route('/carritos', methods=['POST'])
def add_carrito():
    carrito_data = request.json
    result = carritos.insert_one(carrito_data)
    return jsonify({'id': str(result.inserted_id)}), 201

@app.route('/carritos', methods=['GET'])
def get_carritos():
    carritos_list = list(carritos.find())
    for carrito in carritos_list:
        carrito['_id'] = str(carrito['_id'])
    return jsonify(carritos_list), 200

@app.route('/carritos/<int:id>', methods=['DELETE'])
def delete_carrito(id):
    result = carritos.delete_one({'id': id})
    if result.deleted_count == 0:
        return jsonify({'message': 'Carrito no encontrado'}), 404
    return jsonify({'message': 'Carrito eliminado'}), 200

@app.route('/carritos/<int:id>', methods=['GET'])
def get_carrito(id):
    carrito = carritos.find_one({'id': id})
    if carrito:
        carrito['_id'] = str(carrito['_id'])
        return jsonify(carrito), 200
    else:
        return jsonify({'message': 'Carrito no encontrado'}), 404
    

@app.route('/carritos/usuario/<int:userId>', methods=['GET'])
def get_carritos_by_user(userId):
    try:
        # Buscar todos los carritos que tengan el userId especificado
        carritos_list = list(carritos.find({'userId': userId}))

        # Convertir ObjectId a string
        for carrito in carritos_list:
            carrito['_id'] = str(carrito['_id'])

        # Devuelve la lista de carritos, aunque esté vacía
        return jsonify(carritos_list), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

    


@app.route('/carritos/<int:carrito_id>', methods=['PUT'])
def update_carrito(carrito_id):
    try:
        carrito_data = request.json

        # Eliminar el campo _id si existe
        carrito_data.pop('_id', None)  # 'None' asegura que no se lance un KeyError si _id no está presente

        # Convertir cada producto a un diccionario con los campos requeridos
        carrito_data['products'] = [
            {
                'juegoId': int(product['juegoId']),
                'quantity': int(product['quantity'])
            } for product in carrito_data.get('products', [])
        ]

        # Realizar la actualización del carrito por el campo 'id'
        result = carritos.update_one(
            {'id': carrito_id},  # Busca por el campo 'id'
            {'$set': carrito_data}
        )

        if result.modified_count == 1:
            return jsonify({'message': 'Carrito actualizado exitosamente'}), 200
        else:
            return jsonify({'message': 'Carrito no encontrado o no se pudo actualizar'}), 404
    except Exception as e:
        return jsonify({'message': str(e)}), 400

@app.route('/auth/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    # Verifica las credenciales (deberías validar esto con tu base de datos)
    user = usuarios.find_one({'username': username})
    if user and user['password'] == password:
        token = create_access_token(identity=user['id'])
        return jsonify(token=token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@app.route('/auth/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    # Guardar nuevo usuario en la base de datos
    new_user = {'username': username, 'password': password}
    result = usuarios.insert_one(new_user)
    return jsonify({'id': str(result.inserted_id)}), 201


if __name__ == '__main__':
    app.run(debug=True)
