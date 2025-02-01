package database

import (
	"fmt"
	"iposrestaurant/models"

	_ "github.com/lib/pq"
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
	fmt.Println("Database Connected 🎉!")

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
	)
}
