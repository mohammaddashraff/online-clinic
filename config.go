package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

var connectionStr string
var secretKey []byte
var allowedOrigin string
var appPort string

func initConfig() {
	loadEnvFile(".env")

	dbUser := getEnv("DB_USER", "postgres")
	dbPassword := getEnv("DB_PASSWORD", "postgres")
	dbName := getEnv("DB_NAME", "webclinic")
	dbHost := getEnv("DB_HOST", "localhost")
	dbPort := getEnv("DB_PORT", "5432")

	connectionStr = fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		dbUser,
		dbPassword,
		dbName,
		dbHost,
		dbPort,
	)

	secretKey = []byte(getEnv("JWT_SECRET", "change-me-in-development"))
	allowedOrigin = getEnv("CORS_ALLOWED_ORIGIN", "http://localhost:3000")
	appPort = getEnv("APP_PORT", "1234")
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func loadEnvFile(path string) {
	file, err := os.Open(path)
	if err != nil {
		return
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.SplitN(line, "=", 2)
		if len(parts) != 2 {
			continue
		}

		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])
		if key == "" {
			continue
		}

		_, exists := os.LookupEnv(key)
		if !exists {
			_ = os.Setenv(key, value)
		}
	}
}
