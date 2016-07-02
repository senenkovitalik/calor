<?php 

class DB
{
	public function connectToDB()
	{
		$servername = "127.0.0.1";
		$dbname = "calories";
        $username = "root";
        $password = "";

		try	{
			$conn = new PDO("mysql:host=$servername;dbname=$dbname;", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $conn;

		} catch(PDOException $e) {

            return null;
		}
	}

    public function saveProduct($name, $calories, $proteins, $fats, $carbohydrates)
    {
        $conn = $this->connectToDB();

        if($conn !== null)
        {
            $sql = "INSERT INTO products (name, calories, proteins, fats, carbohydrates)
            VALUES ('$name', '$calories', '$proteins', '$fats', '$carbohydrates')";

            $status = $conn->exec($sql);

            $conn = null;
        }

        if($status !== 0) {
            return "Product saved succesfuly";
        } else {
            return "Product not saved";
        }
    }

    public function readAllProducts()
    {
        $conn = $this->connectToDB();

        if($conn !== null)
        {
            $sql = "SELECT * FROM products";

            return $conn->query($sql);
        }
    }

    public function deleteProduct()
    {

    }
}

?>