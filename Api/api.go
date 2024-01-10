package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)
type User struct{
	ID int `json:"id"`
	Name string `json:"name"`
	Surname string `json:"surname"`
	Department string `json:"department"`

}
func deleteUser(gc *gin.Context){
	db, err := sql.Open("sqlite3", "FillLabs.db")
	if err != nil {
		fmt.Println("e1")
		log.Fatal(err)
		
	}
	id := gc.Param("id")
	query := fmt.Sprintf("DELETE FROM users WHERE ID = " + id)

	// Query to fetch items from the 'users' table
	_,err = db.Exec(query)
	if err != nil {
		fmt.Println("e2")
		log.Fatal(err)
		
	}
	
	gc.JSON(http.StatusOK,gin.H{"message":"Deleted Succesfully"})
}


func getUserById(gc *gin.Context){
	db, err := sql.Open("sqlite3", "FillLabs.db")
	if err != nil {
		fmt.Println("e1")
		log.Fatal(err)
		
	}
	id := gc.Param("id")
	query := fmt.Sprintf("SELECT * FROM users WHERE ID = " + id)

	// Query to fetch items from the 'users' table
	rows, err := db.Query(query)
	if err != nil {
		fmt.Println("e2")
		log.Fatal(err)
		
	}
	defer rows.Close()

	// Iterate over the result set
	for rows.Next() {
		var user User 

		// Scan the values from the row into variables
		err := rows.Scan(&user.ID, &user.Name, &user.Surname, &user.Department)
		if err != nil {
			fmt.Println("e3")
			log.Fatal(err)
			
		}
		gc.IndentedJSON(http.StatusOK,user)
	}
	

	// Check for errors from iterating over rows
	if err := rows.Err(); err != nil {
		fmt.Println("e4")
		log.Fatal(err)
		
	}
}
func editUser(gc *gin.Context){
	//open database
	db, err := sql.Open("sqlite3", "FillLabs.db")
	if err != nil {
		fmt.Println("e1")
		log.Fatal(err)
		
	}
	//prepare the update statement
	id := gc.Param("id")
    stmt,err := db.Prepare("UPDATE users SET  name = ?,surname = ?,department = ? WHERE id = "+id)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()
	//create new user and bind json data
	var editedUser User
	if err := gc.BindJSON(&editedUser); err != nil {
        return
    }
	// Execute the SQL statement
	_, err = stmt.Exec(editedUser.Name, editedUser.Surname, editedUser.Department)
	if err != nil {
		log.Fatal(err)
	}
	//prepare return message
	gc.JSON(http.StatusNoContent,gin.H{"message":"edit on "+id+" is succesful"})
}
func getUsers(gc *gin.Context){
	//create slice to hold response
	var Users []User
	//open database
	db, err := sql.Open("sqlite3", "FillLabs.db")
	if err != nil {
		fmt.Println("e1")
		log.Fatal(err)
		
	}

	// Query to fetch items from the 'users' table
	rows, err := db.Query("SELECT ID, name, surname, department FROM users")
	if err != nil {
		fmt.Println("e2")
		log.Fatal(err)
		
	}
	defer rows.Close()

	// Iterate over the result set
	for rows.Next() {
		var user User 

		// Scan the values from the row into variables
		err := rows.Scan(&user.ID, &user.Name, &user.Surname, &user.Department)
		if err != nil {
			fmt.Println("e3")
			log.Fatal(err)
			
		}
		Users = append(Users, user)
		
	}
	
	// Check for errors from iterating over rows
	if err := rows.Err(); err != nil {
		fmt.Println("e4")
		log.Fatal(err)
		
	}
	gc.IndentedJSON(http.StatusOK,Users)
	
}
func createUser(gc *gin.Context){
	db, err := sql.Open("sqlite3", "FillLabs.db")
	if err != nil {
		log.Fatal(err)
	}
	

	// Create a new user
	var newUser User

    // Call BindJSON to bind the received JSON to
    // newUser
    if err := gc.BindJSON(&newUser); err != nil {
        return
    }
	// Insert the new user into the 'users' table
	_, err = db.Exec("INSERT INTO users (ID,NAME, SURNAME, DEPARTMENT) VALUES (?,?, ?, ?)",
	newUser.ID,newUser.Name, newUser.Surname, newUser.Department)
	if err != nil {
		gc.IndentedJSON(http.StatusBadRequest,err)
	}

    // Add the new album to the slice.
    
    gc.IndentedJSON(http.StatusCreated, newUser)

	
	

}


	

func main() {
	//Set the endpoints
	router:= gin.Default()
	router.GET("/users",getUsers)
    router.GET("/users/:id",getUserById)
	router.POST("/users",createUser)
	router.DELETE("/users/:id",deleteUser)
	router.PATCH("/users/:id",editUser)
	router.Run("localhost:8060")
	
	
}