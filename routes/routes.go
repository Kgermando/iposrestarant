package routes

import ( 

	"iposrestaurant/controllers/area"
	"iposrestaurant/controllers/auth"
	"iposrestaurant/controllers/commande"
	"iposrestaurant/controllers/commandeline"
	"iposrestaurant/controllers/composition"
	"iposrestaurant/controllers/contact"
	"iposrestaurant/controllers/dashboard"
	"iposrestaurant/controllers/entreprise"
	"iposrestaurant/controllers/finance"
	"iposrestaurant/controllers/client"
	"iposrestaurant/controllers/fournisseur"
	"iposrestaurant/controllers/ingredient" 
	"iposrestaurant/controllers/ingredientstock"
	"iposrestaurant/controllers/livraison" 
	"iposrestaurant/controllers/livreur" 
	"iposrestaurant/controllers/pos"
	"iposrestaurant/controllers/product"
	"iposrestaurant/controllers/plat"
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

	au.Post("/entreprise", entreprise.CreateEntreprise)

	// app.Use(middlewares.IsAuthenticated)

	au.Get("/user", auth.AuthUser)
	au.Put("/profil/info", auth.UpdateInfo)
	au.Put("/change-password", auth.ChangePassword)
	au.Post("/logout", auth.Logout)

	// User controller
	u := api.Group("/users")
	u.Get("/all", users.GetAllUsers)
	u.Get("/all/paginate", users.GetPaginatedUsers)
	u.Get("/all/paginate/:entreprise_id", users.GetPaginatedUserByID)
	u.Get("/all/:entreprise_id", users.GetUserByID)
	u.Get("/get/:id", users.GetUser)
	u.Post("/create", users.CreateUser)
	u.Put("/update/:id", users.UpdateUser)
	u.Delete("/delete/:id", users.DeleteUser)

	// Entreprise controller
	e := api.Group("/entreprises")
	e.Get("/all", entreprise.GetAllEntreprises)
	e.Get("/all/paginate", entreprise.GetPaginatedEntreprise)
	e.Get("/get/:id", entreprise.GetEntreprise)
	e.Post("/create", entreprise.CreateEntreprise)
	e.Put("/update/:id", entreprise.UpdateEntreprise)
	e.Delete("/delete/:id", entreprise.DeleteEntreprise)

	// POS controller
	p := api.Group("/pos")
	p.Get("/all", pos.GetAllPoss)
	p.Get("/all/:entreprise_id", pos.GetAllPosById)
	p.Get("/all/paginate", pos.GetPaginatedPos)
	p.Get("/all/paginate/:entreprise_id", pos.GetPaginatedPosByID)
	p.Get("/get/:id", pos.GetPos)
	p.Post("/create", pos.CreatePos)
	p.Put("/update/:id", pos.UpdatePos)
	p.Delete("/delete/:id", pos.DeletePos)

	// Table Box controller
	tb := api.Group("/table-box")
	tb.Get("/:code_entreprise/all/paginate", tablebox.GetPaginatedTableBoxEntreprise)
	tb.Get("/:code_entreprise/:pos_id/all/paginate", tablebox.GetPaginatedTableBox)
	tb.Get("/:code_entreprise/:pos_id/all", tablebox.GetAllTableBox)
	tb.Get("/get/:id", tablebox.GetTableBox)
	tb.Post("/create", tablebox.CreateTableBox)
	tb.Put("/update/:id", tablebox.UpdateTableBox)
	tb.Delete("/delete/:id", tablebox.DeleteTableBox)
 
	// Product controller
	pr := api.Group("/products")
	pr.Get("/:code_entreprise/all/paginate", product.GetPaginatedProductEntreprise)
	pr.Get("/:code_entreprise/:pos_id/all", product.GetAllProducts)
	pr.Get("/:code_entreprise/:pos_id/all/paginate", product.GetPaginatedProduct)
	pr.Get("/:code_entreprise/:pos_id/all/search", product.GetAllProductBySearch)
	pr.Get("/get/:id", product.GetProduct)
	pr.Post("/create", product.CreateProduct)
	pr.Put("/update/:id", product.UpdateProduct)
	pr.Delete("/delete/:id", product.DeleteProduct)

	// Stock controller
	s := api.Group("/stocks")
	s.Get("/all/:product_uuid", stock.GetAllStocks)
	s.Get("/all/paginate/:product_uuid", stock.GetPaginatedStock)
	s.Get("/all/total/:product_uuid", stock.GetTotalStock)
	s.Get("/all/get/:product_uuid", stock.GetStockMargeBeneficiaire)
	s.Get("/get/:id", stock.GetStock)
	s.Post("/create", stock.CreateStock)
	s.Put("/update/:id", stock.UpdateStock)
	s.Delete("/delete/:id", stock.DeleteStock)

	// Plat controller
	pl := api.Group("/plats")
	pl.Get("/:code_entreprise/all/paginate", plat.GetPaginatedPlatEntreprise)
	pl.Get("/:code_entreprise/:pos_id/all", plat.GetAllPlats)
	pl.Get("/:code_entreprise/:pos_id/all/paginate", plat.GetPaginatedPlat)
	pl.Get("/:code_entreprise/:pos_id/all/search", plat.GetAllPlatBySearch)
	pl.Get("/get/:id", plat.GetPlat)
	pl.Post("/create", plat.CreatePlat)
	pl.Put("/update/:id", plat.UpdatePlat)
	pl.Delete("/delete/:id", plat.DeletePlat)

	// Ingredient controller
	in := api.Group("/ingredients")
	in.Get("/:code_entreprise/all/paginate", ingredient.GetPaginatedIngredientEntreprise)
	in.Get("/:code_entreprise/:pos_id/all", ingredient.GetAllIngredients)
	in.Get("/:code_entreprise/:pos_id/all/paginate", ingredient.GetPaginatedIngredient)
	in.Get("/:code_entreprise/:pos_id/all/search", ingredient.GetAllIngredientBySearch)
	in.Get("/get/:id", ingredient.GetIngredient)
	in.Post("/create", ingredient.CreateIngredient)
	in.Put("/update/:id", ingredient.UpdateIngredient)
	in.Delete("/delete/:id", ingredient.DeleteIngredient)

	// ingredients Stock controller
	is := api.Group("/ingredients-stocks")
	is.Get("/all", ingredientstock.GetAllIngredientStocks)
	is.Get("/all/paginate/:ingredient_id", ingredientstock.GetPaginatedIngredientStock)
	is.Get("/:code_entreprise/total/get-all/:ingredient_id", ingredientstock.GetStatsIngredientStock)
	is.Get("/:code_entreprise/total/get/:ingredient_id", ingredientstock.GetStatsParIngredientStock)
	is.Get("/get/:id", ingredientstock.GetIngredientStock)
	is.Post("/create", ingredientstock.CreateIngredientStock)
	is.Put("/update/:id", ingredientstock.UpdateIngredientStock)
	is.Delete("/delete/:id", ingredientstock.DeleteIngredientStock)

	// Commande controller
	cmd := api.Group("/commandes")
	cmd.Get("/:code_entreprise/all/paginate", commande.GetPaginatedCommandeEntreprise)
	cmd.Get("/:code_entreprise/:pos_id/all", commande.GetAllCommandes)
	cmd.Get("/:code_entreprise/:pos_id/:table_box_id/all/paginate", commande.GetPaginatedCommandeByTableBox)
	cmd.Get("/:code_entreprise/:table_box_id/total", commande.GetTotalCommande)
	cmd.Get("/get/:id", commande.GetCommande)
	cmd.Post("/create", commande.CreateCommande)
	cmd.Put("/update/:id", commande.UpdateCommande)
	cmd.Delete("/delete/:id", commande.DeleteCommande)

	// Commande line controller
	cmdl := api.Group("/commandes-lines")
	cmdl.Get("/all", commandeline.GetAllCommandeLines)
	cmdl.Get("/all/:commande_id", commandeline.GetAllCommandeLineById)
	cmdl.Get("/all/livraison/:livraison_id", commandeline.GetAllCommandeLineByIdLivraison)
	cmdl.Get("/all/paginate/:commande_id", commandeline.GetPaginatedCommandeLineByID)
	cmdl.Get("/all/total/:product_uuid", commandeline.GetTotalCommandeLine)
	cmdl.Get("/get/:id", commandeline.GetCommandeLine)
	cmdl.Post("/create", commandeline.CreateCommandeLine)
	cmdl.Put("/update/:id", commandeline.UpdateCommandeLine)
	cmdl.Delete("/delete/:id", commandeline.DeleteCommandeLine)

	// Compositions controller
	comp := api.Group("/compositions")
	comp.Get("/:code_entreprise/:pos_id/all", composition.GetAllCompositions)
	comp.Get("/all/paginate/:plat_id", composition.GetPaginatedComposition)
	comp.Get("/all/total/:plat_id", composition.GetTotalComposition)
	comp.Get("/all/get/:plat_id", composition.GetCompositionMargeBeneficiaire)
	comp.Get("/get/:id", composition.GetComposition)
	comp.Post("/create", composition.CreateComposition)
	comp.Put("/update/:id", composition.UpdateComposition)
	comp.Delete("/delete/:id", composition.DeleteComposition)

	// Client controller
	cl := api.Group("/clients")
	cl.Get("/:code_entreprise/all", client.GetAllClients)
	cl.Get("/:code_entreprise/all/paginate", client.GetPaginatedClient)
	cl.Get("/get/:id", client.GetClient)
	cl.Post("/create", client.CreateClient)
	cl.Post("/uploads", client.UploadCsvDataClient)
	cl.Put("/update/:id", client.UpdateClient)
	cl.Delete("/delete/:id", client.DeleteClient)

	// Fournisseur controller
	fs := api.Group("/fournisseurs")
	fs.Get("/:code_entreprise/all", fournisseur.GetAllFournisseurs)
	fs.Get("/:code_entreprise/all/paginate", fournisseur.GetPaginatedFournisseur)
	fs.Get("/get/:id", fournisseur.GetFournisseur)
	fs.Post("/create", fournisseur.CreateFournisseur)
	fs.Put("/update/:id", fournisseur.UpdateFournisseur)
	fs.Delete("/delete/:id", fournisseur.DeleteFournisseur)

	// Livreur controller
	lv := api.Group("/livreurs")
	lv.Get("/:code_entreprise/all", livreur.GetAllLivreurs)
	lv.Get("/:code_entreprise/all/paginate", livreur.GetPaginatedLivreur)
	lv.Get("/get/:id", livreur.GetLivreur)
	lv.Post("/create", livreur.CreateLivreur)
	lv.Put("/update/:id", livreur.UpdateLivreur)
	lv.Delete("/delete/:id", livreur.DeleteLivreur)

	// Livraison controller
	lvs := api.Group("/livraisons")
	lvs.Get("/:code_entreprise/all/paginate", livraison.GetPaginatedLivraisonEntreprise)
	lvs.Get("/:code_entreprise/:pos_id/all", livraison.GetAllLivraisons)
	lvs.Get("/:code_entreprise/:pos_id/all/paginate", livraison.GetPaginatedLivraison)
	lvs.Get("/:code_entreprise/:pos_id/all/search", livraison.GetAllLivraisonBySearch)
	lvs.Get("/get/:id", livraison.GetLivraison)
	lvs.Post("/create", livraison.CreateLivraison)
	lvs.Put("/update/:id", livraison.UpdateLivraison)
	lvs.Delete("/delete/:id", livraison.DeleteLivraison)

	// Area controller
	are := api.Group("/areas")
	are.Get("/:code_entreprise/all", area.GetAllAreas)
	are.Get("/:code_entreprise/all/paginate", area.GetPaginatedArea)
	are.Get("/get/:id", area.GetArea)
	are.Post("/create", area.CreateArea)
	are.Put("/update/:id", area.UpdateArea)
	are.Delete("/delete/:id", area.DeleteArea)

	// Contact controller
	ctc := api.Group("/contacts")
	ctc.Get("/:code_entreprise/all", contact.GetAllContacts)
	ctc.Get("/:code_entreprise/all/paginate", contact.GetPaginatedContact)
	ctc.Get("/get/:id", contact.GetContact)
	ctc.Post("/create", contact.CreateContact)
	ctc.Put("/update/:id", contact.UpdateContact)
	ctc.Delete("/delete/:id", contact.DeleteContact)

	// Finance controller
	cais := api.Group("/caisses") 
	cais.Get("/:code_entreprise/all/total", finance.GetTotalAllCaisses)
	cais.Get("/:code_entreprise/all", finance.GetAllCaisses)
	cais.Get("/:code_entreprise/:pos_id/all", finance.GetAllCaisseByPos)
	cais.Get("/get/:id", finance.GetCaisse)
	cais.Post("/create", finance.CreateCaisse)
	cais.Put("/update/:id", finance.UpdateCaisse)
	cais.Delete("/delete/:id", finance.DeleteCaisse)

	// Caisse item Controller
	caisseItem := api.Group("/caisse-items")
	caisseItem.Get("/:code_entreprise/:caisse_id/all/paginate", finance.GetPaginatedCaisseItems)
	caisseItem.Get("/:code_entreprise/:caisse_id/all", finance.GetAllCaisseItems)
	caisseItem.Get("/get/:id", finance.GetCaisseItem)
	caisseItem.Post("/create", finance.CreateCaisseItem)
	caisseItem.Put("/update/:id", finance.UpdateCaisseItem)
	caisseItem.Delete("/delete/:id", finance.DeleteCaisseItem)

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
}
