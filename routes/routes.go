package routes

import (
	"iposrestaurant/controllers/area"
	"iposrestaurant/controllers/auth"
	"iposrestaurant/controllers/client"
	"iposrestaurant/controllers/commande"
	"iposrestaurant/controllers/commandeline"
	"iposrestaurant/controllers/composition"
	"iposrestaurant/controllers/contact"
	"iposrestaurant/controllers/dashboard"
	"iposrestaurant/controllers/entreprise"
	"iposrestaurant/controllers/finance"
	"iposrestaurant/controllers/fournisseur"
	"iposrestaurant/controllers/ingredient"
	"iposrestaurant/controllers/ingredientstock"
	"iposrestaurant/controllers/livraison"
	"iposrestaurant/controllers/livreur"
	"iposrestaurant/controllers/plat"
	"iposrestaurant/controllers/pos"
	"iposrestaurant/controllers/printer"
	"iposrestaurant/controllers/product"
	"iposrestaurant/controllers/stock"
	"iposrestaurant/controllers/tablebox"
	"iposrestaurant/controllers/users"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Setup(app *fiber.App) {

	api := app.Group("/api", logger.New())

	// Authentification controller
	au := api.Group("/auth")
	au.Post("/register", auth.Register)
	au.Post("/login", auth.Login)
	au.Post("/forgot-password", auth.Forgot)
	au.Post("/reset/:token", auth.ResetPassword)

	au.Post("/entreprise/pg", entreprise.CreateEntreprisePG)

	// app.Use(middlewares.IsAuthenticated)

	au.Get("/user", auth.AuthUser)
	au.Put("/profil/info", auth.UpdateInfo)
	au.Put("/change-password", auth.ChangePassword)
	au.Post("/logout", auth.Logout)

	// User controller
	u := api.Group("/users")
	u.Get("/all", users.GetAllUsers)
	u.Get("/all/paginate", users.GetPaginatedUsers)
	u.Get("/all/paginate/:entreprise_uuid", users.GetPaginatedUserByID)
	u.Get("/all/:entreprise_uuid", users.GetUserByID)
	u.Get("/get/:uuid", users.GetUser)
	u.Post("/create", users.CreateUser)
	u.Put("/update/:uuid", users.UpdateUser)
	u.Delete("/delete/:uuid", users.DeleteUser)

	// Entreprise controller
	e := api.Group("/entreprises")
	e.Get("/all", entreprise.GetAllEntreprises)
	e.Get("/all/paginate", entreprise.GetPaginatedEntreprise)
	e.Get("/get/:uuid", entreprise.GetEntreprise)
	e.Post("/create", entreprise.CreateEntreprise)
	e.Put("/update/:uuid", entreprise.UpdateEntreprise)
	e.Delete("/delete/:uuid", entreprise.DeleteEntreprise)

	// PG
	epg := e.Group("/pg")
	epg.Get("/all", entreprise.GetAllEntreprisePGs)
	epg.Get("/all/paginate", entreprise.GetPaginatedEntreprisePG)
	epg.Get("/get/:uuid", entreprise.GetEntreprisePG)
	epg.Post("/create", entreprise.CreateEntreprisePG)
	epg.Put("/update/:uuid", entreprise.UpdateEntreprisePG)
	epg.Delete("/delete/:uuid", entreprise.DeleteEntreprisePG)


	// POS controller
	p := api.Group("/pos")
	p.Get("/all", pos.GetAllPoss)
	p.Get("/all/:entreprise_uuid", pos.GetAllPosById)
	p.Get("/all/paginate", pos.GetPaginatedPos)
	p.Get("/all/paginate/:entreprise_uuid", pos.GetPaginatedPosByID)
	p.Get("/get/:uuid", pos.GetPos)
	p.Post("/create", pos.CreatePos)
	p.Put("/update/:uuid", pos.UpdatePos)
	p.Delete("/delete/:uuid", pos.DeletePos)

	// Table Box controller
	tb := api.Group("/table-box")
	tb.Get("/:code_entreprise/all/paginate", tablebox.GetPaginatedTableBoxEntreprise)
	tb.Get("/:code_entreprise/:pos_uuid/all/paginate", tablebox.GetPaginatedTableBox)
	tb.Get("/:code_entreprise/:pos_uuid/all", tablebox.GetAllTableBox)
	tb.Get("/get/:uuid", tablebox.GetTableBox)
	tb.Post("/create", tablebox.CreateTableBox)
	tb.Put("/update/:uuid", tablebox.UpdateTableBox)
	tb.Delete("/delete/:uuid", tablebox.DeleteTableBox)

	// Product controller
	pr := api.Group("/products")
	pr.Get("/:code_entreprise/all/paginate", product.GetPaginatedProductEntreprise)
	pr.Get("/:code_entreprise/:pos_uuid/all", product.GetAllProducts)
	pr.Get("/:code_entreprise/:pos_uuid/all/paginate", product.GetPaginatedProduct)
	pr.Get("/:code_entreprise/:pos_uuid/all/search", product.GetAllProductBySearch)
	pr.Get("/get/:uuid", product.GetProduct)
	pr.Post("/create", product.CreateProduct)
	pr.Put("/update/:uuid", product.UpdateProduct)
	pr.Delete("/delete/:uuid", product.DeleteProduct)

	// Stock controller
	s := api.Group("/stocks")
	s.Get("/all/:product_uuid", stock.GetAllStocks)
	s.Get("/all/paginate/:product_uuid", stock.GetPaginatedStock)
	s.Get("/all/total/:product_uuid", stock.GetTotalStock)
	s.Get("/all/get/:product_uuid", stock.GetStockMargeBeneficiaire)
	s.Get("/get/:uuid", stock.GetStock)
	s.Post("/create", stock.CreateStock)
	s.Put("/update/:uuid", stock.UpdateStock)
	s.Delete("/delete/:uuid", stock.DeleteStock)

	// Plat controller
	pl := api.Group("/plats")
	pl.Get("/:code_entreprise/all/paginate", plat.GetPaginatedPlatEntreprise)
	pl.Get("/:code_entreprise/:pos_uuid/all", plat.GetAllPlats)
	pl.Get("/:code_entreprise/:pos_uuid/all/paginate", plat.GetPaginatedPlat)
	pl.Get("/:code_entreprise/:pos_uuid/all/search", plat.GetAllPlatBySearch)
	pl.Get("/get/:uuid", plat.GetPlat)
	pl.Post("/create", plat.CreatePlat)
	pl.Put("/update/:uuid", plat.UpdatePlat)
	pl.Delete("/delete/:uuid", plat.DeletePlat)

	// Ingredient controller
	in := api.Group("/ingredients")
	in.Get("/:code_entreprise/all/paginate", ingredient.GetPaginatedIngredientEntreprise)
	in.Get("/:code_entreprise/:pos_uuid/all", ingredient.GetAllIngredients)
	in.Get("/:code_entreprise/:pos_uuid/all/paginate", ingredient.GetPaginatedIngredient)
	in.Get("/:code_entreprise/:pos_uuid/all/search", ingredient.GetAllIngredientBySearch)
	in.Get("/get/:uuid", ingredient.GetIngredient)
	in.Post("/create", ingredient.CreateIngredient)
	in.Put("/update/:uuid", ingredient.UpdateIngredient)
	in.Delete("/delete/:uuid", ingredient.DeleteIngredient)

	// ingredients Stock controller
	is := api.Group("/ingredients-stocks")
	is.Get("/all", ingredientstock.GetAllIngredientStocks)
	is.Get("/all/paginate/:ingredient_uuid", ingredientstock.GetPaginatedIngredientStock)
	is.Get("/:code_entreprise/total/get-all/:ingredient_uuid", ingredientstock.GetStatsIngredientStock)
	is.Get("/:code_entreprise/total/get/:ingredient_uuid", ingredientstock.GetStatsParIngredientStock)
	is.Get("/get/:uuid", ingredientstock.GetIngredientStock)
	is.Post("/create", ingredientstock.CreateIngredientStock)
	is.Put("/update/:uuid", ingredientstock.UpdateIngredientStock)
	is.Delete("/delete/:uuid", ingredientstock.DeleteIngredientStock)

	// Commande controller
	cmd := api.Group("/commandes")
	cmd.Get("/:code_entreprise/all/paginate", commande.GetPaginatedCommandeEntreprise)
	cmd.Get("/:code_entreprise/:pos_uuid/all", commande.GetAllCommandes)
	cmd.Get("/:code_entreprise/:pos_uuid/:table_box_uuid/all/paginate", commande.GetPaginatedCommandeByTableBox)
	cmd.Get("/:code_entreprise/:table_box_uuid/total", commande.GetTotalCommande)
	cmd.Get("/get/:uuid", commande.GetCommande)
	cmd.Post("/create", commande.CreateCommande)
	cmd.Put("/update/:uuid", commande.UpdateCommande)
	cmd.Delete("/delete/:uuid", commande.DeleteCommande)

	// Commande line controller
	cmdl := api.Group("/commandes-lines")
	cmdl.Get("/all", commandeline.GetAllCommandeLines)
	cmdl.Get("/all/:commande_uuid", commandeline.GetAllCommandeLineById)
	cmdl.Get("/all/livraison/:livraison_uuid", commandeline.GetAllCommandeLineByIdLivraison)
	cmdl.Get("/all/paginate/:commande_uuid", commandeline.GetPaginatedCommandeLineByID)
	cmdl.Get("/all/total/:product_uuid", commandeline.GetTotalCommandeLine) 
	cmdl.Get("/get/:uuid", commandeline.GetCommandeLine)
	cmdl.Post("/create", commandeline.CreateCommandeLine)
	cmdl.Put("/update/:uuid", commandeline.UpdateCommandeLine)
	cmdl.Delete("/delete/:uuid", commandeline.DeleteCommandeLine)

	// Compositions controller
	comp := api.Group("/compositions")
	comp.Get("/:code_entreprise/:pos_uuid/all", composition.GetAllCompositions)
	comp.Get("/all/paginate/:plat_uuid", composition.GetPaginatedComposition)
	comp.Get("/all/:plat_uuid", composition.GetCompositionByPlatUUID)
	comp.Get("/all/total/:plat_uuid", composition.GetTotalComposition)
	comp.Get("/all/get/:plat_uuid", composition.GetCompositionMargeBeneficiaire)
	comp.Get("/get/:uuid", composition.GetComposition)
	comp.Post("/create", composition.CreateComposition)
	comp.Put("/update/:uuid", composition.UpdateComposition)
	comp.Delete("/delete/:uuid", composition.DeleteComposition)

	// Client controller
	cl := api.Group("/clients")
	cl.Get("/:code_entreprise/all", client.GetAllClients)
	cl.Get("/:code_entreprise/all/paginate", client.GetPaginatedClient)
	cl.Get("/get/:uuid", client.GetClient)
	cl.Post("/create", client.CreateClient)
	cl.Post("/uploads", client.UploadCsvDataClient)
	cl.Put("/update/:uuid", client.UpdateClient)
	cl.Delete("/delete/:uuid", client.DeleteClient)

	// Fournisseur controller
	fs := api.Group("/fournisseurs")
	fs.Get("/:code_entreprise/all", fournisseur.GetAllFournisseurs)
	fs.Get("/:code_entreprise/all/paginate", fournisseur.GetPaginatedFournisseur)
	fs.Get("/get/:uuid", fournisseur.GetFournisseur)
	fs.Post("/create", fournisseur.CreateFournisseur)
	cl.Post("/uploads", fournisseur.UploadCsvDataFournisseur)
	fs.Put("/update/:uuid", fournisseur.UpdateFournisseur)
	fs.Delete("/delete/:uuid", fournisseur.DeleteFournisseur)

	// Livreur controller
	lv := api.Group("/livreurs")
	lv.Get("/:code_entreprise/all", livreur.GetAllLivreurs)
	lv.Get("/:code_entreprise/all/paginate", livreur.GetPaginatedLivreur)
	lv.Get("/get/:uuid", livreur.GetLivreur)
	lv.Post("/create", livreur.CreateLivreur)
	lv.Put("/update/:uuid", livreur.UpdateLivreur)
	lv.Delete("/delete/:uuid", livreur.DeleteLivreur)

	// Livraison controller
	lvs := api.Group("/livraisons")
	lvs.Get("/:code_entreprise/all/paginate", livraison.GetPaginatedLivraisonEntreprise)
	lvs.Get("/:code_entreprise/:pos_uuid/all", livraison.GetAllLivraisons)
	lvs.Get("/:code_entreprise/:pos_uuid/all/paginate", livraison.GetPaginatedLivraison)
	lvs.Get("/:code_entreprise/:pos_uuid/all/search", livraison.GetAllLivraisonBySearch)
	lvs.Get("/get/:uuid", livraison.GetLivraison)
	lvs.Post("/create", livraison.CreateLivraison)
	lvs.Put("/update/:uuid", livraison.UpdateLivraison)
	lvs.Delete("/delete/:uuid", livraison.DeleteLivraison)

	// Area controller
	are := api.Group("/areas")
	are.Get("/:code_entreprise/all", area.GetAllAreas)
	are.Get("/:code_entreprise/all/paginate", area.GetPaginatedArea)
	are.Get("/get/:uuid", area.GetArea)
	are.Post("/create", area.CreateArea)
	are.Put("/update/:uuid", area.UpdateArea)
	are.Delete("/delete/:uuid", area.DeleteArea)

	// Contact controller
	ctc := api.Group("/contacts")
	ctc.Get("/:code_entreprise/all", contact.GetAllContacts)
	ctc.Get("/:code_entreprise/all/paginate", contact.GetPaginatedContact)
	ctc.Get("/get/:uuid", contact.GetContact)
	ctc.Post("/create", contact.CreateContact)
	ctc.Put("/update/:uuid", contact.UpdateContact)
	ctc.Delete("/delete/:uuid", contact.DeleteContact)

	// Finance controller
	cais := api.Group("/caisses")
	cais.Get("/:code_entreprise/all/total", finance.GetTotalAllCaisses)
	cais.Get("/:code_entreprise/all", finance.GetAllCaisses)
	cais.Get("/:code_entreprise/:pos_uuid/all", finance.GetAllCaisseByPos)
	cais.Get("/get/:uuid", finance.GetCaisse)
	cais.Post("/create", finance.CreateCaisse)
	cais.Put("/update/:uuid", finance.UpdateCaisse)
	cais.Delete("/delete/:uuid", finance.DeleteCaisse)

	// Caisse item Controller
	caisseItem := api.Group("/caisse-items")
	caisseItem.Get("/:code_entreprise/:caisse_uuid/all/paginate", finance.GetPaginatedCaisseItems)
	caisseItem.Get("/:code_entreprise/:caisse_uuid/all", finance.GetAllCaisseItems)
	caisseItem.Get("/total-today/:caisse_uuid", finance.GetTotalCaisseItemToday) 
	caisseItem.Get("/get/:uuid", finance.GetCaisseItem)
	caisseItem.Post("/create", finance.CreateCaisseItem)
	caisseItem.Put("/update/:uuid", finance.UpdateCaisseItem)
	caisseItem.Delete("/delete/:uuid", finance.DeleteCaisseItem) 

	// Dashboard controller
	dash := api.Group("/dashboard")
	dash.Get("/:code_entreprise/all/stocks", dashboard.GetPaginatedStock)
	dash.Get("/:code_entreprise/all/commandeline", dashboard.GetPaginatedCommandeLine)
	dash.Get("/:code_entreprise/all/entree-sortie", dashboard.GetEntreeSortie)
	dash.Get("/:code_entreprise/all/sales-profits", dashboard.GetSaleProfit)

	dash.Get("/:code_entreprise/all/total-product-in-stock", dashboard.GetTotalProductInStock)
	dash.Get("/:code_entreprise/all/total-stock-dispo-sortie", dashboard.GetTotalStockDispoSortie)
	dash.Get("/:code_entreprise/all/total-valeur-products", dashboard.GetTotalValeurProduct)
	dash.Get("/:code_entreprise/all/courbe-ventes-jour", dashboard.GetCourbeVente24h)
	dash.Get("/:code_entreprise/all/total-ventes-jour", dashboard.GetTotalVente24h)

	// Dash Plat Product controller
	dash.Get("/:code_entreprise/plats-products/ventes", dashboard.GetTotalPlatProductVendu)
	dash.Get("/:code_entreprise/plats-products/courbe-ventes-profits", dashboard.GetVenteProfitPlatProductMonth)
	dash.Get("/:code_entreprise/plats-products/table/tableau-sortie-products-plats", dashboard.GetTablePaginatedCmdLineSortieProductPlat)
	dash.Get("/:code_entreprise/plats-products/livraison/tableau-sortie-products-plats", dashboard.GetLivraisonPaginatedCmdLineSortieProductPlat)
	dash.Get("/:code_entreprise/all/stocks-disponible", dashboard.GetStockDisponible)
	dash.Get("/:code_entreprise/plats-products/percentage", dashboard.GetCommandeLineLivraisonPercentage)
	dash.Get("/:code_entreprise/plats-products/livraison-count", dashboard.GetCommandeLineLivraisonPieChartData)

	// Dash Caisses controller
	dash.Get("/:code_entreprise/caisses/total", dashboard.GetTotalCaisse)
	dash.Get("/:code_entreprise/caisses/total-ventes-journalieres", dashboard.GetTotalVentesParJour)
	dash.Get("/:code_entreprise/caisses/courbe-ventes-profits", dashboard.GetCourbeVenteProfit24h)
	dash.Get("/:code_entreprise/caisses/tableau-entrees-sorties", dashboard.GetTableauEntreeSorties)
	dash.Get("/:code_entreprise/caisses/total-par-caisse", dashboard.GetTotalParCaisse)

	// Dash Client Fournisseur et Livraison
	dash.Get("/:code_entreprise/cl-fseur-liv/total", dashboard.GetTotalClientFournisseur)
	dash.Get("/:code_entreprise/cl-fseur-liv/courbe-areas", dashboard.GetCourbeZoneLivraison)
	dash.Get("/:code_entreprise/cl-fseur-liv/best-clients", dashboard.GetClientsWithMostDeliveries)
	dash.Get("/:code_entreprise/cl-fseur-liv/best-fournisseurs", dashboard.GetTop10FournisseursWithMostStockValue)


	// Printer
	print := api.Group("/invoice")
	print.Get("", printer.CreatePrint)
}
