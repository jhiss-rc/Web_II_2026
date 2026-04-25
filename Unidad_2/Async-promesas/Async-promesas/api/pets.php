<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "LocalHost";
$username = "root";
$password = "";
$dbnname = "doguito_petshop";

$conn = new mysqli($servername, $username, $password, $dbnname);

if($conn->connect_error){
    http_response_code(500);
    die(json_encode(["error"=>"conexion mala" . $conn->connect_error])); 
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method)
{
    case 'GET':
        $id = $_GET['id'] ?? null;

        if($id){
            $stmt = $conn->prepare("SELECT * FROM pets WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result= $stmt->get_result();
            $pet = $result->fetch_assoc();

            echo json_encode($pet);
        }
        else{
            $result = $conn->query("SELECT * FROM pets");
            $pets = [];
            while($row = $result->fetch_assoc()){
                $pets[] = $row;
            }

            echo json_encode($pets);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);

        $id = $input['id'] ?? uniqid();
        $nombre = $input['nombre'];
        $edad = $input['edad'];           
        $raza = $input['raza'];          
        $peso = $input['peso'];          
        $cliente_id = $input['cliente_id']; 

        $stmt= $conn->prepare("INSERT INTO pets (id,nombre,edad,raza,peso,cliente_id) VALUES (?,?,?,?,?,?)");
        $stmt->bind_param("ssisis", $id, $nombre, $edad, $raza, $peso, $cliente_id);

        if($stmt->execute()){
            http_response_code(201);
            echo json_encode(["message"=>"pet creado", "id"=>$id]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"error al crear pet " . $stmt->error]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);

        $id = $input['id'];
        $nombre = $input['nombre'];
        $edad = $input['edad'];
        $raza = $input['raza'];
        $peso = $input['peso'];
        $cliente_id = $input['cliente_id'];


        $stmt= $conn->prepare("UPDATE pets SET nombre=?,edad=?,raza=?,peso=?,cliente_id=? WHERE id=?");
        $stmt->bind_param("sisdss", $nombre, $edad, $raza, $peso, $cliente_id, $id);

        if($stmt->execute()){
            http_response_code(201);
            echo json_encode(["message"=>"actualizado correctamente", "id"=>$id]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"error al actualizar pet " . $stmt->error]);
        }
        break;

    case 'DELETE':
        $id=$_GET['id'];


        $stmt= $conn->prepare("DELETE FROM pets WHERE id=?");
        $stmt->bind_param("s", $id);

        if($stmt->execute()){
            echo json_encode(["message"=>"pet eliminado", "id"=>$id]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"error al eliminar pet " . $stmt->error]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error"=>"metodo no permitido"]);
        break;
}

$conn->close();
?>