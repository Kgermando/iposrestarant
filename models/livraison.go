package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Livraison struct {
	ID string `gorm:"type:text;primaryKey" json:"id"`
	gorm.Model

	OperatorName   string  `gorm:"not null" json:"operator_name"`
	AreaID         string  `json:"area_id"`
	Area           Area    `gorm:"foreignkey:AreaID"`
	CoutLivraison  float64 `gorm:"not null" json:"cout_livraison"`
	ClientID       string  `json:"client_id"`
	Client         Client  `gorm:"foreignKey:ClientID"`
	LivreurID      string  `json:"livreur_id"`
	Livreur        Livreur `gorm:"foreignKey:LivreurID"`
	PosID          string  `json:"pos_id"`
	Pos            Pos     `gorm:"foreignKey:PosID"`
	Status         string  `json:"status"`
	Signature      string  `json:"signature"`
	CodeEntreprise uint64  `json:"code_entreprise"`
	CommandeLines []CommandeLine `gorm:"foreignKey:LivraisonID"`
}

func (livraison *Livraison) BeforeCreate(tx *gorm.DB) (err error) {
	livraison.ID = uuid.New().String()
	return
}

type LivraisonArea struct {
	Fullname  string `json:"fullname"`
	Telephone string `json:"telephone"`
	Email     string `json:"email"`
	Count     string `json:"count"`
}
