package utils

import (
	"net"
	"time"
)

func IsInternetAvailable() bool {
	_, err := net.DialTimeout("tcp", "google.com:80", 5*time.Second)
	return err == nil
}