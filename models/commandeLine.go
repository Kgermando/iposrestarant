package models

import (
	"gorm.io/gorm"
)

type CommandeLine struct {
	gorm.Model

	UUID           string    `gorm:"not null;unique" json:"uuid"`
	CommandeUUID   string    `json:"commande_uuid"`
	Commande       Commande  `gorm:"foreignKey:CommandeUUID;references:UUID"`
	LivraisonUUID  string    `json:"livraison_uuid"` // LivraisonID est identique a commande dans le fonctionnement
	Livraison      Livraison `gorm:"foreignKey:LivraisonUUID;references:UUID"`
	ProductUUID    string    `json:"product_uuid"`                           // Added foreign key for Product ID
	Product        Product   `gorm:"foreignKey:ProductUUID;references:UUID"` // Updated foreign key reference
	PlatUUID       string    `json:"plat_uuid"`                              // Added foreign key for Plat ID
	Plat           Plat      `gorm:"foreignKey:PlatUUID;references:UUID"`    // Updated foreign key reference
	Quantity       uint64    `gorm:"not null" json:"quantity"`
	CodeEntreprise uint64    `json:"code_entreprise"`
}
