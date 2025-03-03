package models

import (
	"gorm.io/gorm"
)

type Livraison struct {
	gorm.Model

	UUID           string         `gorm:"not null;unique" json:"uuid"`
	OperatorName   string         `gorm:"not null" json:"operator_name"`
	AreaUUID       string         `json:"area_uuid"`
	Area           Area           `gorm:"foreignkey:AreaUUID;references:UUID"`
	CoutLivraison  float64        `gorm:"not null" json:"cout_livraison"`
	ClientUUID     string         `json:"client_uuid"`
	Client         Client         `gorm:"foreignKey:ClientUUID;references:UUID"`
	LivreurUUID    string         `json:"livreur_uuid"`
	Livreur        Livreur        `gorm:"foreignKey:LivreurUUID;references:UUID"`
	PosUUID        string         `json:"pos_uuid"`
	Pos            Pos            `gorm:"foreignKey:PosUUID;references:UUID"`
	Status         string         `json:"status"`
	Signature      string         `json:"signature"`
	CodeEntreprise uint64         `json:"code_entreprise"`
	CommandeLines  []CommandeLine `gorm:"foreignKey:LivraisonUUID;references:UUID"`
}

type LivraisonArea struct {
	Fullname  string `json:"fullname"`
	Telephone string `json:"telephone"`
	Email     string `json:"email"`
	Count     string `json:"count"`
}
