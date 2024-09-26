<?php
include 'db.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case 'GET':
            getItems();
            break;
        case 'POST':
            createItem();
            break;
        case 'PUT':
            updateItem();
            break;
        case 'DELETE':
            deleteItem();
            break;
        default:
            echo json_encode(['message' => 'Invalid request']);
            break;
    }

    function getItems(){
        global $pdo;
        $sql = "SELECT * FROM items";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($items);
    }

    function createItem(){
        global $pdo;
        $data = json_decode(file_get_contents('php://input'), true);
         
            if(!isset($data['itemNumber'], $data['name'], $data['price'], $data['quantity'], $data['category'])){
                echo json_encode(['message' => 'Invalid input']);
                return;
            }

        $sql = "INSERT INTO items (itemNumber, name, price, quantity, category) VALUES (:itemNumber, :name, :price, :quantity, :category)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($data);
        
            echo json_encode(['message' => 'Item created successfully']);
        }

    function updateItem() {
        global $pdo;
        $data = json_decode(file_get_contents('php://input'), true);
        
            if (!isset($_GET['id'], $data['itemNumber'], $data['name'], $data['price'], $data['quantity'], $data['category'])) {
                echo json_encode(['message' => 'Invalid input']);
                return;
            }
        $sql = "UPDATE items SET itemNumber = :itemNumber, name = :name, price = :price, quantity = :quantity, category= :category WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $data['id'] = $_GET['id'];
        $stmt->execute($data);

        echo json_encode(['message'=>'Item updated successfully']);
    }

    function deleteItem(){
        global $pdo;

        if(!isset($_GET['id'])){
            echo json_encode(['message'=>'Invalid input']);
            return;
        }

        $sql = "DELETE FROM items WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $_GET['id']]);

        echo json_encode(['message' => 'item deleted successfully']);
    }
?>