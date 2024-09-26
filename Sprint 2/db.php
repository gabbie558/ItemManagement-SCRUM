<?php
$servername = "localhost";
$username = "root";
$password = "enriquezzZ@558";
$dbname = "item_management"; // Make sure this matches the name of the created database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>

