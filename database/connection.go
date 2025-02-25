package database

import (
	"fmt"
	"iposrestaurant/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	DNS := "database.db"
	connection, err := gorm.Open(sqlite.Open(DNS), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic("Could not connect to the database 😰!")
	}

	DB = connection
	sqlDB, err := connection.DB()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database Connected 🎉!")
 
	// Enable foreign key support
	if _, err := sqlDB.Exec("PRAGMA foreign_keys = ON;"); err != nil {
			log.Fatal(err)
	}

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
