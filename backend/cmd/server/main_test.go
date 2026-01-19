package main

import (
	"bytes"
	"net/http/httptest"
	"testing"
	"time"

	json "github.com/goccy/go-json"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
)

// SetupApp initializes the fiber app for testing
// In a real app, you would refactor setup logic into a function to avoid duplication with main.go
func SetupApp() *fiber.App {
	app := fiber.New()

	api := app.Group("/api/v1")

	api.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":    "ok",
			"timestamp": time.Now(),
		})
	})

	api.Post("/leads", func(c *fiber.Ctx) error {
		var lead struct {
			Phone string `json:"phone"`
			Name  string `json:"name"`
		}
		if err := c.BodyParser(&lead); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}
		if lead.Phone == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Phone required"})
		}
		return c.Status(201).JSON(fiber.Map{"success": true})
	})

	return app
}

func TestHealthEndpoint(t *testing.T) {
	app := SetupApp()

	req := httptest.NewRequest("GET", "/api/v1/health", nil)
	resp, _ := app.Test(req)

	assert.Equal(t, 200, resp.StatusCode)
}

func TestCreateLeadSuccess(t *testing.T) {
	app := SetupApp()

	payload := map[string]string{
		"name":  "Test User",
		"phone": "1234567890",
	}
	body, _ := json.Marshal(payload)

	req := httptest.NewRequest("POST", "/api/v1/leads", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, _ := app.Test(req)

	assert.Equal(t, 201, resp.StatusCode)
}

func TestCreateLeadValidation(t *testing.T) {
	app := SetupApp()

	// Missing phone
	payload := map[string]string{
		"name": "Test User",
	}
	body, _ := json.Marshal(payload)

	req := httptest.NewRequest("POST", "/api/v1/leads", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")

	resp, _ := app.Test(req)

	assert.Equal(t, 400, resp.StatusCode)
}
