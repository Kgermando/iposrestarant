package database

import (
	"fmt"
	"iposrestaurant/models"
	"iposrestaurant/utils"
	"strconv"
 
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var PGDB *gorm.DB
// var DBSQL *sql.DB

func PGConnect() {
	p := utils.Env("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32)
	if err != nil {
		panic("failed to parse PG database port 😵!")
	}

	DNS := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", utils.Env("DB_HOST"), port, utils.Env("DB_USER"), utils.Env("DB_PASSWORD"), utils.Env("DB_NAME"))
	connection, err := gorm.Open(postgres.Open(DNS), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic("Could not connect to the PG database 😰!")
	}

	PGDB = connection
	fmt.Println("Database PG Connected 🎉!")

	connection.AutoMigrate(
		&models.User{},           
		&models.Entreprise{},     
		&models.Client{},         
		&models.Commande{},       
		&models.CommandeLine{},   
		&models.Contact{},        
		&models.Fournisseur{},    
		&models.Pos{},            
		&models.Product{},        
		&models.Stock{},          
		&models.Ingredient{},     
		&models.Composition{},    
		&models.IngredientStock{},
		&models.Area{},           
		&models.Livraison{},      
		&models.Livreur{},        
		&models.Caisse{},         
		&models.CaisseItem{},     
	)
}
