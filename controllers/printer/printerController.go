package printer

// import (
//     "fmt"
//     "github.com/gofiber/fiber/v2"
//     "github.com/kenshaw/escpos"
//     "github.com/kenshaw/escpos/driver"
// )

// type PrintRequest struct {
//     Header  string `json:"header"`
//     Items   []Item `json:"items"`
//     Footer  string `json:"footer"`
// }

// type Item struct {
//     Name     string  `json:"name"`
//     Quantity int     `json:"quantity"`
//     Price    float64 `json:"price"`
// }

// func formatReceipt(req PrintRequest) string {
//     receipt := fmt.Sprintf("%s\n\n", req.Header)
//     receipt += "--------------------------------\n"
//     for _, item := range req.Items {
//         receipt += fmt.Sprintf("%-20s %3d x %6.2f\n", item.Name, item.Quantity, item.Price)
//     }
//     receipt += "--------------------------------\n"
//     receipt += fmt.Sprintf("%s\n", req.Footer)
//     return receipt
// }

// func printHandler(c *fiber.Ctx) error {
//     var req PrintRequest
//     if err := c.BodyParser(&req); err != nil {
//         return c.Status(fiber.StatusBadRequest).SendString("Invalid request")
//     }

//     // Connect to the printer
//     p, err := escpos.New(driver.NewUSB())
//     if err != nil {
//         return c.Status(fiber.StatusInternalServerError).SendString("Failed to connect to printer")
//     }
//     defer p.Close()

//     // Format the receipt content
//     receiptContent := formatReceipt(req)

//     // Print the content
//     p.Write([]byte(receiptContent))
//     p.Formfeed()
//     p.Cut()

//     return c.SendString("Printed successfully")
// }
