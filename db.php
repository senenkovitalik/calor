<?php 

class DB
{
	public function connectToDB()
	{
		$servername = "127.0.0.1";
		$dbname = "calories";
        $username = "root";
        $password = "";

		try
		{
			$conn = new PDO("mysql:host=$servername;dbname=$dbname;", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $conn;
		}
		catch(PDOException $e)
		{
            return null;
		}
	}

    public function createTable()
    {
    	$conn = $this->connectToDB;

        if($conn !== null)
        {
            $sql = "CREATE TABLE Products (
            id INT(3) AUTO_INCREMENT PRIMARY_KEY,
            name VARCHAR(30) NOT NULL,
            calories VARCHAR(30) NOT NULL,
            proteins VARCHAR(30) NOT NULL,
            fats VARCHAR(30) NOT NULL,
            carbohydrates VARCHAR(30) NOT NULL
            )";

            $conn->exec($sql);
            $conn = null;
        }
    }

    public function saveProduct($name, $calories, $proteins, $fats, $carbohydrates)
    {
        $conn = $this->connectToDB;

        if($conn !== null)
        {
            $sql = "INSERT INTO Products (name, calories, proteins, fats, carbohydrates)
            VALUES ('$name', '$calories', '$proteins', '$fats', '$carbohydrates')";

            $conn->exec($sql);
            $conn = null;
        }
    }

    public function readAllProducts()
    {
        echo "";
    }

    public function deleteProduct()
    {

    }
}

?>