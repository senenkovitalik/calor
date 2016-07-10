<?php 

class DB {

	public function connect_db() {

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

    public function save_product( $name, $calories, $proteins, $fats, $carbohydrates ) {

        $conn = $this->connect_db();

        if ( $conn !== null ) {
            $sql = "INSERT INTO products (name, calories, proteins, fats, carbohydrates)
            VALUES ('$name', '$calories', '$proteins', '$fats', '$carbohydrates')";

            $status = $conn->exec($sql);

            $conn = null;
        }

        if ( $status !== 0 ) {
            return true;    // Saved succesfuly
        } else {
            return false;   // Some problems
        }
    }

    public function read_all_products() {

        $conn = $this->connect_db();

        if ( $conn !== null ) {
            $sql = "SELECT * FROM products";
            $stat = $conn->query($sql);

            $conn = null;
        }

        return $stat;
    }

    public function remove_product( $name ) {
        
        $conn = $this->connect_db();

        if ( $conn !== null ) {
            $sql = "DELETE FROM products WHERE name='$name'";
            $stat = $conn->exec($sql);

            $conn = null;
        }

        if ( $status !== 0 ) {
            return true;    // Removed succesfuly
        } else {
            return false;   // Some problems
        }
    }

    public function update_product( $value, $value_type, $name ) {

        $conn = $this->connect_db();

        if ( $conn !== null ) {
            $sql = "UPDATE products SET ".$value_type."='$value' WHERE name='$name'";
            $stat = $conn->query($sql);

            $conn = null;
        }

        if ( $status !== 0 ) {
            return true;    // updated succesfuly
        } else {
            return false;   // some problems
        }
    }

    public function sort_product( $column, $order ) {

        $conn = $this->connect_db();

        if ( $conn !== null ) {

            $sql = "SELECT * FROM products ORDER BY products.$column $order";
            $stat = $conn->query($sql);

            $conn = null;
        }

        return $stat;
    }
}