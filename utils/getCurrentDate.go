package utils

import "time"

// GetCurrentDate returns the current date in YYYY-MM-DD format
func GetCurrentDate() string {
    return time.Now().Format("2006-01-02")
}