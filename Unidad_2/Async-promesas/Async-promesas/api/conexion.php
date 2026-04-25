<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
// datos de conexion a la base de datos
$servername = "LocalHost";
$username = "root";
$password = "";
$dbnname = "doguito_petshop";

//variable de conexion
$conn = new mysqli($servername, $username, $password, $dbnname);
if($conn->connect_error){
    http_response_code(500); //si sale un error en la conexion
    die(json_encode(["error"=>"conexion mala" . $conn->connect_error])); 
}
// metodos get, set, post, delete
$method = $_SERVER['REQUEST_METHOD'];
switch($method)
{
    case 'GET':
        $id = $_GET['id'] ?? null; //si el identificador esta vacio
        if($id){
            $stmt = $conn->prepare("SELECT * FROM cliente WHERE id = ?");// nuestra consulta sql, se usa ? para recuperar el id
            $stmt->bind_param("s", $id); //se asigna el valor del id a la consulta
            $stmt->execute(); //ejecutamos la consulta
            $result= $stmt->get_result(); //obtenemos el resultado de la consulta
            $cliente = $result->fetch_assoc(); //obtenemos el resultado como un arreglo asociativo

            //en caso de pruebas con consola
            echo json_encode($cliente); //devuelve la consulta por consola.
        }
        else{
            $result = $conn->query("SELECT * FROM cliente");
            $clientes = [];
            while($row = $result->fetch_assoc()){
                $clientes[] = $row; //se agrega cada fila al arreglo de clientes
            }

            //en caso de pruebas con consola
            echo json_encode($clientes);
        }
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true); //obtenemos los datos enviados en el cuerpo de la solicitud
        $id=$input['id'] ?? uniqid(); //si el id no se proporciona, se genera uno unico
        $nombre = $input['nombre'];
        $email = $input['email'];
        $stmt= $conn->prepare("INSERT INTO cliente (id,nombre,email) VALUES (?,?,?)"); //se usa el ? para los datos a añadir, dato obtenido
        $stmt->bind_param("sss", $id, $nombre, $email); //se asignan los valores a la consulta
        if($stmt->execute()){
            http_response_code(201); //creado exitosamente

            //verificacion
            echo json_encode(["message"=>"cliente creado", "id"=>$id]);
        }else{
            http_response_code(500); //error del servidor
            echo json_encode(["error"=>"error al crear cliente" . $stmt->error]);
        }
        break;
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true); //obtenemos los datos enviados en el cuerpo de la solicitud
        $id=$input['id']; //si el id no se proporciona, se genera uno unico
        $nombre = $input['nombre'];
        $email = $input['email'];
        $stmt= $conn->prepare("UPDATE cliente SET nombre=?,email=? WHERE id=?"); //se usa el ? para los datos a añadir, dato obtenido
        $stmt->bind_param("sss", $nombre, $email, $id); //se asignan los valores a la consulta
        if($stmt->execute()){
            http_response_code(201); //creado exitosamente

            //verificacion
            echo json_encode(["message"=>"actualizado correctamente", "id"=>$id]);
        }else{
            http_response_code(500); //error del servidor
            echo json_encode(["error"=>"error al actualizar cliente" . $stmt->error]);
        }
        break;
    case 'DELETE':
        $id=$_GET['id'];
        $stmt= $conn->prepare("DELETE FROM cliente WHERE id=?"); //se usa el ? para los datos a añadir, dato obtenido
        $stmt->bind_param("s", $id); //se asignan los valores a la consulta
        if($stmt->execute()){
            echo json_encode(["message"=>"cliente eliminado", "id"=>$id]);
        }else{
            http_response_code(500); //error del servidor
            echo json_encode(["error"=>"error al eliminar cliente" . $stmt->error]);
        }
        break;
    default:
    http_response_code(405); //metodo no permitido
    echo json_encode(["error"=>"metodo no permitido"]);
        break;
}
$conn->close(); //cerramos la conexion a la base de datos
?>