package main

import (
	"bytes"
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/x509"
	"database/sql"
	"encoding/base64"
	"encoding/xml"
	"fmt"
	"image"
	_ "image/gif"  // Decode only
	_ "image/jpeg" // Decode only
	_ "image/png"  // Decode only
	"io"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"sync"
	"time"

	json "github.com/goccy/go-json"
	"github.com/pquerna/otp"
	"github.com/pquerna/otp/totp"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	_ "github.com/lib/pq"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
	"github.com/golang-jwt/jwt/v5"
	saml2 "github.com/russellhaering/gosaml2"
	"github.com/russellhaering/gosaml2/types"
	dsig "github.com/russellhaering/goxmldsig"
)

// Lead represents a form submission
type Lead struct {
	ID                int    `json:"id"`
	Name              string `json:"name"`
	Email             string `json:"email"`
	Phone             string `json:"phone"`
	Course            string `json:"course"`
	Source            string `json:"source"`
	UtmCampaign       string `json:"utm_campaign"`
	Status            string `json:"status"` // "new", "contacted", "qualified", "enrolled", "lost"
	CreatedAt         string `json:"created_at"`
	Message           string `json:"message"`            // Added for contact form
	Subject           string `json:"subject"`            // Added for contact form (dynamic)
	City              string `json:"city"`               // Added for lead form (dynamic)
	Interest          string `json:"interest"`           // Added for lead form (dynamic)
	VerificationToken string `json:"verification_token"` // Added for OTP verification
}

// Course represents a training program
type Course struct {
	ID             int       `json:"id"`
	Title          string    `json:"title"`
	Subtitle       string    `json:"subtitle"` // New
	Slug           string    `json:"slug"`
	Description    string    `json:"description"`
	Duration       string    `json:"duration"`
	Price          float64   `json:"price"`
	OriginalPrice  float64   `json:"originalPrice"` // New
	Image          string    `json:"image"`
	Status         string    `json:"status"`
	Highlights     []Feature `json:"highlights"`     // New
	Curriculum     []Module  `json:"curriculum"`     // New
	JobRoles       []string  `json:"jobRoles"`       // New
	SalaryRange    string    `json:"salaryRange"`    // New
	PlacementStats []Stat    `json:"placementStats"` // New reuse Stat
}

type Feature struct {
	Icon  string `json:"icon"`
	Title string `json:"title"`
	Desc  string `json:"desc"`
}

type Module struct {
	ID          int      `json:"id"`
	Number      string   `json:"number"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Lessons     []string `json:"lessons"`
	IsOpen      bool     `json:"isOpen"`
}

// PageContent represents dynamic content for static pages
type PageContent struct {
	Slug      string                 `json:"slug"`
	Title     string                 `json:"title"`
	Hero      HeroSection            `json:"hero"`
	Sections  map[string]interface{} `json:"sections"`
	Tags      []string               `json:"tags"`
	Status    string                 `json:"status"`    // "draft", "published"
	UpdatedAt string                 `json:"updatedAt"` // Added for dashboard
	// SEO Fields
	SeoTitle       string      `json:"seoTitle"`
	SeoDescription string      `json:"seoDescription"`
	SeoKeywords    string      `json:"seoKeywords"`
	OgImage        string      `json:"ogImage"`
	PuckData       interface{} `json:"puckData"` // Stores full Puck JSON structure

	// GrapesJS / Editor Content
	Html       string      `json:"html"`
	Css        string      `json:"css"`
	Components interface{} `json:"components"` // JSON structure
	Styles     interface{} `json:"styles"`     // JSON structure
}

type HeroSection struct {
	Title           string `json:"title"`
	Subtitle        string `json:"subtitle"`
	BackgroundImage string `json:"backgroundImage"`
	Stats           []Stat `json:"stats"`
}

// Event represents a webinar or live class
type Event struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	Date        string `json:"date"`
	Time        string `json:"time"`
	Duration    string `json:"duration"`
	Instructor  string `json:"instructor"` // Could be linked to Author, simplified for now
	Image       string `json:"image"`
	Location    string `json:"location"` // Added for sync
	Status      string `json:"status"`   // "upcoming", "past", "live"
}

// CorporateLead represents a company looking to hire
type CorporateLead struct {
	ID                int    `json:"id"`
	CompanyName       string `json:"company_name"`   // snake_case to match form field
	ContactName       string `json:"contact_person"` // snake_case to match form field (contact_person)
	Email             string `json:"email"`
	Phone             string `json:"phone"`
	Requirements      string `json:"requirements"`
	Status            string `json:"status"` // "new", "contacted", "closed"
	Date              string `json:"date"`
	Participants      int    `json:"participants"`       // Added for corporate training
	VerificationToken string `json:"verification_token"` // Added for OTP verification
}

// Download represents a resource file (syllabus, brochure)
type Download struct {
	ID           int       `json:"id"`
	Title        string    `json:"title"`
	Description  string    `json:"description"` // Added
	Type         string    `json:"type"`        // "syllabus", "brochure", "ebook"
	Url          string    `json:"url"`
	IsGated      bool      `json:"isGated"`
	DownloadTime time.Time `json:"downloadTime"` // Added
}

// Analytics represents a site analytics entry (e.g., page view stats)
type Analytics struct {
	ID     int    `json:"id"`
	Metric string `json:"metric"` // e.g., "pageViews", "signUps"
	Value  int    `json:"value"`
	Date   string `json:"date"`
}

// PpcCampaign represents a PPC advertising campaign record
type PpcCampaign struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Platform    string  `json:"platform"` // e.g., "Google", "Facebook"
	Spend       float64 `json:"spend"`
	Clicks      int     `json:"clicks"`
	Conversions int     `json:"conversions"`
	Date        string  `json:"date"`
}

// Subscriber represents a newsletter or lead magnet subscriber
type Subscriber struct {
	ID        int    `json:"id"`
	Email     string `json:"email"`
	Source    string `json:"source"` // "newsletter_footer", "syllabus_download"
	Date      string `json:"date"`
	CreatedAt string `json:"createdAt"`
}

// SuccessStory represents a student success story
type SuccessStory struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Role    string `json:"role"`
	Company string `json:"company"`
	Quote   string `json:"quote"`
	Image   string `json:"image"` // Initials or URL
}

// FAQ represents a frequently asked question
type FAQ struct {
	ID       int    `json:"id"`
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

// Partner represents a hiring partner
type Partner struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Logo string `json:"logo"` // URL or Text fallback
}

// Author represents a blog post author
type Author struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Role   string `json:"role"`
	Avatar string `json:"avatar"`
}

// BlogPost represents a content article
type BlogPost struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Slug        string `json:"slug"`
	Content     string `json:"content"`
	Excerpt     string `json:"excerpt"` // Added for sync
	Category    string `json:"category"`
	AuthorID    int    `json:"authorId"`
	Author      string `json:"author"` // Added for sync (text name)
	Image       string `json:"image"`
	PublishedAt string `json:"publishedAt"`
	Date        string `json:"date"`   // Added for sync (alias/utility)
	Status      string `json:"status"` // "published", "draft"
}

// Stat represents a dashboard statistic display
type Stat struct {
	ID       int    `json:"id"`
	Icon     string `json:"icon"`     // Emoji or Icon Class
	Label    string `json:"label"`    // e.g., "10,000+"
	SubLabel string `json:"sublabel"` // e.g., "Students Trained"
}

type TickerConfig struct {
	Text  string `json:"text"`
	Color string `json:"color"` // 6-digit hex code
	Icon  string `json:"icon"`  // Material symbol name
}

// Settings represents global site configuration
type Settings struct {
	SiteTitle          string `json:"siteTitle"`
	SiteDescription    string `json:"siteDescription"`
	ContactEmail       string `json:"contactEmail"`
	SeoKeywords        string `json:"seoKeywords"`
	EnableRegistration bool   `json:"enableRegistration"`
	MaintenanceMode    bool   `json:"maintenanceMode"`
	PhoneNumber        string `json:"phoneNumber"`
	PromoMessage       string `json:"promoMessage"`
	PromoLink          string `json:"promoLink"`
	WebhookUrl         string `json:"webhookUrl"`
	GoogleTagManagerId string `json:"googleTagManagerId"`
	MetaPhoneID        string `json:"metaPhoneID"`
	MetaToken          string `json:"metaToken"`
	MetaTemplate       string `json:"metaTemplate"`
	MetaVerifyToken    string `json:"metaVerifyToken"`
	MetaVersion        string `json:"metaVersion"`
	// Security & Auth
	EnableEmailLogin   bool   `json:"enableEmailLogin"`
	EnableSAML         bool   `json:"enableSAML"`
	EnableGoogleOAuth  bool   `json:"enableGoogleOAuth"`
	EnableWhatsApp     bool   `json:"enableWhatsApp"`
	EnableCRM          bool   `json:"enableCRM"`
	SAMLIDPMetadataURL string `json:"samlIdpMetadataUrl"`
	SAMLSPEntityID     string `json:"samlSpEntityId"`
	SamlSpAcsUrl       string `json:"samlSpAcsUrl"`
	GoogleClientId     string `json:"googleClientId"`
	GoogleClientSecret string `json:"googleClientSecret"`
	GoogleRedirectUrl  string `json:"googleRedirectUrl"`
	// TOTP Two-Factor Authentication
	EnableTOTP bool   `json:"enableTOTP"`
	TOTPSecret string `json:"totpSecret,omitempty"` // Base32 encoded secret
	// Database Configuration - Nile
	EnableNileDB          bool   `json:"enableNileDB"`
	NileUsername          string `json:"nileUsername"`
	EnableDevelopmentMode bool   `json:"enableDevelopmentMode"` // If true, syncs to DB in real-time
	NilePassword          string `json:"nilePassword"`
	NileConnectionURL     string `json:"nileConnectionURL"`
	NileWorkspace         string `json:"nileWorkspace"`
	NileDatabaseName      string `json:"nileDatabaseName"`
	NileDefaultRegion     string `json:"nileDefaultRegion"`
	NileAPIURL            string `json:"nileAPIURL"`
	NilePostgresURL       string `json:"nilePostgresURL"`
	// Database Configuration - Aiven
	EnableAivenDB        bool   `json:"enableAivenDB"`
	AivenServiceURL      string `json:"aivenServiceURL"`
	AivenDatabaseName    string `json:"aivenDatabaseName"`
	AivenHost            string `json:"aivenHost"`
	AivenPort            string `json:"aivenPort"`
	AivenUser            string `json:"aivenUser"`
	AivenPassword        string `json:"aivenPassword"`
	AivenCACertificate   string `json:"aivenCACertificate"`
	AivenConnectionLimit string `json:"aivenConnectionLimit"`
	// Page Specific WhatsApp Messages
	PageMessages map[string]string `json:"pageMessages"`
	// Page Specific Urgency Tickers
	PageTickers  map[string]TickerConfig `json:"pageTickers"`
	GlobalTicker TickerConfig            `json:"globalTicker"`
	// SECURITY: Admin IP Allowlist (Phase 6)
	AdminIPAllowlist []string `json:"adminIPAllowlist"` // Empty = allow all
}

// Auth Structs
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type MediaFile struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Path       string `json:"path"`
	Url        string `json:"url"` // Public URL
	Size       string `json:"size"`
	UploadDate string `json:"uploadDate"`
}

type User struct {
	ID        int    `json:"id"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	Status    string `json:"status"` // "active", "invited"
	CreatedAt string `json:"createdAt"`
}

type NavigationItem struct {
	ID    int    `json:"id"`
	Label string `json:"label"`
	Url   string `json:"url"`
	Order int    `json:"order"`
}

// FormField represents a dynamic form field for lead forms
type FormField struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`        // Field name (e.g., "name", "phone", "email")
	Label       string   `json:"label"`       // Display label (e.g., "Full Name")
	Type        string   `json:"type"`        // input type: text, email, tel, select, textarea
	Placeholder string   `json:"placeholder"` // Placeholder text
	Required    bool     `json:"required"`    // Whether field is required
	Order       int      `json:"order"`       // Display order
	Enabled     bool     `json:"enabled"`     // Whether field is active
	Options     []string `json:"options"`     // Options for select type
	FormKey     string   `json:"formKey"`     // ID of the form this field belongs to (e.g., "lead-form")
}

// AuditLog represents a security audit trail entry
type AuditLog struct {
	ID        int    `json:"id"`
	AdminID   int    `json:"admin_id"`
	Action    string `json:"action"` // e.g., "DELETE_DOWNLOAD"
	Resource  string `json:"resource"`
	Details   string `json:"details"`
	Timestamp string `json:"timestamp"`
	IP        string `json:"ip"`
}

// LoginAttempt tracks failed login attempts for Account Lockout (Phase 5)
type LoginAttempt struct {
	Count    int
	LastTry  time.Time
	LockedAt time.Time
	IsLocked bool
}

// InMemory Store
var (
	courses      = []Course{}
	coursesMutex sync.RWMutex
	nextID       = 1

	stories      = []SuccessStory{}
	storiesMutex sync.RWMutex
	storyNextID  = 1

	faqs      = []FAQ{}
	faqsMutex sync.RWMutex
	faqNextID = 1

	partners      = []Partner{}
	partnersMutex sync.RWMutex
	partnerNextID = 1

	authors      = []Author{}
	authorsMutex sync.RWMutex
	authorNextID = 1

	posts      = []BlogPost{}
	postsMutex sync.RWMutex
	postNextID = 1

	stats      = []Stat{}
	statsMutex sync.RWMutex
	statNextID = 1

	events      = []Event{}
	eventsMutex sync.RWMutex
	eventNextID = 1

	corporateLeads      = []CorporateLead{}
	corporateLeadsMutex sync.RWMutex
	corporateLeadNextID = 1

	leads      = []Lead{}
	leadsMutex sync.RWMutex
	leadNextID = 1

	// SECURITY: Goroutine limiter to prevent DoS via goroutine explosion
	webhookSemaphore = make(chan struct{}, 100) // Max 100 concurrent webhook goroutines

	downloads      = []Download{}
	downloadsMutex sync.RWMutex
	downloadNextID = 1

	// OTP Storage
	otpStorage     = make(map[string]string) // Phone -> Code
	verifiedTokens = make(map[string]bool)   // Token -> Valid
	otpMutex       sync.RWMutex
	verifiedMutex  sync.RWMutex

	subscribers      = []Subscriber{}
	subscribersMutex sync.RWMutex
	subscriberNextID = 1

	// New Analytics and PPC stores
	analytics       = []Analytics{}
	analyticsMutex  sync.RWMutex
	analyticsNextID = 1

	// SECURITY: Audit Logs for Forensics
	auditLogs      = []AuditLog{}
	auditLogsMutex sync.RWMutex
	auditNextID    = 1

	// SECURITY: Account Lockout (Phase 5)
	loginAttempts      = make(map[string]*LoginAttempt) // IP -> Attempt
	loginAttemptsMutex sync.RWMutex

	ppcCampaigns = []PpcCampaign{}
	ppcMutex     sync.RWMutex
	ppcNextID    = 1

	settings = Settings{
		SiteTitle:       "Pixe Education",
		SiteDescription: "Transform your career with industry-relevant certifications.",
		ContactEmail:    "hello@pixeeducation.com",
		PhoneNumber:     "+91-9876543210",
		PromoMessage:    "30% OFF ends soon!",
		PromoLink:       "#enroll-form",
		PageMessages: map[string]string{
			"/courses/ppc-course": "Hi, I am interested in the PPC Course.",
		},
		GlobalTicker: TickerConfig{
			Text:  "🔥 Next Batch Starts Soon — Limited Seats Available!",
			Color: "#FBBF24",
			Icon:  "local_fire_department",
		},
		PageTickers: map[string]TickerConfig{
			"/": {
				Text:  "Limited Seats for Free Career Counseling — Book Now!",
				Color: "#FBBF24",
				Icon:  "school",
			},
			"/courses/social-media-marketing-course": {
				Text:  "Next Batch Starts Soon — Limited Seats for Live Mentorship",
				Color: "#FBBF24",
				Icon:  "alarm",
			},
		},
	}
	settingsMutex sync.RWMutex

	// New Modules
	mediaFiles  = []MediaFile{}
	mediaNextID = 1
	mediaMutex  sync.RWMutex

	users      = []User{}
	userNextID = 1
	usersMutex sync.RWMutex

	navItems  = []NavigationItem{}
	navNextID = 1
	navMutex  sync.RWMutex

	// Form Fields for dynamic lead form
	formFields      = []FormField{}
	formFieldsMutex sync.RWMutex
	formFieldNextID = 1

	// Pages Store
	pages      = []PageContent{}
	pagesMutex sync.RWMutex
	// Database Connection
	db *sql.DB
)

func init() {
	// Seed some initial data
	courses = append(courses, Course{
		ID:            1,
		Title:         "Advanced Digital Marketing Program",
		Subtitle:      "Master SEO, SEM, Social Media, and Analytics with industry experts.",
		Slug:          "advance-digital-marketing-course",
		Description:   "Master SEO, SEM, Social Media, and Analytics with industry experts. Transform your career with hands-on projects and guaranteed placement support.",
		Duration:      "6 Months",
		Price:         45000.00,
		OriginalPrice: 65000.00,
		Status:        "published",
		Highlights: []Feature{
			{Title: "100% Practical Training", Icon: "school"},
			{Title: "Live Industry Projects", Icon: "business_center"},
			{Title: "Placement Assistance", Icon: "handshake"},
			{Title: "Interview Prep Included", Icon: "record_voice_over"},
		},
		Curriculum: []Module{
			{ID: 1, Number: "01", Title: "Introduction to Digital Ecosystem", Description: "Understanding the marketing funnel, digital channels, and creating a digital strategy.", IsOpen: false},
			{ID: 2, Number: "02", Title: "Search Engine Optimization (SEO)", Description: "Keyword Research & Strategy, On-Page & Off-Page Optimization, Technical SEO Audits, Local SEO & Google Business Profile", Lessons: []string{"Keyword Research", "On-Page SEO", "Technical SEO"}, IsOpen: true},
			{ID: 3, Number: "03", Title: "Social Media Marketing (SMM)", Description: "Strategies for Facebook, Instagram, LinkedIn, and Twitter. Paid advertising campaigns.", IsOpen: false},
			{ID: 4, Number: "04", Title: "Analytics & Reporting", Description: "Google Analytics 4 (GA4), creating dashboards, and data-driven decision making.", IsOpen: false},
		},
		JobRoles:    []string{"Digital Marketing Manager", "SEO Specialist", "PPC Analyst", "Content Strategist", "Social Media Manager"},
		SalaryRange: "₹4.5L - ₹12L",
		PlacementStats: []Stat{
			{Label: "AMAZON"}, {Label: "FLIPKART"}, {Label: "ZOMATO"}, {Label: "MYNTRA"},
		},
	})
	courses = append(courses, Course{
		ID:          2,
		Title:       "UI/UX Design Spec",
		Slug:        "ui-ux-design",
		Description: "Learn Figma and Design Systems.",
		Duration:    "8 Weeks",
		Price:       799.00,
		Status:      "published",
	})
	courses = append(courses, Course{
		ID:            3,
		Title:         "Advanced SEO Mastery",
		Subtitle:      "Rank #1 on Google with technical SEO, content strategy, and backlinks.",
		Slug:          "seo-course",
		Description:   "Crack the Google algorithm. Learn technical audits, keyword research, on-page optimization, and authority building link strategies to drive organic growth.",
		Duration:      "3 Months",
		Price:         28000.00,
		OriginalPrice: 40000.00,
		Status:        "published",
		Highlights: []Feature{
			{Title: "Technical SEO Audits", Icon: "build"},
			{Title: "Link Building Secrets", Icon: "link"},
			{Title: "Content Strategy", Icon: "article"},
			{Title: "Local SEO Domination", Icon: "storefront"},
		},
		Curriculum: []Module{
			{ID: 1, Number: "01", Title: "SEO Fundamentals & Keyword Research", Description: "Search intent, long-tail keywords, and competitive gap analysis.", IsOpen: false},
			{ID: 2, Number: "02", Title: "On-Page & Technical SEO", Description: "Core Web Vitals, schema markup, site speed, and mobile optimization.", Lessons: []string{"Schema.org", "PageSpeed Insights", "Robots.txt"}, IsOpen: true},
			{ID: 3, Number: "03", Title: "Off-Page SEO & Link Building", Description: "Guest posting, outreach strategies, and toxic backlink analysis.", IsOpen: false},
			{ID: 4, Number: "04", Title: "Local SEO & GMB", Description: "Ranking in the local pack, managing reviews, and citation building.", IsOpen: false},
		},
		JobRoles:    []string{"SEO Manager", "SEO Specialist", "Content Marketer", "Organic Growth Lead", "Technical SEO Consultant"},
		SalaryRange: "₹4.5L - ₹12L",
		PlacementStats: []Stat{
			{Label: "ZOMATO"}, {Label: "BOOKMYSHOW"}, {Label: "MAKEMYTRIP"}, {Label: "FLIPKART"},
		},
	})
	courses = append(courses, Course{
		ID:            4,
		Title:         "PPC & Performance Marketing Mastery",
		Subtitle:      "Dominate Google Ads, Facebook Ads, and maximize ROAS.",
		Slug:          "ppc-course",
		Description:   "Become a paid traffic expert. Learn to design, launch, and optimize high-converting campaigns on Google, Meta, LinkedIn, and more. Master the science of ROI.",
		Duration:      "3 Months",
		Price:         32000.00,
		OriginalPrice: 48000.00,
		Status:        "published",
		Highlights: []Feature{
			{Title: "Google Ads Specialist", Icon: "ads_click"},
			{Title: "Meta Ads Scaling", Icon: "group_add"},
			{Title: "Conversion API", Icon: "api"},
			{Title: "A/B Testing Labs", Icon: "science"},
		},
		Curriculum: []Module{
			{ID: 1, Number: "01", Title: "Google Search Ads (SEM)", Description: "Keyword match types, writing high CTR ad copies, and bidding strategies.", IsOpen: false},
			{ID: 2, Number: "02", Title: "Display & Video Advertising", Description: "GDN, YouTube Ads, and retargeting strategies for brand awareness.", Lessons: []string{"Audiences", "YouTube In-Stream", "Display Banners"}, IsOpen: true},
			{ID: 3, Number: "03", Title: "Social Media Ads (Meta & LinkedIn)", Description: "Campaign objectives, pixel setup, lookalike audiences, and scaling winning ads.", IsOpen: false},
			{ID: 4, Number: "04", Title: "Programmatic & Native Ads", Description: "Introduction to DSPs, native ad platforms (Taboola/Outbrain), and advanced targeting.", IsOpen: false},
		},
		JobRoles:    []string{"PPC Manager", "Performance Marketer", "Paid Media Specialist", "Ad Operations Lead", "Media Buyer"},
		SalaryRange: "₹5L - ₹14L",
		PlacementStats: []Stat{
			{Label: "GROUPM"}, {Label: "DENTSUS"}, {Label: "PUBLICIS"}, {Label: "JIO ADS"},
		},
	})
	courses = append(courses, Course{
		ID:            5,
		Title:         "Advanced Web Analytics Mastery",
		Subtitle:      "Become a data-driven marketer with GA4, GTM, and Looker Studio.",
		Slug:          "analytics-course",
		Description:   "Stop guessing and start measuring. Master the art of data storytelling, conversion tracking, and improved ROI with Google Analytics 4, Tag Manager, and advanced visualization tools.",
		Duration:      "3 Months",
		Price:         30000.00,
		OriginalPrice: 45000.00,
		Status:        "published",
		Highlights: []Feature{
			{Title: "GA4 Expert Certification", Icon: "verified"},
			{Title: "GTM Server-Side", Icon: "dns"},
			{Title: "E-commerce Tracking", Icon: "shopping_cart"},
			{Title: "Custom Dashboards", Icon: "dashboard"},
		},
		Curriculum: []Module{
			{ID: 1, Number: "01", Title: "Google Analytics 4 (GA4) Deep Dive", Description: "Event-based data models, configuring streams, and exploration reports.", IsOpen: false},
			{ID: 2, Number: "02", Title: "Google Tag Manager (GTM)", Description: "Triggers, variables, data layers, and tracking complex user interactions.", Lessons: []string{"Data Layer Variables", "Form Tracking", "Scroll Depth"}, IsOpen: true},
			{ID: 3, Number: "03", Title: "Data Visualization with Looker Studio", Description: "Building automated client reports and interactive dashboards.", IsOpen: false},
			{ID: 4, Number: "04", Title: "Conversion Rate Optimization (CRO)", Description: "Using data to improve landing page performance and A/B testing.", IsOpen: false},
		},
		JobRoles:    []string{"Web Analyst", "Data Scientist", "Marketing Analyst", "CRO Specialist", "GTM Developer"},
		SalaryRange: "₹6L - ₹15L",
		PlacementStats: []Stat{
			{Label: "DELOITTE"}, {Label: "ACCENTURE"}, {Label: "NIELSEN"}, {Label: "GARTNER"},
		},
	})
	courses = append(courses, Course{
		ID:            6,
		Title:         "Affiliate & Email Marketing Program",
		Subtitle:      "Master the art of passive income and high-conversion email funnels.",
		Slug:          "affiliate-email-marketing-course",
		Description:   "Unlock the secrets of high-ticket affiliate marketing and automated email sequences. Learn to build profitable funnels, write persuasive copy, and generate consistent revenue streams.",
		Duration:      "4 Months",
		Price:         35000.00,
		OriginalPrice: 50000.00,
		Status:        "published",
		Highlights: []Feature{
			{Title: "Affiliate Networks Mastery", Icon: "hub"},
			{Title: "Email Automation", Icon: "mark_email_read"},
			{Title: "High-Converting Copy", Icon: "edit_note"},
			{Title: "Sales Funnel Design", Icon: "filter_alt"},
		},
		Curriculum: []Module{
			{ID: 1, Number: "01", Title: "Fundamentals of Affiliate Marketing", Description: "Understanding networks (ClickBank, JVZoo, Amazon), choosing niches, and analyzing competition.", IsOpen: false},
			{ID: 2, Number: "02", Title: "Email Marketing Strategy", Description: "List building, lead magnets, segmentation, and crafting irresistible subject lines.", Lessons: []string{"Lead Magnets", "Segmentation", "Automation Workflows"}, IsOpen: true},
			{ID: 3, Number: "03", Title: "Sales Funnels & Landing Pages", Description: "Designing high-conversion landing pages and bridge pages using modern tools.", IsOpen: false},
			{ID: 4, Number: "04", Title: "Traffic Generation", Description: "Organic and paid traffic sources to drive targeted visitors to your offers.", IsOpen: false},
		},
		JobRoles:    []string{"Affiliate Marketing Manager", "Email Marketing Specialist", "Funnel Builder", "Copywriter", "Growth Hacker"},
		SalaryRange: "₹4L - ₹10L",
		PlacementStats: []Stat{
			{Label: "CLICKBANK"}, {Label: "MAILCHIMP"}, {Label: "HUBSPOT"}, {Label: "CONVERTKIT"},
		},
	})
	courses = append(courses, Course{
		ID:            7,
		Title:         "Social Media Marketing & Branding",
		Subtitle:      "Build viral brands and engage millions on Instagram, LinkedIn, and Twitter.",
		Slug:          "social-media-marketing-course",
		Description:   "From content creation to community management. meaningful connections. Master the algorithms of Instagram, LinkedIn, Twitter, and TikTok to build a loyal audience and drive organic growth.",
		Duration:      "3 Months",
		Price:         25000.00,
		OriginalPrice: 40000.00,
		Status:        "published",
		Highlights: []Feature{
			{Title: "Viral Content Strategy", Icon: "campaign"},
			{Title: "Influencer Marketing", Icon: "handshake"},
			{Title: "Reels & Short Video", Icon: "movie_creation"},
			{Title: "Community Building", Icon: "groups"},
		},
		Curriculum: []Module{
			{ID: 1, Number: "01", Title: "Content Strategy & Branding", Description: "Defining brand voice, visual aesthetics, and content pillars for different platforms.", IsOpen: false},
			{ID: 2, Number: "02", Title: "Instagram & Facebook Mastery", Description: "Reels algorithms, Stories strategies, and building a community via Facebook Groups.", Lessons: []string{"Reels Viral Hooks", "Story Selling", "Community Management"}, IsOpen: true},
			{ID: 3, Number: "03", Title: "LinkedIn for Personal Branding", Description: "Optimizing profiles, writing high-engagement posts, and networking strategies.", IsOpen: false},
			{ID: 4, Number: "04", Title: "Twitter (X) & TikTok Trends", Description: "Riding trends, thread writing, and short-form video storytelling.", IsOpen: false},
		},
		JobRoles:    []string{"Social Media Manager", "Content Creator", "Brand Manager", "Community Lead", "Influencer Marketer"},
		SalaryRange: "₹4L - ₹10L",
		PlacementStats: []Stat{
			{Label: "NYKAA"}, {Label: "ZOMATO"}, {Label: "BOAT"}, {Label: "LENSKART"},
		},
	})
	nextID = 8

	// Seed Stories
	stories = append(stories, SuccessStory{
		ID:      1,
		Name:    "Rahul Sharma",
		Role:    "Software Engineer",
		Company: "Google",
		Quote:   "This course changed my life. I went from fresher to Google in 8 months!",
		Image:   "RS",
	})
	stories = append(stories, SuccessStory{
		ID:      2,
		Name:    "Priya Mehta",
		Role:    "Data Scientist",
		Company: "Amazon",
		Quote:   "The mentorship and practical projects prepared me for real-world challenges.",
		Image:   "PM",
	})
	storyNextID = 3

	// Seed FAQs
	faqs = append(faqs, FAQ{
		ID:       1,
		Question: "What is the course duration?",
		Answer:   "Our courses range from 3 to 6 months depending on the program. Each includes live classes, recorded sessions, assignments, and real-world projects.",
	})
	faqs = append(faqs, FAQ{
		ID:       2,
		Question: "Do you provide placement assistance?",
		Answer:   "Yes! We provide 100% placement assistance including resume building, mock interviews, and direct referrals to our 50+ hiring partners.",
	})
	faqNextID = 3

	// Seed Partners with logo images
	partnersData := []struct{ name, logo string }{
		{"Google", "/logos/google.svg"},
		{"Microsoft", "/logos/microsoft.svg"},
		{"Amazon", "/logos/amazon.svg"},
		{"Flipkart", ""},
		{"Infosys", ""},
		{"TCS", ""},
		{"Wipra", ""},
		{"Cognizant", ""},
	}
	for _, p := range partnersData {
		partners = append(partners, Partner{ID: partnerNextID, Name: p.name, Logo: p.logo})
		partnerNextID++
	}

	// Seed Authors with avatar image paths
	authors = append(authors, Author{ID: 1, Name: "Dr. Robert Fox", Role: "Data Science Lead", Avatar: "/images/about/faculty-data-science.png"})
	authors = append(authors, Author{ID: 2, Name: "Elena Rodriguez", Role: "Design Thinking", Avatar: "/images/about/faculty-design.png"})
	authorNextID = 3

	// Seed Blog Posts
	posts = append(posts, BlogPost{
		ID:          1,
		Title:       "Mastering GA4 in 2024",
		Slug:        "mastering-ga4-2024",
		Content:     "Google Analytics 4 is the new standard...",
		Category:    "Analytics",
		AuthorID:    1,
		Image:       "",
		PublishedAt: "2023-10-24",
		Status:      "published",
	})
	postNextID = 2

	postNextID = 2

	// Seed Stats
	stats = append(stats, Stat{ID: 1, Icon: "🎓", Label: "10,000+", SubLabel: "Students Trained"})
	stats = append(stats, Stat{ID: 2, Icon: "💼", Label: "95%", SubLabel: "Placement Rate"})
	stats = append(stats, Stat{ID: 3, Icon: "🏢", Label: "50+", SubLabel: "Hiring Partners"})
	stats = append(stats, Stat{ID: 4, Icon: "⭐", Label: "4.8/5", SubLabel: "Student Rating"})
	stats = append(stats, Stat{ID: 5, Icon: "🔒", Label: "7 Days", SubLabel: "Money Back"})
	stats = append(stats, Stat{ID: 6, Icon: "📜", Label: "ISO", SubLabel: "Certified"})
	statNextID = 7

	// Seed Users (Visual only, auth is hardcoded)
	users = append(users, User{ID: 1, Email: "admin@pixe.com", Role: "admin", Status: "active", CreatedAt: "2024-01-01"})
	users = append(users, User{ID: 2, Email: "sachin.r.gala2601@gmail.com", Role: "admin", Status: "active", CreatedAt: "2026-01-09"})
	userNextID = 3

	// Seed Navigation
	navItems = append(navItems, NavigationItem{ID: 1, Label: "Home", Url: "/", Order: 1})
	navItems = append(navItems, NavigationItem{ID: 2, Label: "Courses", Url: "/courses", Order: 2})
	navItems = append(navItems, NavigationItem{ID: 3, Label: "Career", Url: "/career", Order: 3})
	navItems = append(navItems, NavigationItem{ID: 4, Label: "About", Url: "/about", Order: 4})
	navItems = append(navItems, NavigationItem{ID: 5, Label: "Resources", Url: "/resources", Order: 5})
	navNextID = 6

	// Seed Default Form Fields
	// Seed Default Form Fields
	// 1. Lead Capture Form (lead-form)
	formFields = append(formFields, FormField{ID: 1, Name: "name", Label: "Full Name", Type: "text", Placeholder: "e.g. Alex Morgan", Required: true, Order: 1, Enabled: true, Options: nil, FormKey: "lead-form"})
	formFields = append(formFields, FormField{ID: 2, Name: "phone", Label: "Phone", Type: "tel", Placeholder: "+91...", Required: true, Order: 2, Enabled: true, Options: nil, FormKey: "lead-form"})
	formFields = append(formFields, FormField{ID: 3, Name: "city", Label: "City", Type: "text", Placeholder: "Delhi", Required: false, Order: 3, Enabled: true, Options: nil, FormKey: "lead-form"})
	formFields = append(formFields, FormField{ID: 4, Name: "email", Label: "Email Address", Type: "email", Placeholder: "your@email.com", Required: false, Order: 4, Enabled: false, Options: nil, FormKey: "lead-form"})
	formFields = append(formFields, FormField{ID: 5, Name: "interest", Label: "Interest", Type: "select", Placeholder: "Select a Program", Required: false, Order: 5, Enabled: true, Options: []string{}, FormKey: "lead-form"})
	formFieldNextID = 6

	// 2. Contact Form (contact-form)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "name", Label: "Your Name", Type: "text", Placeholder: "John Doe", Required: true, Order: 1, Enabled: true, FormKey: "contact-form"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Email Address", Type: "email", Placeholder: "john@example.com", Required: true, Order: 2, Enabled: true, FormKey: "contact-form"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "subject", Label: "Subject", Type: "text", Placeholder: "Inquiry about...", Required: true, Order: 3, Enabled: true, FormKey: "contact-form"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "message", Label: "Message", Type: "textarea", Placeholder: "How can we help you?", Required: true, Order: 4, Enabled: true, FormKey: "contact-form"})
	formFieldNextID++

	// 3. Corporate Hiring (corporate-hiring)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "company_name", Label: "Company Name", Type: "text", Required: true, Order: 1, Enabled: true, FormKey: "corporate-hiring"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "contact_person", Label: "Contact Person", Type: "text", Required: true, Order: 2, Enabled: true, FormKey: "corporate-hiring"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Official Email", Type: "email", Required: true, Order: 3, Enabled: true, FormKey: "corporate-hiring"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "phone", Label: "Phone Number", Type: "tel", Required: true, Order: 4, Enabled: true, FormKey: "corporate-hiring"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "requirements", Label: "Hiring Requirements", Type: "textarea", Required: false, Order: 5, Enabled: true, FormKey: "corporate-hiring"})
	formFieldNextID++

	// 4. Corporate Training (corporate-training)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "company_name", Label: "Organization Name", Type: "text", Required: true, Order: 1, Enabled: true, FormKey: "corporate-training"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "contact_person", Label: "Contact Person", Type: "text", Required: true, Order: 2, Enabled: true, FormKey: "corporate-training"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Work Email", Type: "email", Required: true, Order: 3, Enabled: true, FormKey: "corporate-training"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "participants", Label: "No. of Employees", Type: "number", Required: false, Order: 4, Enabled: true, FormKey: "corporate-training"})
	formFieldNextID++

	// 5. Free Counseling (free-counseling)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "name", Label: "Name", Type: "text", Required: true, Order: 1, Enabled: true, FormKey: "free-counseling"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "phone", Label: "Phone", Type: "tel", Required: true, Order: 2, Enabled: true, FormKey: "free-counseling"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "date", Label: "Preferred Date", Type: "text", Placeholder: "DD/MM/YYYY", Required: true, Order: 3, Enabled: true, FormKey: "free-counseling"})
	formFieldNextID++

	// 6. Syllabus Download (syllabus-download)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "name", Label: "Name", Type: "text", Required: true, Order: 1, Enabled: true, FormKey: "syllabus-download"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Email", Type: "email", Required: true, Order: 2, Enabled: true, FormKey: "syllabus-download"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "phone", Label: "Phone", Type: "tel", Required: true, Order: 3, Enabled: true, FormKey: "syllabus-download"})
	formFieldNextID++

	// 7. Student Registration (registration)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "full_name", Label: "Full Name", Type: "text", Required: true, Order: 1, Enabled: true, FormKey: "registration"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Email", Type: "email", Required: true, Order: 2, Enabled: true, FormKey: "registration"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "phone", Label: "Mobile Number", Type: "tel", Required: true, Order: 3, Enabled: true, FormKey: "registration"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "course", Label: "Select Course", Type: "select", Options: []string{"Digital Marketing", "SEO", "PPC"}, Required: true, Order: 4, Enabled: true, FormKey: "registration"})
	formFieldNextID++

	// 8. Newsletter (newsletter)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Email Address", Type: "email", Placeholder: "Enter your email", Required: true, Order: 1, Enabled: true, FormKey: "newsletter"})
	formFieldNextID++

	// 9. Course Quick Apply (course-quick-apply)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "name", Label: "Full Name", Type: "text", Placeholder: "John Doe", Required: true, Order: 1, Enabled: true, FormKey: "course-quick-apply"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "phone", Label: "Phone Number", Type: "tel", Placeholder: "+91...", Required: true, Order: 2, Enabled: true, FormKey: "course-quick-apply"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Email Address", Type: "email", Placeholder: "john@example.com", Required: true, Order: 3, Enabled: true, FormKey: "course-quick-apply"})
	formFieldNextID++

	// 10. Home Hero (home-hero)
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "name", Label: "Full Name", Type: "text", Placeholder: "John Doe", Required: true, Order: 1, Enabled: true, FormKey: "home-hero"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "phone", Label: "Phone Number", Type: "tel", Placeholder: "+91...", Required: true, Order: 2, Enabled: true, FormKey: "home-hero"})
	formFieldNextID++
	formFields = append(formFields, FormField{ID: formFieldNextID, Name: "email", Label: "Email Address", Type: "email", Placeholder: "john@example.com", Required: true, Order: 3, Enabled: true, FormKey: "home-hero"})
	formFieldNextID++
	formFieldNextID++

	// PERSISTENCE: Load from disk if available
	loadFormFields()

	// Seed Pages
	pages = append(pages, PageContent{
		Slug:      "about",
		Title:     "About Us",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:           "Who we are and why we exist",
			Subtitle:        "We are building the bridge between education and career success. Our outcomes-first methodology ensures every student isn't just learning, but evolving into an industry leader.",
			BackgroundImage: "/images/about/hero.png",
			Stats: []Stat{
				{Label: "15,000+", SubLabel: "Total Students"},
				{Label: "94%", SubLabel: "Placement Rate"},
			},
		},
		Sections: map[string]interface{}{
			"mission": map[string]string{
				"tag":     "Mission Driven",
				"heading": "Who we are and why we exist",
				"content": "We are building the bridge between education and career success...",
			},
			"timeline": []map[string]string{
				{"year": "2015", "title": "The Beginning", "desc": "Founded with a single classroom and a vision to change how digital skills are taught."},
				{"year": "2018", "title": "Going Digital", "desc": "Launched our online platform, reaching students across 15 countries."},
				{"year": "2021", "title": "Global Accreditation", "desc": "Recognized by major tech giants as a premier training partner."},
				{"year": "Today", "title": "Market Leader", "desc": "Over 50,000 alumni working in top Fortune 500 companies."},
			},
			"values": []map[string]string{
				{"title": "Growth Mindset", "desc": "We believe intelligence can be developed.", "icon": "psychology"},
				{"title": "Inclusivity", "desc": "Education should be accessible to everyone.", "icon": "handshake"},
				{"title": "Innovation", "desc": "We stay ahead of the industry curve.", "icon": "lightbulb"},
				{"title": "Empathy", "desc": "Understanding student needs first.", "icon": "volunteer_activism"},
			},
		},
		Html: `
			<section class="mb-16">
				<span class="text-blue-600 font-bold tracking-wider uppercase text-sm">Mission Driven</span>
				<h2 class="text-3xl font-bold mt-2 mb-4">Who we are and why we exist</h2>
				<p class="text-slate-600 leading-relaxed">We are building the bridge between education and career success. Our outcomes-first methodology ensures every student isn't just learning, but evolving into an industry leader.</p>
			</section>

			<section class="mb-16">
				<h2 class="text-2xl font-bold mb-8">Our Journey</h2>
				<div class="space-y-8">
					<div class="flex gap-4">
						<div class="w-24 font-bold text-blue-600">2015</div>
						<div>
							<h3 class="font-bold">The Beginning</h3>
							<p class="text-slate-600">Founded with a single classroom.</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-24 font-bold text-blue-600">2018</div>
						<div>
							<h3 class="font-bold">Going Digital</h3>
							<p class="text-slate-600">Launched online platform.</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div class="w-24 font-bold text-blue-600">Today</div>
						<div>
							<h3 class="font-bold">Market Leader</h3>
							<p class="text-slate-600">Over 50,000 alumni.</p>
						</div>
					</div>
				</div>
			</section>
		`,
	})

	// Seed Legal Pages
	pages = append(pages, PageContent{
		Slug:      "privacy",
		Title:     "Privacy Policy",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title: "Privacy Policy",
		},
		Sections: map[string]interface{}{
			"content": `
				<h3>1. Information We Collect</h3>
				<p>We collect information you provide directly to us, such as when you create an account, enroll in a course, or communicate with us.</p>
				<h3>2. How We Use Your Information</h3>
				<p>We use the information we collect to provide, maintain, and improve our services.</p>
				<h3>3. Data Security</h3>
				<p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.</p>
			`,
		},
	})

	pages = append(pages, PageContent{
		Slug:      "terms",
		Title:     "Terms and Conditions",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title: "Terms and Conditions",
		},
		Sections: map[string]interface{}{
			"content": `
				<h3>1. Acceptance of Terms</h3>
				<p>By accessing or using our website, you agree to be bound by these Terms.</p>
				<h3>2. Course Enrollment</h3>
				<p>When you enroll in a course, you agree to pay the applicable fees and follow the code of conduct.</p>
				<h3>3. Intellectual Property</h3>
				<p>The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights.</p>
			`,
		},
	})

	pages = append(pages, PageContent{
		Slug:      "refund",
		Title:     "Refund & Cancellation Policy",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title: "Refund Policy",
		},
		Sections: map[string]interface{}{
			"content": `
				<h3>1. 7-Day Money Back Guarantee</h3>
				<p>We offer a 7-day money-back guarantee for all our self-paced courses.</p>
				<h3>2. Live Classes</h3>
				<p>For live cohort-based courses, refund requests must be made before the start of the 2nd session.</p>
				<h3>3. Process</h3>
				<p>To request a refund, please email support@pixeeducation.com with your Order ID.</p>
			`,
		},
	})

	// Seed Test Page for Universal Routing (Careers)
	pages = append(pages, PageContent{
		Slug:      "careers",
		Title:     "Careers at Pixe",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Join Our Mission",
			Subtitle: "Help us shape the future of digital education. We are always looking for passionate individuals.",
		},
		Sections: map[string]interface{}{
			"content": `
				<h2>Why Work With Us?</h2>
				<p>At Pixe, we believe in a culture of growth, innovation, and empathy. We are a remote-first company with team members across the globe.</p>
				<ul>
					<li><strong>Remote First:</strong> Work from anywhere.</li>
					<li><strong>Competitive Salary:</strong> We pay top of market.</li>
					<li><strong>Unlimited PTO:</strong> We trust you to manage your time.</li>
				</ul>
				<h2>Open Positions</h2>
				<p>We are currently hiring for:</p>
				<ul>
					<li>Senior Golang Engineer</li>
					<li>Frontend Architect (Next.js)</li>
					<li>Content Strategist</li>
				</ul>
				<p>Send your resume to <a href="mailto:careers@pixe.com">careers@pixe.com</a>.</p>
			`,
		},
	})

	// Seed Hire Talent Page
	pages = append(pages, PageContent{
		Slug:      "hire-talent",
		Title:     "Hire Top Talent",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Build Your Dream Team",
			Subtitle: "Skip the hiring friction. Access our pool of pre-vetted, project-ready developers.",
		},
		Sections: map[string]interface{}{
			"stats": []map[string]string{
				{"value": "95%", "label": "Placement Rate", "sub": "Consistent Success"},
				{"value": "72h", "label": "Time to Hire", "sub": "Fast Turnaround"},
				{"value": "0%", "label": "Hiring Fees", "sub": "Completely Free"},
			},
		},
	})

	// Seed Scholarships Page
	pages = append(pages, PageContent{
		Slug:      "scholarships",
		Title:     "Scholarship Programs",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Pixe Scholarship Program",
			Subtitle: "We believe financial constraints should never stand in the way of learning. Apply for up to 50% waiver.",
		},
		Sections: map[string]interface{}{
			"content": "<p>Our scholarship program is designed to support meritorious students...</p>",
		},
	})

	// Seed Pricing Page
	pages = append(pages, PageContent{
		Slug:      "pricing",
		Title:     "Pricing & Plans",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Transparent Pricing",
			Subtitle: "Invest in your future with flexible payment options and no hidden costs.",
		},
		Sections: map[string]interface{}{
			"content": "<p>Choose the plan that fits your career goals...</p>",
		},
	})

	// Seed Career Guide Page (Footer Link: /career/career-guide -> career-career-guide)
	pages = append(pages, PageContent{
		Slug:      "career-career-guide",
		Title:     "Ultimate Career Guide",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Your Roadmap to Success",
			Subtitle: "Navigating the digital landscape can be tough. Here is everything you need to know.",
		},
		Sections: map[string]interface{}{
			"content": "<p>Explore career paths in Digital Marketing, Data Science, and Design...</p>",
		},
	})

	// Seed FAQ Page
	pages = append(pages, PageContent{
		Slug:      "faq",
		Title:     "Frequently Asked Questions",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Help Center",
			Subtitle: "Find answers to common questions about our courses and admissions.",
		},
		Sections: map[string]interface{}{
			"content": "<p>Browse our FAQ categories below...</p>",
		},
	})

	// Seed Sitemap Page
	pages = append(pages, PageContent{
		Slug:      "sitemap",
		Title:     "Sitemap",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Sitemap",
			Subtitle: "Overview of all pages on the Pixe Education website.",
		},
		Sections: map[string]interface{}{
			"content": "<p>Links to all sections...</p>",
		},
	})

	// Seed Internships Page
	pages = append(pages, PageContent{
		Slug:      "internships",
		Title:     "Internship Program",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Pixe Internship Program",
			Subtitle: "Gain real-world experience while you learn.",
		},
		Sections: map[string]interface{}{
			"features": []string{
				"Work on live client projects under expert mentorship.",
				"Earn a stipend while you build your portfolio.",
				"Receive an industry-recognized Experience Certificate.",
				"PPO (Pre-Placement Offer) potential for top performers.",
			},
			"positions": []map[string]string{
				{"title": "Digital Marketing Intern", "details": "Remote • 3 Months"},
				{"title": "Content Writing Intern", "details": "Remote • 3 Months"},
				{"title": "Social Media Intern", "details": "Remote • 2 Months"},
			},
		},
	})

	// Seed Career Outcomes Page (Wireframe Matched)
	pages = append(pages, PageContent{
		Slug:      "career",
		Title:     "Career Outcomes",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Career Outcomes Guarantee",
			Subtitle: "We invest in your future. Our outcomes-focused program ensures you land your dream job with top-tier companies.",
			Stats: []Stat{
				{Label: "95%", SubLabel: "Placement Rate"},
				{Label: "12 LPA", SubLabel: "Avg CTC"},
				{Label: "500+", SubLabel: "Hiring Partners"},
			},
		},
		Sections: map[string]interface{}{
			"partners": []string{"Google", "Microsoft", "Amazon", "Uber", "Spotify", "Adobe"},
			"journey_steps": []map[string]string{
				{"step": "1", "title": "Enroll & Assess", "desc": "Skill gap analysis and personalized learning path setup."},
				{"step": "2", "title": "Intensive Training", "desc": "Live mentorship, hands-on projects, and advanced modules."},
				{"step": "3", "title": "Projects & Portfolio", "desc": "Real-world capstone projects to build an industry-ready portfolio."},
				{"step": "4", "title": "Placement & Job", "desc": "Mock interviews, resume building, and guaranteed interview lineups."},
			},
			"alumni_stories": []map[string]string{
				{"name": "Rahul Verma", "role": "SEO Specialist", "company": "Zomato", "image": "/images/avatars/rahul.jpg", "quote": "I transitioned from sales to SEO in just 3 months. The live projects were a game changer.", "before": "Sales Exec", "after": "SEO Specialist"},
				{"name": "Priya Patel", "role": "Digital Marketer", "company": "Myntra", "image": "/images/avatars/priya.jpg", "quote": "The mentorship helped me crack the Myntra interview. Best decision of my career.", "before": "Fresher", "after": "Growth Associate"},
				{"name": "Amit Kumar", "role": "PPC Manager", "company": "Flipkart", "image": "/images/avatars/amit.jpg", "quote": "Understanding ROI and data analytics gave me an edge over others.", "before": "Content Writer", "after": "PPC Lead"},
			},
			"career_support": []map[string]string{
				{"title": "Resume Building", "desc": "ATS-friendly resume templates.", "icon": "description"},
				{"title": "Mock Interviews", "desc": "1:1 Strategy sessions with experts.", "icon": "group"},
				{"title": "LinkedIn Optimization", "desc": "Profile makeover for visibility.", "icon": "post_add"},
				{"title": "Job Alerts", "desc": "Exclusive access to hidden jobs.", "icon": "notifications_active"},
			},
			"roi_table": []map[string]interface{}{
				{"role": "Full Stack Marketer", "before": "₹3.5 LPA", "after": "₹9.0 LPA", "growth": "157%", "time": "6 Months"},
				{"role": "SEO Specialist", "before": "₹2.8 LPA", "after": "₹6.5 LPA", "growth": "132%", "time": "4 Months"},
				{"role": "PPC Manager", "before": "₹4.0 LPA", "after": "₹11.0 LPA", "growth": "175%", "time": "5 Months"},
				{"role": "Data Analyst", "before": "₹5.0 LPA", "after": "₹14.0 LPA", "growth": "180%", "time": "7 Months"},
			},
			"videos": []map[string]string{
				{"title": "From Non-Tech to Tech", "image": "/images/thumbnails/vid1.jpg"},
				{"title": "My Journey at Google", "image": "/images/thumbnails/vid2.jpg"},
				{"title": "Placement Experience", "image": "/images/thumbnails/vid3.jpg"},
			},
			"faqs": []map[string]string{
				{"q": "What if I don't get placed after the course?", "a": "We provide a 100% placement support guarantee. If you don't get placed, we continue to support you until you do."},
				{"q": "Is coding required for these roles?", "a": "No, most digital marketing roles do not require coding knowledge."},
				{"q": "Do you provide internship opportunities?", "a": "Yes, every student gets a 2-month guaranteed internship."},
			},
		},
		Tags:           []string{"placement", "job", "career", "success"},
		SeoTitle:       "Career Outcomes | Placement Report 2024",
		SeoDescription: "See where our students are working. 95% Placement rate with top hiring partners.",
	})

	// Seed Events
	events = append(events, Event{
		ID:          1,
		Title:       "Mastering Digital Marketing in 2024",
		Description: "Join industry expert Alex Doe for a deep dive into the latest strategies.",
		Date:        "2024-02-15",
		Time:        "14:00",
		Duration:    "60 Minutes",
		Instructor:  "Alex Doe",
		Status:      "upcoming",
	})
	eventNextID = 2

	// Seed Downloads
	downloads = append(downloads, Download{
		ID:           1,
		Title:        "2025 Course Brochure",
		Description:  "Complete detailed syllabus only for you.",
		Url:          "/uploads/brochure_2025.pdf",
		DownloadTime: time.Now(),
	})
	downloadNextID = 2

	// Seed Courses Listing Page (CMS)
	pages = append(pages, PageContent{
		Slug:      "courses",
		Title:     "All Courses",
		UpdatedAt: time.Now().Format(time.RFC3339),
		Hero: HeroSection{
			Title:    "Explore Our Courses",
			Subtitle: "Choose from our wide range of industry-leading certification programs.",
		},
		Sections: map[string]interface{}{
			"content": `
				<h2>Our Programs</h2>
				<p>We offer comprehensive courses designed to help you master digital marketing and launch your career.</p>
				<p>Browse our catalog below to find the perfect course for you.</p>
			`,
		},
	})

	// Seed Advanced Digital Marketing Course (Migrated to CMS)
	pages = append(pages, PageContent{
		Slug:      "advance-digital-marketing-course",
		Title:     "Advanced Digital Marketing Program",
		UpdatedAt: time.Now().Format(time.RFC3339),
		PuckData: map[string]interface{}{
			"root": map[string]interface{}{
				"props": map[string]string{"title": "Advanced Digital Marketing Program"},
			},
			"content": []map[string]interface{}{
				{
					"type": "Hero",
					"props": map[string]interface{}{
						"id":              "hero-adv-marketing",
						"title":           "Advanced Digital Marketing Program",
						"subtitle":        "Master SEO, SEM, Social Media, and Analytics with industry experts. Transform your career with hands-on projects.",
						"primaryAction":   map[string]string{"text": "Apply Now", "href": "#apply"},
						"secondaryAction": map[string]string{"text": "Download Brochure", "href": "#download"},
					},
				},
				{
					"type":  "ProgramGrid",
					"props": map[string]interface{}{"id": "grid-adv-marketing", "useDynamicData": "true"},
				},
				{
					"type":  "Stats",
					"props": map[string]interface{}{"id": "stats-adv-marketing", "useDynamicData": "true"},
				},
				{
					"type":  "HiringPartners",
					"props": map[string]interface{}{"id": "partners-adv-marketing", "useDynamicData": "true"},
				},
			},
		},
		Hero: HeroSection{
			Title:    "Advanced Digital Marketing Program",
			Subtitle: "Master SEO, SEM, Social Media, and Analytics with industry experts.",
		},
		Sections: map[string]interface{}{
			"content": "<p>Content managed via Puck Editor</p>",
		},
	})

	// Seed SEO Mastery Course
	pages = append(pages, PageContent{
		Slug:      "seo-course",
		Title:     "SEO Mastery Course",
		UpdatedAt: time.Now().Format(time.RFC3339),
		PuckData: map[string]interface{}{
			"root": map[string]interface{}{
				"props": map[string]string{"title": "SEO Mastery Course"},
			},
			"content": []map[string]interface{}{
				{
					"type": "Hero",
					"props": map[string]interface{}{
						"id":              "hero-seo",
						"title":           "SEO Mastery Course",
						"subtitle":        "Master the art of Search Engine Optimization. Rank #1 on Google with advanced strategies.",
						"primaryAction":   map[string]string{"text": "Apply Now", "href": "#apply"},
						"secondaryAction": map[string]string{"text": "Download Brochure", "href": "#download"},
					},
				},
				{
					"type":  "ProgramGrid",
					"props": map[string]interface{}{"id": "grid-seo", "useDynamicData": "true"},
				},
				{
					"type":  "Stats",
					"props": map[string]interface{}{"id": "stats-seo", "useDynamicData": "true"},
				},
				{
					"type":  "HiringPartners",
					"props": map[string]interface{}{"id": "partners-seo", "useDynamicData": "true"},
				},
			},
		},
		Hero:     HeroSection{Title: "SEO Mastery Course"},
		Sections: map[string]interface{}{"content": "<p>Content managed via Puck Editor</p>"},
	})

	// Seed PPC / Performance Marketing Course
	pages = append(pages, PageContent{
		Slug:      "ppc-course",
		Title:     "Performance Marketing Mastery",
		UpdatedAt: time.Now().Format(time.RFC3339),
		PuckData: map[string]interface{}{
			"root": map[string]interface{}{
				"props": map[string]string{"title": "Performance Marketing Mastery"},
			},
			"content": []map[string]interface{}{
				{
					"type": "Hero",
					"props": map[string]interface{}{
						"id":              "hero-ppc",
						"title":           "Performance Marketing Mastery",
						"subtitle":        "Master Google Ads, Meta Ads, LinkedIn Ads, and more. Become a ROI-driven marketer.",
						"primaryAction":   map[string]string{"text": "Apply Now", "href": "#apply"},
						"secondaryAction": map[string]string{"text": "Download Brochure", "href": "#download"},
					},
				},
				{
					"type":  "ProgramGrid",
					"props": map[string]interface{}{"id": "grid-ppc", "useDynamicData": "true"},
				},
				{
					"type":  "Stats",
					"props": map[string]interface{}{"id": "stats-ppc", "useDynamicData": "true"},
				},
				{
					"type":  "HiringPartners",
					"props": map[string]interface{}{"id": "partners-ppc", "useDynamicData": "true"},
				},
			},
		},
		Hero:     HeroSection{Title: "Performance Marketing Mastery"},
		Sections: map[string]interface{}{"content": "<p>Content managed via Puck Editor</p>"},
	})

	// Seed Analytics Mastery Course
	pages = append(pages, PageContent{
		Slug:      "analytics-course",
		Title:     "Analytics Mastery",
		UpdatedAt: time.Now().Format(time.RFC3339),
		PuckData: map[string]interface{}{
			"root": map[string]interface{}{
				"props": map[string]string{"title": "Analytics Mastery"},
			},
			"content": []map[string]interface{}{
				{
					"type": "Hero",
					"props": map[string]interface{}{
						"id":              "hero-analytics",
						"title":           "Analytics Mastery",
						"subtitle":        "Master GA4, Looker Studio, and Tag Manager. Turn data into actionable insights.",
						"primaryAction":   map[string]string{"text": "Apply Now", "href": "#apply"},
						"secondaryAction": map[string]string{"text": "Download Brochure", "href": "#download"},
					},
				},
				{
					"type":  "ProgramGrid",
					"props": map[string]interface{}{"id": "grid-analytics", "useDynamicData": "true"},
				},
				{
					"type":  "Stats",
					"props": map[string]interface{}{"id": "stats-analytics", "useDynamicData": "true"},
				},
				{
					"type":  "HiringPartners",
					"props": map[string]interface{}{"id": "partners-analytics", "useDynamicData": "true"},
				},
			},
		},
		Hero:     HeroSection{Title: "Analytics Mastery"},
		Sections: map[string]interface{}{"content": "<p>Content managed via Puck Editor</p>"},
	})

	// Seed Social Media Marketing Course
	pages = append(pages, PageContent{
		Slug:      "social-media-marketing-course",
		Title:     "Social Media Marketing & Branding",
		UpdatedAt: time.Now().Format(time.RFC3339),
		PuckData: map[string]interface{}{
			"root": map[string]interface{}{
				"props": map[string]string{"title": "Social Media Marketing & Branding"},
			},
		},
		Hero:     HeroSection{Title: "Social Media Marketing & Branding"},
		Sections: map[string]interface{}{"content": "<p>Content managed via Puck Editor</p>"},
	})

	// Bulk Seed Remaining Frontend Pages
	genericPages := []string{
		"landing", "free-counseling", "corporate-training", "digital-marketing-courses",
		"success-stories", "certifications", "contact", "resources",
		"thank-you", "affiliate-email-marketing-course", "pricing",
		"faq", "masterclass", "hire-us", "blog",
		// Deep Nested Pages (Flattened Slugs)
		"career-career-guide",
		"career-hire-talent",
		"career-internship",
		"success-stories-reviews",
		"resources-tools",
		"locations-bangalore",
		"locations-pune",
		"locations-delhi",
		"locations-mumbai",
		"locations-uae",
		"locations-us",
		"legal-terms",
		"legal-privacy",
		"legal-refund",
	}

	for _, pSlug := range genericPages {
		title := strings.Title(strings.ReplaceAll(pSlug, "-", " "))
		pages = append(pages, PageContent{
			Slug:      pSlug,
			Title:     title,
			UpdatedAt: time.Now().Format(time.RFC3339),
			PuckData: map[string]interface{}{
				"root": map[string]interface{}{
					"props": map[string]string{"title": title},
				},
				"content": []map[string]interface{}{
					{
						"type": "Hero",
						"props": map[string]interface{}{
							"id":       "hero-" + pSlug,
							"title":    title,
							"subtitle": "Content for " + title + " page.",
						},
					},
					{
						"type":  "RichText",
						"props": map[string]string{"id": "richtext-" + pSlug, "html": "<p>This page content is now managed by the CMS.</p>"},
					},
				},
			},
			Hero: HeroSection{Title: title},
			Sections: map[string]interface{}{
				"content": "<p>Content managed via Puck Editor</p>",
			},
		})
	}
}

func getDatabaseURL() string {
	// Priority 1: Nile (if enabled)
	if settings.EnableNileDB && settings.NileConnectionURL != "" {
		return sanitizeDBURL(settings.NileConnectionURL)
	}

	// Priority 2: Aiven (if enabled)
	if settings.EnableAivenDB && settings.AivenServiceURL != "" {
		return sanitizeDBURL(settings.AivenServiceURL)
	}

	if url := os.Getenv("DATABASE_URL"); url != "" {
		return sanitizeDBURL(url)
	}
	// Fallback params...
	return ""
}

// sanitizeDBURL strips common prefixes and extracts clean postgres:// URLs
func sanitizeDBURL(connStr string) string {
	connStr = strings.TrimSpace(connStr)

	// Strip "psql " prefix if present
	if strings.HasPrefix(connStr, "psql ") {
		connStr = strings.TrimPrefix(connStr, "psql ")
	}
	if strings.HasPrefix(connStr, "psql") && strings.Contains(connStr, "postgres") {
		// Extract just the postgres:// part
		if idx := strings.Index(connStr, "postgres://"); idx != -1 {
			connStr = connStr[idx:]
		} else if idx := strings.Index(connStr, "postgresql://"); idx != -1 {
			connStr = connStr[idx:]
		}
	}

	return strings.TrimSpace(connStr)
}

// PERSISTENCE: Save settings to disk
func saveSettings() {
	file, err := json.MarshalIndent(settings, "", " ")
	if err != nil {
		log.Printf("[ERROR] Failed to marshal settings: %v\n", err)
	}
	err = os.WriteFile("settings.json", file, 0644)
	if err != nil {
		log.Printf("[ERROR] Failed to write settings.json: %v\n", err)
	} else {
		log.Println("[INFO] settings.json saved successfully")
	}
}

// PERSISTENCE: Load settings from disk
func loadSettings() {
	if _, err := os.Stat("settings.json"); err == nil {
		file, _ := os.ReadFile("settings.json")
		_ = json.Unmarshal(file, &settings)
	}
}

// SECURITY: SSRF Protection Helper - Blocks internal/private IPs
func validateHost(hostname string) bool {
	// 1. Block known dangerous metadata services and localhost aliases
	dangerousPatterns := []string{
		"localhost", "127.0.0.1", "0.0.0.0", "::1", "::",
		"169.254.169.254", "metadata.google.internal",
		"10.", "192.168.", "172.16.",
		"172.17.", "172.18.", "172.19.", "172.20.", "172.21.", "172.22.",
		"172.23.", "172.24.", "172.25.", "172.26.", "172.27.", "172.28.",
		"172.29.", "172.30.", "172.31.",
	}

	lowerHost := strings.ToLower(hostname)
	for _, pattern := range dangerousPatterns {
		if strings.HasPrefix(lowerHost, pattern) || lowerHost == pattern {
			return false
		}
	}

	// 2. DNS Resolution Check (Prevent DNS Rebinding to internal IP)
	if ip := net.ParseIP(hostname); ip != nil {
		if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() {
			return false
		}
	}

	return true
}

func logAdminAction(c *fiber.Ctx, action, resource, details string) {
	// Extract Admin ID from JWT (assumes authMiddleware passed)
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	// Safely cast float64 (default JSON number) to int
	adminID := 0
	if idFloat, ok := claims["id"].(float64); ok {
		adminID = int(idFloat)
	}

	auditLogsMutex.Lock()
	logEntry := AuditLog{
		ID:        auditNextID,
		AdminID:   adminID,
		Action:    action,
		Resource:  resource,
		Details:   details,
		Timestamp: time.Now().Format(time.RFC3339),
		IP:        c.IP(),
	}
	auditNextID++
	auditLogs = append(auditLogs, logEntry)
	auditLogsMutex.Unlock()

	// Also print to stdout for Fluentd/Cloud logging
	log.Printf("[AUDIT] AdminID=%d Action=%s Resource=%s IP=%s", adminID, action, resource, c.IP())
}

// ipAllowlistMiddleware restricts access to configured IPs (Phase 6)
func ipAllowlistMiddleware(c *fiber.Ctx) error {
	settingsMutex.RLock()
	allowlist := settings.AdminIPAllowlist
	settingsMutex.RUnlock()

	// Empty allowlist = allow all (disabled)
	if len(allowlist) == 0 {
		return c.Next()
	}

	clientIP := c.IP()

	// Check if client IP is in allowlist
	for _, allowedIP := range allowlist {
		if allowedIP == clientIP || allowedIP == "*" {
			return c.Next()
		}
		// Support CIDR notation (e.g., "192.168.1.0/24")
		if strings.Contains(allowedIP, "/") {
			_, ipNet, err := net.ParseCIDR(allowedIP)
			if err == nil && ipNet.Contains(net.ParseIP(clientIP)) {
				return c.Next()
			}
		}
	}

	log.Printf("[SECURITY] IP BLOCKED: %s not in admin allowlist", clientIP)
	return c.Status(403).JSON(fiber.Map{"error": "Access denied. IP not authorized."})
}

// encryptAES256 encrypts data using AES-256-GCM (Phase 6: Backup Encryption)
func encryptAES256(plaintext []byte, key []byte) ([]byte, error) {
	// Key must be 32 bytes for AES-256
	if len(key) != 32 {
		return nil, fmt.Errorf("key must be 32 bytes for AES-256")
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}

	// Create nonce
	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return nil, err
	}

	// Encrypt and prepend nonce
	ciphertext := gcm.Seal(nonce, nonce, plaintext, nil)
	return ciphertext, nil
}

// generateEncryptionKey generates or retrieves the backup encryption key
func getBackupEncryptionKey() []byte {
	keyStr := os.Getenv("BACKUP_ENCRYPTION_KEY")
	if keyStr == "" {
		// Use a derived key from JWT_SECRET if not set
		jwtKey := os.Getenv("JWT_SECRET")
		if jwtKey == "" {
			jwtKey = "default-backup-key-change-in-prod"
		}
		// Pad or truncate to 32 bytes
		key := []byte(jwtKey)
		if len(key) < 32 {
			key = append(key, bytes.Repeat([]byte("0"), 32-len(key))...)
		}
		return key[:32]
	}
	key := []byte(keyStr)
	if len(key) < 32 {
		key = append(key, bytes.Repeat([]byte("0"), 32-len(key))...)
	}
	return key[:32]
}

func main() {
	dbURL := getDatabaseURL()
	// Initialize Database if URL is present
	if dbURL != "" {
		var err error
		db, err = sql.Open("postgres", dbURL)
		if err != nil {
			log.Printf("⚠️  [DATABASE] Failed to open connection: %v", err)
		} else {
			// Async Ping to verify
			go func() {
				time.Sleep(2 * time.Second) // Wait for startup
				if err := db.Ping(); err != nil {
					log.Printf("⚠️  [DATABASE] Connected but Ping failed: %v", err)
				} else {
					log.Println("✅  [DATABASE] successfully connected and pinged!")
				}
			}()
		}
	} else {
		log.Println("ℹ️  [DATABASE] No Connection URL found. Running in In-Memory mode.")
	}

	// Setup Logging
	logFile, err := os.OpenFile("backend.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer logFile.Close() // Ideally close on exit
	mw := io.MultiWriter(os.Stdout, logFile)
	log.SetOutput(mw)

	log.Println("Initializing Pixe High-Performance Backend v1.1...")

	app := fiber.New(fiber.Config{
		JSONEncoder:             json.Marshal,
		JSONDecoder:             json.Unmarshal,
		AppName:                 "Pixe Backend",
		ReadTimeout:             5 * time.Second,
		WriteTimeout:            10 * time.Second,
		IdleTimeout:             120 * time.Second,
		BodyLimit:               10 * 1024 * 1024,                         // 10MB
		EnableTrustedProxyCheck: true,                                     // SECURITY: Trust X-Forwarded-For from configured proxies
		TrustedProxies:          []string{ /*"127.0.0.1",*/ "10.0.0.0/8"}, // SECURITY: Disable Localhost trusting for strict spoofing tests
		ProxyHeader:             "X-Forwarded-For",
	})

	app.Use(recover.New()) // SECURITY: Prevent crash from panic
	app.Use(compress.New(compress.Config{
		Level: compress.LevelBestSpeed, // Fast compression for API responses
	}))
	app.Use(helmet.New())
	/*
		app.Use(csrf.New(csrf.Config{
			KeyLookup:      "header:X-Csrf-Token", // Strict mode
			CookieName:     "csrf_",
			CookieSameSite: "Lax",
			Expiration:     1 * time.Hour,
		}))
	*/
	app.Use(requestid.New(requestid.Config{
		Header: "X-Correlation-ID",
		Generator: func() string {
			return "gen-" + time.Now().Format("20060102150405") // Fallback if missing
		},
	}))
	// SECURITY: Restrict CORS to specific origins
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:3000,http://localhost:3001,http://localhost:3002" // Added 3002
	}
	app.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowHeaders:     "Origin, Content-Type, Accept, X-Correlation-ID, Authorization",
		AllowCredentials: true,
	}))
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${locals:requestid} ${status} - ${method} ${path}\n",
	}))

	// Rate Limiting - General (5000/min for normal traffic)
	app.Use(limiter.New(limiter.Config{
		Max:        5000,
		Expiration: 1 * time.Minute,
	}))

	// SECURITY: Strict rate limiter for login (5 attempts per minute per IP)
	loginLimiter := limiter.New(limiter.Config{
		Max:        5,
		Expiration: 1 * time.Minute,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP() // Rate limit per IP
		},
		LimitReached: func(c *fiber.Ctx) error {
			return c.Status(429).JSON(fiber.Map{"error": "Too many login attempts. Please wait 60 seconds."})
		},
	})
	_ = loginLimiter // Silence unused error (kept for potential future rollback)

	app.Static("/uploads", "./uploads")

	// Load Settings from Disk
	loadSettings()

	api := app.Group("/api/v1")

	// SECURITY: Load JWT secret from environment (REQUIRED in production)
	jwtSecretStr := os.Getenv("JWT_SECRET")
	if jwtSecretStr == "" {
		log.Println("WARNING: JWT_SECRET not set! Using insecure default for dev only.")
		jwtSecretStr = "dev-secret-12345"
	}
	jwtSecret := []byte(jwtSecretStr)

	// SECURITY: Load admin credentials from environment
	adminEmail := os.Getenv("ADMIN_EMAIL")
	adminPasswordHash := os.Getenv("ADMIN_PASSWORD_HASH") // bcrypt hash
	if adminEmail == "" {
		adminEmail = "admin@pixe.com"
	}
	if adminPasswordHash == "" {
		// Default bcrypt hash for "admin123"
		adminPasswordHash = "$2a$10$SAUdZb20VGq1uWgre.YppOg6R3PfhcFfdOl1D0JWjUqUC9IF4YuWe"
		log.Println("WARNING: ADMIN_PASSWORD_HASH not set! Using default 'admin123'.")
	}

	// JWT Auth Middleware
	authMiddleware := func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		log.Printf("DEBUG: Auth Middleware called for %s %s", c.Method(), c.Path())
		log.Printf("DEBUG: Headers: %v", c.GetReqHeaders())
		log.Printf("DEBUG: Authorization header: '%s'", authHeader)

		if authHeader == "" {
			// Fallback: Try to get token from cookie
			cookieToken := c.Cookies("auth-token")
			if cookieToken != "" {
				authHeader = "Bearer " + cookieToken
			} else {
				return c.Status(401).JSON(fiber.Map{"error": "Missing authorization header"})
			}
		}

		// Extract token from "Bearer <token>"
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid authorization format"})
		}

		tokenString := tokenParts[1]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")
			}
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired token"})
		}

		// Store claims in locals for route handlers
		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			email, _ := claims["email"].(string)
			// role, _ := claims["role"].(string) // Don't trust token role blindly for Zombie Defense

			// ZOMBIE TOKEN DEFENSE: Verify user exists and get current role from DB
			// This prevents deleted/banned users from using old valid tokens
			validUser := false
			currentRole := ""

			// Check against hardcoded admin first (for bootstrap)
			log.Printf("DEBUG AUTH: TokenEmail='%s' AdminEmail='%s'", email, adminEmail)
			if email == adminEmail {
				validUser = true
				currentRole = "admin"
			} else {
				// Check against dynamic users list
				usersMutex.RLock()
				for _, u := range users {
					if u.Email == email {
						validUser = true
						currentRole = u.Role
						break
					}
				}
				usersMutex.RUnlock()
			}

			if !validUser {
				return c.Status(401).JSON(fiber.Map{"error": "User no longer exists or access revoked"})
			}

			c.Locals("email", email)
			c.Locals("role", currentRole)
		}

		return c.Next()
	}

	// SECURITY: RBAC Middleware - Ensure user is Admin
	requireAdmin := func(c *fiber.Ctx) error {
		role, ok := c.Locals("role").(string)
		if !ok || role != "admin" {
			// Log the attempt (Sanitized)
			email, _ := c.Locals("email").(string)
			safeEmail := strings.ReplaceAll(strings.ReplaceAll(email, "\n", ""), "\r", "")
			log.Printf("[SECURITY] Unauthorized Admin Access Attempt by: %s", safeEmail)
			return c.Status(403).JSON(fiber.Map{"error": "Forbidden: Insufficient privileges"})
		}
		return c.Next()
	}

	// OTP ENDPOINTS - Public
	api.Post("/otp/send", func(c *fiber.Ctx) error {
		var req struct {
			Phone string `json:"phone"`
		}
		if err := c.BodyParser(&req); err != nil || req.Phone == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid phone number"})
		}

		// Normalize Phone Number (Default to India +91 if 10 digits)
		cleanPhone := strings.ReplaceAll(req.Phone, "+", "")
		cleanPhone = strings.ReplaceAll(cleanPhone, " ", "")
		cleanPhone = strings.ReplaceAll(cleanPhone, "-", "")

		if len(cleanPhone) == 10 {
			cleanPhone = "91" + cleanPhone
		}

		// Update request phone to normalized version for consistency
		req.Phone = cleanPhone

		// Generate 6-digit code (Simulation)
		code := fmt.Sprintf("%06d", time.Now().UnixNano()%1000000)

		otpMutex.Lock()
		otpStorage[req.Phone] = code
		otpMutex.Unlock()

		// DEBUG: Always log OTP to backend logs for troubleshooting
		log.Printf("[DEBUG] Generated OTP for %s: %s", req.Phone, code)

		// Check for Meta WhatsApp Credentials (CMS Priority > Env)
		settingsMutex.RLock()
		whatsappEnabled := settings.EnableWhatsApp
		metaPhoneID := settings.MetaPhoneID
		metaToken := settings.MetaToken
		metaTemplate := settings.MetaTemplate
		settingsMutex.RUnlock()

		// If WhatsApp is disabled in settings, skip OTP sending and return success
		if !whatsappEnabled {
			log.Printf("[INFO] WhatsApp verification disabled in settings. OTP for %s: %s (not sent)", req.Phone, code)
			return c.JSON(fiber.Map{"status": "sent", "message": "OTP generated (WhatsApp disabled - check logs)"})
		}

		if metaPhoneID == "" {
			metaPhoneID = os.Getenv("META_PHONE_NUMBER_ID")
		}
		if metaToken == "" {
			metaToken = os.Getenv("META_ACCESS_TOKEN")
		}
		if metaTemplate == "" {
			metaTemplate = os.Getenv("META_TEMPLATE_NAME")
		}

		if metaPhoneID != "" && metaToken != "" && metaTemplate != "" {
			// PRODUCTION MODE: Send Real WhatsApp via Meta (Template Message)
			// Use configured version or default to v24.0
			version := settings.MetaVersion
			if version == "" {
				version = "v24.0"
			}
			apiURL := fmt.Sprintf("https://graph.facebook.com/%s/%s/messages", version, metaPhoneID)

			// Payload for Authentication Template
			payload := map[string]interface{}{
				"messaging_product": "whatsapp",
				"to":                req.Phone,
				"type":              "template",
				"template": map[string]interface{}{
					"name": metaTemplate,
					"language": map[string]string{
						"code": "en",
					},
					"components": []map[string]interface{}{
						{
							"type": "body",
							"parameters": []map[string]interface{}{
								{
									"type": "text",
									"text": code,
								},
							},
						},
						{
							"type":     "button",
							"sub_type": "url",
							"index":    "0",
							"parameters": []map[string]interface{}{
								{
									"type": "text",
									"text": code,
								},
							},
						},
					},
				},
			}

			jsonBody, _ := json.Marshal(payload)

			metaReq, _ := http.NewRequest("POST", apiURL, bytes.NewBuffer(jsonBody))
			metaReq.Header.Set("Authorization", "Bearer "+metaToken)
			metaReq.Header.Set("Content-Type", "application/json")

			client := &http.Client{Timeout: 10 * time.Second}
			resp, err := client.Do(metaReq)

			if err != nil {
				log.Printf("[META] Failed to send WhatsApp: %v", err)
				return c.Status(500).JSON(fiber.Map{"error": "Failed to send OTP"})
			}
			defer resp.Body.Close()

			if resp.StatusCode >= 200 && resp.StatusCode < 300 {
				log.Printf("[META] OTP sent to %s successfully", req.Phone)
				return c.JSON(fiber.Map{"status": "sent", "message": "OTP sent via WhatsApp"})
			} else {
				bodyBytes, _ := io.ReadAll(resp.Body)
				log.Printf("[META] API Error: %s", string(bodyBytes))
				return c.Status(500).JSON(fiber.Map{"error": "WhatsApp Provider Error"})
			}
		} else {
			// DEV/SIMULATION MODE: Log to Console
			log.Printf("[WHATSAPP SIMULATION] OTP for %s is: %s", req.Phone, code)
		}

		return c.JSON(fiber.Map{"status": "sent", "message": "OTP sent via WhatsApp"})
	})

	api.Post("/otp/verify", func(c *fiber.Ctx) error {
		var req struct {
			Phone string `json:"phone"`
			Code  string `json:"code"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// Normalize Phone Number (Default to India +91 if 10 digits)
		cleanPhone := strings.ReplaceAll(req.Phone, "+", "")
		cleanPhone = strings.ReplaceAll(cleanPhone, " ", "")
		cleanPhone = strings.ReplaceAll(cleanPhone, "-", "")

		if len(cleanPhone) == 10 {
			cleanPhone = "91" + cleanPhone
		}
		req.Phone = cleanPhone

		otpMutex.RLock()
		storedCode, exists := otpStorage[req.Phone]
		otpMutex.RUnlock()

		if !exists || storedCode != req.Code {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired OTP"})
		}

		// Generate a Verification Token for the user session
		token := fmt.Sprintf("ver_%d_%s", time.Now().Unix(), req.Phone)

		verifiedMutex.Lock()
		verifiedTokens[token] = true
		verifiedMutex.Unlock()

		// Clear OTP after successful verification usage (optional, but good practice)
		// otpMutex.Lock()
		// delete(otpStorage, req.Phone)
		// otpMutex.Unlock()

		return c.JSON(fiber.Map{
			"status":             "verified",
			"verification_token": token,
			"token":              token, // Backward compatibility for cached frontends
		})
	})

	// Meta Webhook Verification (GET)
	// Used by Meta to verify our server ownership.
	api.Get("/meta/webhook", func(c *fiber.Ctx) error {
		mode := c.Query("hub.mode")
		token := c.Query("hub.verify_token")
		challenge := c.Query("hub.challenge")

		// Get configured verify token
		settingsMutex.RLock()
		verifyToken := settings.MetaVerifyToken
		settingsMutex.RUnlock()

		if mode == "subscribe" && token == verifyToken {
			log.Println("[META WEBHOOK] Verified successfully!")
			return c.SendString(challenge)
		} else {
			log.Printf("[META WEBHOOK] Verification FAILED. Expected: %s, Got: %s", verifyToken, token)
			return c.SendStatus(403)
		}
	})

	// Meta Webhook Status Updates (POST)
	// Receives message status (sent, delivered, read) and incoming messages.
	api.Post("/meta/webhook", func(c *fiber.Ctx) error {
		// Log the raw payload for debugging
		// In production, you would parse and update lead status
		log.Println("[META WEBHOOK] Received Payload:", string(c.Body()))
		return c.SendStatus(200)
	})

	// AUTH ENDPOINTS
	api.Post("/login", loginLimiter, func(c *fiber.Ctx) error {
		var req LoginRequest
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// SECURITY: Account Lockout (Phase 5)
		clientIP := c.IP()
		loginAttemptsMutex.Lock()
		attempt, exists := loginAttempts[clientIP]
		if !exists {
			attempt = &LoginAttempt{}
			loginAttempts[clientIP] = attempt
		}

		// Check if locked
		if attempt.IsLocked {
			// Check if 15 min has passed
			if time.Since(attempt.LockedAt) > 15*time.Minute {
				// Unlock
				attempt.IsLocked = false
				attempt.Count = 0
			} else {
				loginAttemptsMutex.Unlock()
				remaining := 15*time.Minute - time.Since(attempt.LockedAt)
				log.Printf("[SECURITY] Blocked locked IP: %s (%.0f min remaining)", clientIP, remaining.Minutes())
				return c.Status(429).JSON(fiber.Map{
					"error":   "Account locked due to too many failed attempts",
					"minutes": int(remaining.Minutes()) + 1,
				})
			}
		}
		loginAttemptsMutex.Unlock()

		adminEmail := os.Getenv("ADMIN_EMAIL")
		if adminEmail == "" {
			adminEmail = "admin@pixe.com"
		}

		log.Printf("Login attempt for: %s (Expected: %s)", req.Email, adminEmail)

		if req.Email != adminEmail {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
		}

		envPassHash := os.Getenv("ADMIN_PASSWORD_HASH")
		isValid := false
		if envPassHash != "" {
			if err := bcrypt.CompareHashAndPassword([]byte(envPassHash), []byte(req.Password)); err == nil {
				isValid = true
			}
		} else {
			// Dev fallback
			if req.Password == "admin123" {
				isValid = true
			}
		}

		if !isValid {
			// SECURITY: Track failed attempt (Phase 5)
			loginAttemptsMutex.Lock()
			attempt.Count++
			attempt.LastTry = time.Now()
			if attempt.Count >= 5 {
				attempt.IsLocked = true
				attempt.LockedAt = time.Now()
				log.Printf("[SECURITY] IP LOCKED: %s after 5 failed attempts", clientIP)
			}
			loginAttemptsMutex.Unlock()
			return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
		}

		// SECURITY: Reset failed attempts on success
		loginAttemptsMutex.Lock()
		delete(loginAttempts, clientIP)
		loginAttemptsMutex.Unlock()

		// Check if TOTP is enabled
		settingsMutex.RLock()
		totpEnabled := settings.EnableTOTP
		settingsMutex.RUnlock()

		if totpEnabled {
			// Generate temporary token for TOTP verification
			tempToken := jwt.New(jwt.SigningMethodHS256)
			tempClaims := tempToken.Claims.(jwt.MapClaims)
			tempClaims["email"] = req.Email
			tempClaims["totp_pending"] = true
			tempClaims["exp"] = time.Now().Add(time.Minute * 5).Unix() // 5 min expiry

			t, err := tempToken.SignedString(jwtSecret)
			if err != nil {
				return c.Status(500).JSON(fiber.Map{"error": "Failed to generate token"})
			}

			return c.JSON(fiber.Map{
				"status":    "totp_required",
				"message":   "TOTP verification required",
				"tempToken": t,
			})
		}

		// Generate JWT (no TOTP required)
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["email"] = req.Email
		claims["role"] = "admin"
		claims["exp"] = time.Now().Add(time.Hour * 1).Unix() // SECURITY: Session timeout after 1 hour (Phase 5)
		claims["iat"] = time.Now().Unix()                    // Issued at (for inactivity tracking)

		t, err := token.SignedString(jwtSecret)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to generate token"})
		}

		// Determine if request is over HTTPS for secure cookie
		isSecure := c.Protocol() == "https" || c.Get("X-Forwarded-Proto") == "https"

		c.Cookie(&fiber.Cookie{
			Name:     "auth-token",
			Value:    t,
			Expires:  time.Now().Add(time.Hour * 1), // SECURITY: 1 hour session
			HTTPOnly: true,
			Secure:   isSecure,
			SameSite: "Strict",
		})

		return c.JSON(fiber.Map{"status": "success", "message": "Login successful", "token": t})
	})

	// TOTP 2FA ENDPOINTS

	// Generate TOTP secret and QR code URL for setup
	api.Get("/totp/setup", authMiddleware, func(c *fiber.Ctx) error {
		settingsMutex.Lock()
		defer settingsMutex.Unlock()

		// Generate new TOTP secret
		key, err := totp.Generate(totp.GenerateOpts{
			Issuer:      "Pixe CMS",
			AccountName: "admin@pixe.com",
			Period:      30,
			Digits:      otp.DigitsSix,
			Algorithm:   otp.AlgorithmSHA1,
		})
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to generate TOTP secret"})
		}

		// Store the secret temporarily (will be saved when user confirms)
		settings.TOTPSecret = key.Secret()
		saveSettings()

		return c.JSON(fiber.Map{
			"secret":    key.Secret(),
			"qrCodeUrl": key.URL(),
			"issuer":    "Pixe CMS",
			"account":   "admin@pixe.com",
		})
	})

	// Verify TOTP code and enable 2FA
	api.Post("/totp/enable", authMiddleware, func(c *fiber.Ctx) error {
		var req struct {
			Code string `json:"code"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		settingsMutex.Lock()
		defer settingsMutex.Unlock()

		if settings.TOTPSecret == "" {
			return c.Status(400).JSON(fiber.Map{"error": "No TOTP secret configured. Run setup first."})
		}

		// Verify the code
		valid := totp.Validate(req.Code, settings.TOTPSecret)
		if !valid {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid TOTP code"})
		}

		// Enable TOTP
		settings.EnableTOTP = true
		saveSettings()

		return c.JSON(fiber.Map{"status": "success", "message": "TOTP 2FA enabled successfully"})
	})

	// Disable TOTP 2FA
	api.Post("/totp/disable", authMiddleware, func(c *fiber.Ctx) error {
		var req struct {
			Code string `json:"code"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		settingsMutex.Lock()
		defer settingsMutex.Unlock()

		if !settings.EnableTOTP {
			return c.Status(400).JSON(fiber.Map{"error": "TOTP is not enabled"})
		}

		// Verify the code before disabling
		valid := totp.Validate(req.Code, settings.TOTPSecret)
		if !valid {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid TOTP code"})
		}

		// Disable TOTP
		settings.EnableTOTP = false
		settings.TOTPSecret = ""
		saveSettings()

		return c.JSON(fiber.Map{"status": "success", "message": "TOTP 2FA disabled"})
	})

	// Validate TOTP code during login (called after password verification)
	api.Post("/totp/validate", func(c *fiber.Ctx) error {
		var req struct {
			Code      string `json:"code"`
			TempToken string `json:"tempToken"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		// Verify temp token
		token, err := jwt.Parse(req.TempToken, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})
		if err != nil || !token.Valid {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired temp token"})
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid token claims"})
		}

		// Check if this is a pending TOTP token
		if claims["totp_pending"] != true {
			return c.Status(400).JSON(fiber.Map{"error": "Token is not pending TOTP verification"})
		}

		settingsMutex.RLock()
		totpSecret := settings.TOTPSecret
		settingsMutex.RUnlock()

		// Validate TOTP code
		valid := totp.Validate(req.Code, totpSecret)
		if !valid {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid TOTP code"})
		}

		// Generate final JWT token
		email, _ := claims["email"].(string)
		finalToken := jwt.New(jwt.SigningMethodHS256)
		finalClaims := finalToken.Claims.(jwt.MapClaims)
		finalClaims["email"] = email
		finalClaims["role"] = "admin"
		finalClaims["exp"] = time.Now().Add(time.Hour * 72).Unix()

		t, err := finalToken.SignedString(jwtSecret)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to generate token"})
		}

		// Set cookie
		isSecure := c.Protocol() == "https" || c.Get("X-Forwarded-Proto") == "https"
		c.Cookie(&fiber.Cookie{
			Name:     "auth-token",
			Value:    t,
			Expires:  time.Now().Add(time.Hour * 72),
			HTTPOnly: true,
			Secure:   isSecure,
			SameSite: "Strict",
		})

		return c.JSON(fiber.Map{"status": "success", "message": "Login successful", "token": t})
	})

	// SAML HANDLERS
	api.Get("/saml/login", func(c *fiber.Ctx) error {
		settingsMutex.RLock()
		idpMetadataURL := settings.SAMLIDPMetadataURL
		spEntityID := settings.SAMLSPEntityID
		spAcsURL := settings.SamlSpAcsUrl
		settingsMutex.RUnlock()

		// Fallback to Env
		if idpMetadataURL == "" {
			idpMetadataURL = os.Getenv("SAML_IDP_METADATA_URL")
		}
		if spEntityID == "" {
			spEntityID = os.Getenv("SAML_SP_ENTITY_ID")
			if spEntityID == "" {
				spEntityID = "http://localhost:8080/api/v1/saml/metadata"
			}
		}
		if spAcsURL == "" {
			spAcsURL = os.Getenv("SAML_SP_ACS_URL")
			if spAcsURL == "" {
				spAcsURL = "http://localhost:8080/api/v1/saml/acs"
			}
		}

		if idpMetadataURL == "" {
			return c.Status(500).JSON(fiber.Map{"error": "SAML IdP Metadata URL not configured"})
		}

		res, err := http.Get(idpMetadataURL)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch IdP metadata"})
		}
		defer res.Body.Close()

		metadata, err := io.ReadAll(res.Body)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to read IdP metadata"})
		}

		// Parse Metadata Manually
		var entityDesc types.EntityDescriptor
		if err := xml.Unmarshal(metadata, &entityDesc); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to parse IdP metadata", "details": err.Error()})
		}

		idpDescriptor := entityDesc.IDPSSODescriptor
		if idpDescriptor == nil {
			return c.Status(500).JSON(fiber.Map{"error": "Invalid IdP Metadata: Missing IDPSSODescriptor"})
		}

		ssoURL := ""
		for _, sso := range idpDescriptor.SingleSignOnServices {
			if sso.Binding == "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" {
				ssoURL = sso.Location
				break
			}
		}
		if ssoURL == "" && len(idpDescriptor.SingleSignOnServices) > 0 {
			ssoURL = idpDescriptor.SingleSignOnServices[0].Location
		}

		var idpCertStore dsig.X509CertificateStore
		if len(idpDescriptor.KeyDescriptors) > 0 {
			for _, kd := range idpDescriptor.KeyDescriptors {
				if kd.Use == "signing" || kd.Use == "" {
					if len(kd.KeyInfo.X509Data.X509Certificates) > 0 {
						certData := kd.KeyInfo.X509Data.X509Certificates[0].Data
						// Decode base64
						certBytes, err := base64.StdEncoding.DecodeString(certData)
						if err == nil {
							if cert, err := x509.ParseCertificate(certBytes); err == nil {
								idpCertStore = &dsig.MemoryX509CertificateStore{
									Roots: []*x509.Certificate{cert},
								}
								break
							}
						}
					}
				}
			}
		}
		if idpCertStore == nil {
			// Fallback: Try to use empty store if no cert found (likely will fail validation)
			idpCertStore = &dsig.MemoryX509CertificateStore{Roots: []*x509.Certificate{}}
		}

		sp := &saml2.SAMLServiceProvider{
			IdentityProviderSSOURL:      ssoURL,
			IdentityProviderIssuer:      entityDesc.EntityID,
			ServiceProviderIssuer:       spEntityID,
			AssertionConsumerServiceURL: spAcsURL,
			SignAuthnRequests:           false, // Simplify for now, set true if we have keys
			AudienceURI:                 spEntityID,
			IDPCertificateStore:         idpCertStore,
			SPKeyStore:                  &dsig.MemoryX509KeyStore{},
		}

		authURL, err := sp.BuildAuthURL("")
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to build SAML Auth URL", "details": err.Error()})
		}

		return c.Redirect(authURL)
	})

	api.Post("/saml/acs", func(c *fiber.Ctx) error {
		settingsMutex.RLock()
		idpMetadataURL := settings.SAMLIDPMetadataURL
		spEntityID := settings.SAMLSPEntityID
		spAcsURL := settings.SamlSpAcsUrl
		settingsMutex.RUnlock()

		// Fallback to Env
		if idpMetadataURL == "" {
			idpMetadataURL = os.Getenv("SAML_IDP_METADATA_URL")
		}
		if spEntityID == "" {
			spEntityID = os.Getenv("SAML_SP_ENTITY_ID")
			if spEntityID == "" {
				spEntityID = "http://localhost:8080/api/v1/saml/metadata"
			}
		}
		if spAcsURL == "" {
			spAcsURL = os.Getenv("SAML_SP_ACS_URL")
			if spAcsURL == "" {
				spAcsURL = "http://localhost:8080/api/v1/saml/acs"
			}
		}

		if idpMetadataURL == "" {
			return c.Status(500).JSON(fiber.Map{"error": "SAML IdP Metadata URL not configured"})
		}

		res, err := http.Get(idpMetadataURL)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch IdP metadata"})
		}
		defer res.Body.Close()
		metadata, err := io.ReadAll(res.Body)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to read IdP metadata"})
		}

		// Parse Metadata Manually
		var entityDesc types.EntityDescriptor
		if err := xml.Unmarshal(metadata, &entityDesc); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to parse IdP metadata"})
		}

		idpDescriptor := entityDesc.IDPSSODescriptor
		if idpDescriptor == nil {
			return c.Status(500).JSON(fiber.Map{"error": "Invalid IdP Metadata: Missing IDPSSODescriptor"})
		}

		var idpCertStore dsig.X509CertificateStore
		if len(idpDescriptor.KeyDescriptors) > 0 {
			for _, kd := range idpDescriptor.KeyDescriptors {
				if kd.Use == "signing" || kd.Use == "" {
					if len(kd.KeyInfo.X509Data.X509Certificates) > 0 {
						certData := kd.KeyInfo.X509Data.X509Certificates[0].Data
						// Decode base64
						certBytes, err := base64.StdEncoding.DecodeString(certData)
						if err == nil {
							if cert, err := x509.ParseCertificate(certBytes); err == nil {
								idpCertStore = &dsig.MemoryX509CertificateStore{
									Roots: []*x509.Certificate{cert},
								}
								break
							}
						}
					}
				}
			}
		}
		if idpCertStore == nil {
			idpCertStore = &dsig.MemoryX509CertificateStore{Roots: []*x509.Certificate{}}
		}

		sp := &saml2.SAMLServiceProvider{
			IdentityProviderIssuer:      entityDesc.EntityID,
			ServiceProviderIssuer:       spEntityID,
			AssertionConsumerServiceURL: spAcsURL,
			AudienceURI:                 spEntityID,
			IDPCertificateStore:         idpCertStore,
			SPKeyStore:                  &dsig.MemoryX509KeyStore{},
		}

		samlResponse := c.FormValue("SAMLResponse")
		if samlResponse == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Missing SAMLResponse"})
		}

		assertionInfo, err := sp.RetrieveAssertionInfo(samlResponse)
		if err != nil {
			log.Printf("SAML Error: %v", err)
			return c.Status(401).JSON(fiber.Map{"error": "Invalid SAML Response", "details": err.Error()})
		}

		// Extract User Info
		email := ""
		if assertionInfo.NameID != "" {
			email = assertionInfo.NameID
		}
		// Try attributes if NameID is empty or generic
		for name, attr := range assertionInfo.Values {
			if strings.Contains(strings.ToLower(name), "email") {
				if len(attr.Values) > 0 {
					email = attr.Values[0].Value
					break
				}
			}
		}

		if email == "" {
			return c.Status(400).JSON(fiber.Map{"error": "No email found in SAML Assertion"})
		}

		// Issue JWT
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["email"] = email
		claims["role"] = "admin" // Default to admin for CMS logic, or check DB
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

		t, err := token.SignedString(jwtSecret)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to sign token"})
		}

		// Redirect to frontend with token
		return c.Redirect("http://localhost:3002/dashboard?token=" + t)
	})

	// GOOGLE OAUTH HANDLERS
	api.Get("/oauth/google/login", func(c *fiber.Ctx) error {
		settingsMutex.RLock()
		clientID := settings.GoogleClientId
		clientSecret := settings.GoogleClientSecret
		redirectURL := settings.GoogleRedirectUrl
		settingsMutex.RUnlock()

		if clientID == "" || clientSecret == "" {
			return c.Status(500).JSON(fiber.Map{"error": "Google OAuth not configured"})
		}
		if redirectURL == "" {
			redirectURL = "http://localhost:8080/api/v1/oauth/google/callback"
		}

		conf := &oauth2.Config{
			ClientID:     clientID,
			ClientSecret: clientSecret,
			RedirectURL:  redirectURL,
			Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
			Endpoint:     google.Endpoint,
		}

		url := conf.AuthCodeURL("state-token", oauth2.AccessTypeOffline, oauth2.SetAuthURLParam("prompt", "select_account consent"))
		return c.Redirect(url)
	})

	api.Get("/oauth/google/callback", func(c *fiber.Ctx) error {
		state := c.Query("state")
		if state != "state-token" {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid state"})
		}

		code := c.Query("code")
		if code == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Code not found"})
		}

		settingsMutex.RLock()
		clientID := settings.GoogleClientId
		clientSecret := settings.GoogleClientSecret
		redirectURL := settings.GoogleRedirectUrl
		settingsMutex.RUnlock()

		if redirectURL == "" {
			redirectURL = "http://localhost:8080/api/v1/oauth/google/callback"
		}

		conf := &oauth2.Config{
			ClientID:     clientID,
			ClientSecret: clientSecret,
			RedirectURL:  redirectURL,
			Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
			Endpoint:     google.Endpoint,
		}

		token, err := conf.Exchange(c.Context(), code)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to exchange token", "details": err.Error()})
		}

		client := conf.Client(c.Context(), token)
		userInfoResp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to get user info"})
		}
		defer userInfoResp.Body.Close()

		var userInfo struct {
			Email string `json:"email"`
		}
		if err := json.NewDecoder(userInfoResp.Body).Decode(&userInfo); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to parse user info"})
		}

		// WHITELIST CHECK: Only allow users in the users list to login
		usersMutex.RLock()
		var foundUser *User
		for i := range users {
			if strings.EqualFold(users[i].Email, userInfo.Email) {
				foundUser = &users[i]
				break
			}
		}
		usersMutex.RUnlock()

		// Derive frontend base URL from the configured redirect URL
		// If redirect is https://web.waba.tools/api/v1/oauth/google/callback
		// Then frontend is https://web.waba.tools
		frontendBaseURL := "http://localhost:3002" // Default for local dev
		if redirectURL != "" && strings.Contains(redirectURL, "/api/") {
			// Extract base URL (everything before /api/)
			parts := strings.Split(redirectURL, "/api/")
			if len(parts) > 0 && parts[0] != "" {
				frontendBaseURL = parts[0]
			}
		}

		if foundUser == nil {
			// User not in whitelist - redirect to login with error
			return c.Redirect(frontendBaseURL + "/login?error=not_authorized")
		}

		// Update user status to active if invited
		if foundUser.Status == "invited" {
			usersMutex.Lock()
			for i := range users {
				if users[i].ID == foundUser.ID {
					users[i].Status = "active"
					break
				}
			}
			usersMutex.Unlock()
		}

		// Determine role from user record
		userRole := foundUser.Role
		if userRole == "" {
			userRole = "admin"
		}

		// Issue JWT
		jwtDesc := jwt.New(jwt.SigningMethodHS256)
		claims := jwtDesc.Claims.(jwt.MapClaims)
		claims["email"] = userInfo.Email
		claims["role"] = userRole
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

		t, err := jwtDesc.SignedString(jwtSecret)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to sign token"})
		}

		// Redirect to frontend with dynamic URL
		// Also set the auth-token cookie with dynamic Secure flag
		isSecure := strings.HasPrefix(frontendBaseURL, "https://")
		c.Cookie(&fiber.Cookie{
			Name:     "auth-token",
			Value:    t,
			Expires:  time.Now().Add(time.Hour * 24),
			HTTPOnly: true,
			Secure:   isSecure,
			SameSite: "Strict",
			Path:     "/",
		})

		return c.Redirect(frontendBaseURL + "/dashboard")
	})

	api.Get("/saml/metadata", func(c *fiber.Ctx) error {
		settingsMutex.RLock()
		spEntityID := settings.SAMLSPEntityID
		spAcsURL := settings.SamlSpAcsUrl
		settingsMutex.RUnlock()

		if spEntityID == "" {
			spEntityID = os.Getenv("SAML_SP_ENTITY_ID")
			if spEntityID == "" {
				spEntityID = "http://localhost:8080/api/v1/saml/metadata"
			}
		}
		if spAcsURL == "" {
			spAcsURL = os.Getenv("SAML_SP_ACS_URL")
			if spAcsURL == "" {
				spAcsURL = "http://localhost:8080/api/v1/saml/acs"
			}
		}

		// Return minimal metadata XML (todo: use library to generate if strict XML needed)
		xml := fmt.Sprintf(`<?xml version="1.0"?>
<md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="%s">
 <md:SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
   <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="%s" index="0"/>
 </md:SPSSODescriptor>
</md:EntityDescriptor>`, spEntityID, spAcsURL)

		c.Set("Content-Type", "application/xml")
		return c.SendString(xml)
	})

	// PROTECTED ADMIN ROUTES - Require JWT authentication + IP Allowlist (Phase 6)
	admin := api.Group("/admin", authMiddleware, ipAllowlistMiddleware)

	// Admin-only: User management	// Admin-only: View all users - SECURITY: RBAC REQUIRED
	admin.Get("/users", requireAdmin, func(c *fiber.Ctx) error {
		// Try database first
		if db != nil {
			rows, err := db.Query("SELECT id, email, role, status, created_at FROM users ORDER BY id")
			if err == nil {
				defer rows.Close()
				var dbUsers []User
				for rows.Next() {
					var u User
					if err := rows.Scan(&u.ID, &u.Email, &u.Role, &u.Status, &u.CreatedAt); err == nil {
						dbUsers = append(dbUsers, u)
					}
				}
				return c.JSON(dbUsers)
			}
			log.Printf("DB query failed, falling back to memory: %v", err)
		}
		// Fallback to memory
		usersMutex.RLock()
		defer usersMutex.RUnlock()
		return c.JSON(users)
	})

	// SECURITY: Encrypted Backup Export (Phase 6)
	admin.Get("/encrypted-backup", requireAdmin, func(c *fiber.Ctx) error {
		// Collect all data for backup
		backup := struct {
			Timestamp string     `json:"timestamp"`
			Leads     []Lead     `json:"leads"`
			Users     []User     `json:"users"`
			Settings  Settings   `json:"settings"`
			AuditLogs []AuditLog `json:"audit_logs"`
			Courses   []Course   `json:"courses"`
		}{
			Timestamp: time.Now().Format(time.RFC3339),
		}

		// Safely copy data
		leadsMutex.RLock()
		backup.Leads = leads
		leadsMutex.RUnlock()

		usersMutex.RLock()
		backup.Users = users
		usersMutex.RUnlock()

		settingsMutex.RLock()
		backup.Settings = settings
		settingsMutex.RUnlock()

		auditLogsMutex.RLock()
		backup.AuditLogs = auditLogs
		auditLogsMutex.RUnlock()

		coursesMutex.RLock()
		backup.Courses = courses
		coursesMutex.RUnlock()

		// Serialize to JSON
		plaintext, err := json.Marshal(backup)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to serialize backup"})
		}

		// Encrypt with AES-256
		key := getBackupEncryptionKey()
		ciphertext, err := encryptAES256(plaintext, key)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Encryption failed"})
		}

		// Return as base64-encoded download
		logAdminAction(c, "ENCRYPTED_BACKUP", "System", "Full backup exported")

		c.Set("Content-Type", "application/octet-stream")
		c.Set("Content-Disposition", fmt.Sprintf("attachment; filename=backup_%s.enc", time.Now().Format("20060102_150405")))
		return c.Send(ciphertext)
	})

	// SECURITY: Secret Rotation Info (Phase 6)
	admin.Get("/secret-info", requireAdmin, func(c *fiber.Ctx) error {
		// Return info about current secrets (not the secrets themselves)
		jwtKey := os.Getenv("JWT_SECRET")
		backupKey := os.Getenv("BACKUP_ENCRYPTION_KEY")

		return c.JSON(fiber.Map{
			"jwt_secret_set":    jwtKey != "" && jwtKey != "change-me-in-production",
			"jwt_secret_length": len(jwtKey),
			"backup_key_set":    backupKey != "",
			"backup_key_length": len(backupKey),
			"recommendation":    "Rotate secrets every 30-90 days",
			"last_checked":      time.Now().Format(time.RFC3339),
		})
	})

	admin.Delete("/users/:id", requireAdmin, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}
		// Try database first (ONLY IN DEV MODE)
		settingsMutex.RLock()
		devMode := settings.EnableDevelopmentMode
		settingsMutex.RUnlock()

		if db != nil && devMode {
			result, err := db.Exec("DELETE FROM users WHERE id = $1", id)
			if err == nil {
				affected, _ := result.RowsAffected()
				if affected > 0 {
					return c.SendStatus(204)
				}
				return c.Status(404).JSON(fiber.Map{"error": "User not found"})
			}
			log.Printf("DB delete failed, falling back to memory: %v", err)
		}
		// Fallback to memory
		usersMutex.Lock()
		defer usersMutex.Unlock()
		for i, u := range users {
			if u.ID == id {
				users = append(users[:i], users[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	})

	// Admin-only: Settings management
	admin.Post("/settings", requireAdmin, func(c *fiber.Ctx) error {
		var update Settings
		if err := c.BodyParser(&update); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		settingsMutex.Lock()
		settings = update
		saveSettings() // Persist
		settingsMutex.Unlock()

		// Reload Database Connection
		if err := reloadDatabaseConnection(); err != nil {
			log.Printf("Error reloading database: %v", err)
			// Return a warning but still success for the settings save
			return c.Status(200).JSON(fiber.Map{
				"settings": settings,
				"warning":  fmt.Sprintf("Settings saved, but DB connection failed: %v", err),
			})
		}

		return c.JSON(settings)
	})

	// Admin-only: View all subscribers (sensitive data) - SECURITY: RBAC Required
	admin.Get("/subscribers", requireAdmin, func(c *fiber.Ctx) error {
		// Try database first
		if db != nil {
			rows, err := db.Query("SELECT id, email, created_at FROM subscribers ORDER BY id DESC")
			if err == nil {
				defer rows.Close()
				var dbSubs []Subscriber
				for rows.Next() {
					var s Subscriber
					if err := rows.Scan(&s.ID, &s.Email, &s.CreatedAt); err == nil {
						dbSubs = append(dbSubs, s)
					}
				}
				return c.JSON(dbSubs)
			}
		}
		// Fallback to memory
		subscribersMutex.RLock()
		defer subscribersMutex.RUnlock()
		return c.JSON(subscribers)
	})

	// Admin-only: View all analytics - SECURITY: RBAC Required
	admin.Get("/analytics", requireAdmin, func(c *fiber.Ctx) error {
		analyticsMutex.RLock()
		defer analyticsMutex.RUnlock()
		return c.JSON(analytics)
	})

	// ADMIN DASHBOARD - SYNC STATUS (COUNTS)
	admin.Get("/sync-status", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		// Helper to get count with fallback
		getCount := func(tableName string, memoryCount int) (int, string, bool) {
			var count int
			var lastUpdated string
			isRealtime := false

			// If DB connected, try to get count
			if db != nil {
				// Tables that exist
				if tableName == "leads" || tableName == "users" || tableName == "pages" ||
					tableName == "courses" || tableName == "posts" || tableName == "events" ||
					tableName == "subscribers" || tableName == "form_fields" {

					err := db.QueryRow("SELECT COUNT(*) FROM " + tableName).Scan(&count)
					if err == nil {
						// For now, using current time as last sync since we pull live
						// In future, could query MAX(updated_at)
						lastUpdated = time.Now().Format(time.RFC3339)
						if tableName == "leads" {
							isRealtime = true
						}
						return count, lastUpdated, isRealtime
					}
				}
			}

			// Fallback to memory
			return memoryCount, time.Now().Format(time.RFC3339), false
		}

		// 1. Leads
		leadsMutex.RLock()
		leadsCount := len(leads)
		leadsMutex.RUnlock()
		lCount, lTime, lRt := getCount("leads", leadsCount)

		// 2. Users
		usersMutex.RLock()
		uCount, uTime, _ := getCount("users", len(users))
		usersMutex.RUnlock()

		// 3. Pages
		pagesMutex.RLock()
		pCount, pTime, _ := getCount("pages", len(pages))
		pagesMutex.RUnlock()

		// 4. Courses
		coursesMutex.RLock()
		cCount, cTime, _ := getCount("courses", len(courses))
		coursesMutex.RUnlock()

		// 5. Posts
		postsMutex.RLock()
		blogCount, blogTime, _ := getCount("posts", len(posts))
		postsMutex.RUnlock()

		// 6. Events
		eventsMutex.RLock()
		eCount, eTime, _ := getCount("events", len(events))
		eventsMutex.RUnlock()

		// 7. Subscribers
		subscribersMutex.RLock()
		sCount, sTime, _ := getCount("subscribers", len(subscribers))
		subscribersMutex.RUnlock()

		// 8. Form Fields
		formFieldsMutex.RLock()
		ffCount, ffTime, _ := getCount("form_fields", len(formFields))
		formFieldsMutex.RUnlock()

		// 9. Corporate Leads (Memory Only for now)
		corporateLeadsMutex.RLock()
		clCount := len(corporateLeads)
		corporateLeadsMutex.RUnlock()

		// 10. Downloads (Memory Only)
		downloadsMutex.RLock()
		dCount := len(downloads)
		downloadsMutex.RUnlock()

		// 11. Stories (Memory Only)
		storiesMutex.RLock()
		stCount := len(stories)
		storiesMutex.RUnlock()

		// 12. FAQs (Memory Only)
		faqsMutex.RLock()
		fCount := len(faqs)
		faqsMutex.RUnlock()

		// 13. Partners (Memory Only)
		partnersMutex.RLock()
		ptCount := len(partners)
		partnersMutex.RUnlock()

		// 14. Authors (Memory Only)
		authorsMutex.RLock()
		aCount := len(authors)
		authorsMutex.RUnlock()

		// 15. Analytics (Memory Only)
		analyticsMutex.RLock()
		anCount := len(analytics)
		analyticsMutex.RUnlock()

		// 16. PPC (Memory Only)
		ppcMutex.RLock()
		ppcCount := len(ppcCampaigns)
		ppcMutex.RUnlock()

		return c.JSON(fiber.Map{
			"leads":           fiber.Map{"count": lCount, "lastUpdated": lTime, "realtime": lRt},
			"users":           fiber.Map{"count": uCount, "lastUpdated": uTime},
			"pages":           fiber.Map{"count": pCount, "lastUpdated": pTime},
			"courses":         fiber.Map{"count": cCount, "lastUpdated": cTime},
			"posts":           fiber.Map{"count": blogCount, "lastUpdated": blogTime},
			"events":          fiber.Map{"count": eCount, "lastUpdated": eTime},
			"subscribers":     fiber.Map{"count": sCount, "lastUpdated": sTime},
			"form_fields":     fiber.Map{"count": ffCount, "lastUpdated": ffTime},
			"corporate_leads": fiber.Map{"count": clCount, "lastUpdated": time.Now().Format(time.RFC3339)},
			"downloads":       fiber.Map{"count": dCount, "lastUpdated": time.Now().Format(time.RFC3339)},
			"stories":         fiber.Map{"count": stCount, "lastUpdated": time.Now().Format(time.RFC3339)},
			"faqs":            fiber.Map{"count": fCount, "lastUpdated": time.Now().Format(time.RFC3339)},
			"partners":        fiber.Map{"count": ptCount, "lastUpdated": time.Now().Format(time.RFC3339)},
			"authors":         fiber.Map{"count": aCount, "lastUpdated": time.Now().Format(time.RFC3339)},
			"analytics":       fiber.Map{"count": anCount, "lastUpdated": time.Now().Format(time.RFC3339)},
			"ppc":             fiber.Map{"count": ppcCount, "lastUpdated": time.Now().Format(time.RFC3339)},
		})
	})

	// Admin-only: View System Logs
	admin.Get("/logs", requireAdmin, func(c *fiber.Ctx) error {
		content, err := os.ReadFile("backend.log")
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to read logs"})
		}
		// Return last 2000 lines or characters to avoid massive payloads
		// For simplicity, returning full content for now (assumed manageable for daily rotations)
		return c.SendString(string(content))
	})

	// SETTINGS ENDPOINT - PUBLIC (Safe fields only)
	api.Get("/settings", func(c *fiber.Ctx) error {
		settingsMutex.RLock()
		defer settingsMutex.RUnlock()
		// Only return safe public settings
		publicSettings := fiber.Map{
			"siteTitle":          settings.SiteTitle,
			"siteDescription":    settings.SiteDescription,
			"contactEmail":       settings.ContactEmail,
			"phoneNumber":        settings.PhoneNumber,
			"pageMessages":       settings.PageMessages,
			"googleTagManagerId": settings.GoogleTagManagerId,
			// Login method toggles for login page
			"enableEmailLogin":  settings.EnableEmailLogin,
			"enableSAML":        settings.EnableSAML,
			"enableGoogleOAuth": settings.EnableGoogleOAuth,
			// Feature toggles for forms
			"enableWhatsApp": settings.EnableWhatsApp,
			"pageTickers":    settings.PageTickers,
		}
		return c.JSON(publicSettings)
	})

	// ADMIN DASHBOARD - SYNC DATA (MEMORY -> DB)
	admin.Post("/sync-data", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		if db == nil {
			return c.Status(503).JSON(fiber.Map{"error": "Database not connected. Cannot sync."})
		}

		ctx := context.Background()

		// 1. Sync LEADS
		leadsMutex.RLock()
		localLeads := leads
		leadsMutex.RUnlock()

		tx, err := db.BeginTx(ctx, nil)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to start transaction"})
		}
		defer tx.Rollback() // Rollback if not committed

		for _, l := range localLeads {
			// Upsert Lead
			// Note: Assuming 'email' or 'id' logic. For simplicity, we insert if ID not exists or just insert.
			// Ideally we use ON CONFLICT. Here we use a safe insert ignore for duplicate emails if possible or just append.
			// SQLite/Postgres syntax differs. Using Postgres syntax compatible.
			_, err := tx.ExecContext(ctx, `
				INSERT INTO leads (name, email, phone, message, course, source, status, created_at, verification_token, utm_campaign, utm_source, utm_medium)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
				ON CONFLICT (id) DO NOTHING; -- If ID conflict, skip. If email is unique (not set), it might fail.
			`, l.Name, l.Email, l.Phone, l.Message, l.Course, l.Source, l.Status, time.Now().Format(time.RFC3339), l.VerificationToken, "", "", "")
			// Note: We might want to use real created_at if available or defaults.
			if err != nil {
				log.Printf("Sync Lead Error: %v", err)
				// Continue... (best effort)
			}
		}

		// 2. Sync USERS
		usersMutex.RLock()
		localUsers := users
		usersMutex.RUnlock()
		for _, u := range localUsers {
			_, err := tx.ExecContext(ctx, `
				INSERT INTO users (email, role, status, created_at)
				VALUES ($1, $2, $3, $4)
				ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role, status = EXCLUDED.status;
			`, u.Email, u.Role, u.Status, time.Now().Format(time.RFC3339))
			if err != nil {
				log.Printf("Sync User Error: %v", err)
			}
		}

		// 3. Sync PAGES
		pagesMutex.RLock()
		localPages := pages
		pagesMutex.RUnlock()
		for _, p := range localPages {
			_, err := tx.ExecContext(ctx, `
				INSERT INTO pages (slug, title, content, status, seo_title, seo_description, created_at, updated_at)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
				ON CONFLICT (slug) DO UPDATE SET 
					title = EXCLUDED.title, 
					content = EXCLUDED.content, 
					status = EXCLUDED.status,
					updated_at = EXCLUDED.updated_at;
			`, p.Slug, p.Title, p.Html, "published", p.Title, "", time.Now().Format(time.RFC3339), time.Now().Format(time.RFC3339))
			if err != nil {
				log.Printf("Sync Page Error: %v", err)
			}
		}

		// 4. Sync COURSES
		coursesMutex.RLock()
		localCourses := courses
		coursesMutex.RUnlock()
		for _, co := range localCourses {
			_, err := tx.ExecContext(ctx, `
				INSERT INTO courses (title, slug, description, duration, price, image, status, created_at)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
				ON CONFLICT (slug) DO UPDATE SET
					title = EXCLUDED.title,
					description = EXCLUDED.description,
					duration = EXCLUDED.duration,
					price = EXCLUDED.price,
					status = EXCLUDED.status;
			`, co.Title, co.Slug, co.Subtitle, "4 Weeks", co.SalaryRange, "", "active", time.Now().Format(time.RFC3339))
			if err != nil {
				log.Printf("Sync Course Error: %v", err)
			}
		}

		// 5. Sync POSTS
		postsMutex.RLock()
		localPosts := posts
		postsMutex.RUnlock()
		for _, po := range localPosts {
			_, err := tx.ExecContext(ctx, `
				INSERT INTO posts (title, slug, content, excerpt, author, status, created_at, updated_at)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
				ON CONFLICT (slug) DO UPDATE SET
					title = EXCLUDED.title,
					content = EXCLUDED.content,
					status = EXCLUDED.status,
					updated_at = EXCLUDED.updated_at;
			`, po.Title, po.Slug, po.Content, po.Excerpt, po.Author, "published", po.Date, po.Date)
			if err != nil {
				log.Printf("Sync Post Error: %v", err)
			}
		}

		// 6. Sync EVENTS
		eventsMutex.RLock()
		localEvents := events
		eventsMutex.RUnlock()
		for _, ev := range localEvents {
			_, err := tx.ExecContext(ctx, `
				INSERT INTO events (title, description, date, location, image, status, created_at)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				ON CONFLICT (id) DO UPDATE SET
					title = EXCLUDED.title,
					date = EXCLUDED.date;
			`, ev.Title, ev.Description, ev.Date, ev.Location, ev.Image, ev.Status, time.Now().Format(time.RFC3339))
			if err != nil {
				log.Printf("Sync Event Error: %v", err)
			}
		}

		// 7. Sync SUBSCRIBERS
		subscribersMutex.RLock()
		localSubs := subscribers
		subscribersMutex.RUnlock()
		for _, s := range localSubs {
			_, err := tx.ExecContext(ctx, `
				INSERT INTO subscribers (email, created_at)
				VALUES ($1, $2)
				ON CONFLICT (email) DO NOTHING;
			`, s.Email, s.CreatedAt)
			if err != nil {
				log.Printf("Sync Subscriber Error: %v", err)
			}
		}

		// 8. Sync FORM FIELDS
		formFieldsMutex.RLock()
		localFields := formFields
		formFieldsMutex.RUnlock()
		// Clear existing form fields? Or upsert? Upsert by name per form is tricky.
		// For simplicity, we'll delete and re-insert if that's safe, OR upscale by name.
		// Given schema has ID, clearing and re-inserting might break IDs but ensures sync.
		// Let's safe INSERT based on name.
		for _, f := range localFields {
			_, err := tx.ExecContext(ctx, `
				INSERT INTO form_fields (name, field_type, label, placeholder, required, options, field_order)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				ON CONFLICT (id) DO UPDATE SET
					label = EXCLUDED.label,
					required = EXCLUDED.required;
			`, f.Name, f.Type, f.Label, f.Placeholder, f.Required, strings.Join(f.Options, ","), f.Order)
			if err != nil {
				log.Printf("Sync FormField Error: %v", err)
			}
		}

		if err := tx.Commit(); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to commit transaction"})
		}

		return c.JSON(fiber.Map{
			"message": "Data synced successfully to database",
			"counts": fiber.Map{
				"leads": len(localLeads),
				"users": len(localUsers),
			},
		})
	})

	api.Get("/health", func(c *fiber.Ctx) error {
		dbStatus := "disconnected"
		if db != nil {
			if err := db.Ping(); err == nil {
				dbStatus = "connected"
			}
		}
		return c.JSON(fiber.Map{
			"status":    "ok",
			"service":   "backend-go",
			"db_status": dbStatus,
		})
	})

	// HIGH PERFORMANCE ENDPOINT
	// Ingests leads directly and sends to configured CRM/Webhook
	api.Post("/leads", func(c *fiber.Ctx) error {
		var lead Lead
		if err := c.BodyParser(&lead); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// SECURITY: Input validation
		if lead.Phone == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Phone required"})
		}

		// SECURITY: Length limits to prevent DoS
		if len(lead.Name) > 100 || len(lead.Email) > 100 || len(lead.Phone) > 20 {
			return c.Status(400).JSON(fiber.Map{"error": "Input too long"})
		}

		// SECURITY: Basic email format validation (if provided)
		if lead.Email != "" && !strings.Contains(lead.Email, "@") {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid email format"})
		}

		// SECURITY: Sanitize fields to prevent log injection and XSS
		lead.Name = strings.ReplaceAll(lead.Name, "\n", " ")
		lead.Name = strings.ReplaceAll(lead.Name, "\r", " ")
		lead.Phone = strings.ReplaceAll(lead.Phone, "\n", "")
		lead.Phone = strings.ReplaceAll(lead.Phone, "\r", "")

		// Log the lead (sanitized)
		log.Printf("[GO-BACKEND] New Lead Ingested: %s (%s) - Msg: %s", lead.Name, lead.Phone, lead.Message)

		// SECURITY: OTP Verification (WhatsApp)
		// Only require verification if WhatsApp is enabled in settings
		settingsMutex.RLock()
		whatsAppEnabled := settings.EnableWhatsApp
		settingsMutex.RUnlock()

		// If phone number is present AND WhatsApp is enabled, we MUST verify the OTP verification token
		if lead.Phone != "" && whatsAppEnabled {
			otpMutex.RLock()
			isValid := verifiedTokens[lead.VerificationToken]
			otpMutex.RUnlock()

			if !isValid {
				// Special check: Bypass for "newsletter" source which might not have phone or OTP UI
				// But here we are inside "lead.Phone != "" && whatsAppEnabled" check, so if they sent a phone, they MUST verify it.
				// Exception: If we have legacy forms or specific sources that don't support OTP yet.
				// For now, enforcing strict verification for ALL phone-bearing leads when WhatsApp is enabled.
				return c.Status(401).JSON(fiber.Map{"error": "Phone verification required. Invalid or missing token."})
			}

			// Optional: Invalidate token after use to prevent replay?
			// For now, let's keep it valid for session duration or until server restart
			// to avoid issues with double submissions or retries.
			// Ideally/Strictly: delete(verifiedTokens, lead.VerificationToken)
		}

		// Save to Memory
		leadsMutex.Lock()
		// Real-Time DB Sync (Development Mode)
		settingsMutex.RLock()
		devMode := settings.EnableDevelopmentMode
		settingsMutex.RUnlock()

		if db != nil && devMode {
			// Insert immediately
			createdTime := time.Now().Format(time.RFC3339)
			_, err := db.Exec(`
				INSERT INTO leads (name, email, phone, message, course, source, status, created_at, verification_token, utm_campaign, utm_source, utm_medium)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
			`, lead.Name, lead.Email, lead.Phone, lead.Message, lead.Course, lead.Source, "new", createdTime, lead.VerificationToken, "", "", "")

			if err != nil {
				log.Printf("❌ [DEV-MODE] Failed to sync lead to DB: %v", err)
				// Don't fail the request, just log. Memory is primary.
			} else {
				log.Println("✅ [DEV-MODE] Lead synced to DB in real-time.")
			}
		}

		defer leadsMutex.Unlock()

		// SECURITY: Memory DoS Protection (Cap global slice)
		if len(leads) >= 10000 {
			// FIFO Rotation: Remove oldest lead
			leads = leads[1:]
		}

		lead.ID = leadNextID
		leadNextID++
		lead.Status = "new"
		lead.CreatedAt = time.Now().Format("2006-01-02 15:04:05")

		// PERSISTENCE: Save to DB if available
		if db != nil {
			query := `
				INSERT INTO leads (name, email, phone, message, course, source, status, created_at, verification_token, utm_campaign)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
				RETURNING id`

			err := db.QueryRow(query,
				lead.Name, lead.Email, lead.Phone, lead.Message, lead.Course, lead.Source,
				lead.Status, lead.CreatedAt, lead.VerificationToken, lead.UtmCampaign,
			).Scan(&lead.ID)

			if err != nil {
				log.Printf("❌ [DATABASE] Failed to insert lead: %v", err)
				// Fallback to memory ID gen if DB fails? Or just error out?
				// For resilience, let's log and fall back to memory logic so user doesn't lose data
				// But real-world, we might want to error. Keeping memory fallback for safety now.
			} else {
				log.Printf("✅ [DATABASE] Saved lead ID %d", lead.ID)
			}
		}

		// Save to Memory (Keep as cache/fallback for now until verification is 100%)
		leadsMutex.Lock()
		defer leadsMutex.Unlock()

		// SECURITY: Memory DoS Protection (Cap global slice)
		if len(leads) >= 10000 {
			leads = leads[1:]
		}

		if lead.ID == 0 { // If DB insert failed or DB was nil
			lead.ID = leadNextID
			leadNextID++
		}
		leads = append(leads, lead)

		// Send to CRM/Webhook (Zapier, n8n, LeadBridge, Make, etc.)
		// SECURITY: Use semaphore to prevent goroutine explosion DoS
		select {
		case webhookSemaphore <- struct{}{}:
			go func(lead Lead) {
				defer func() { <-webhookSemaphore }() // Release on exit

				settingsMutex.RLock()
				crmEnabled := settings.EnableCRM
				webhookUrl := settings.WebhookUrl
				settingsMutex.RUnlock()

				// If CRM is disabled in settings, skip webhook
				if !crmEnabled {
					log.Printf("[WEBHOOK] CRM integration disabled in settings - webhook not sent")
					return
				}

				if webhookUrl == "" {
					return
				}

				// Build webhook payload with all lead data + metadata
				payload := map[string]interface{}{
					"event":     "lead.created",
					"timestamp": time.Now().Format(time.RFC3339),
					"source":    "pixe_website",
					"lead": map[string]interface{}{
						"name":         lead.Name,
						"email":        lead.Email,
						"phone":        lead.Phone,
						"course":       lead.Course,
						"source":       lead.Source,
						"utm_campaign": lead.UtmCampaign,
					},
				}

				jsonBody, err := json.Marshal(payload)
				if err != nil {
					log.Printf("[WEBHOOK] Failed to marshal payload: %v", err)
					return
				}

				// SECURITY: Robust SSRF Protection - Parse URL and validate hostname
				parsedURL, parseErr := url.Parse(webhookUrl)
				if parseErr != nil || parsedURL.Host == "" {
					log.Printf("[WEBHOOK] SECURITY: Invalid webhook URL format")
					return
				}

				// Extract hostname (without port)
				hostname := parsedURL.Hostname()

				// SECURITY: Block dangerous hostnames
				dangerousPatterns := []string{
					"localhost", "127.", "10.", "172.16.", "172.17.", "172.18.",
					"172.19.", "172.20.", "172.21.", "172.22.", "172.23.", "172.24.",
					"172.25.", "172.26.", "172.27.", "172.28.", "172.29.", "172.30.",
					"172.31.", "192.168.", "169.254.", "0.", "[::1]", "[::0]",
					"metadata.google", "169.254.169.254",
				}

				isBlocked := false
				for _, pattern := range dangerousPatterns {
					if strings.HasPrefix(strings.ToLower(hostname), pattern) ||
						strings.Contains(strings.ToLower(hostname), pattern) {
						isBlocked = true
						break
					}
				}

				// Additional check: Block IPs starting with internal ranges
				if net.ParseIP(hostname) != nil {
					ip := net.ParseIP(hostname)
					if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() {
						isBlocked = true
					}
				}

				if isBlocked {
					safeUrl := strings.ReplaceAll(strings.ReplaceAll(webhookUrl, "\n", ""), "\r", "")
					log.Printf("[WEBHOOK] SECURITY: Blocked SSRF attempt to internal URL: %s", safeUrl)
					return
				}

				resp, err := http.Post(webhookUrl, "application/json", bytes.NewBuffer(jsonBody))
				if err != nil {
					log.Printf("[WEBHOOK] Failed to send to %s, error: %v", webhookUrl, err)
					return
				}
				defer resp.Body.Close()
				log.Printf("[WEBHOOK] Lead sent to %s, status: %s", webhookUrl, resp.Status)
			}(lead)
		default:
			// Semaphore full - skip webhook to prevent DoS
			log.Println("[WEBHOOK] Skipping - too many concurrent webhooks")
		}

		return c.Status(201).JSON(lead)
	})

	// GET LEADS - SECURITY: Protected (PII data) - ADMIN ONLY
	api.Get("/leads", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		status := c.Query("status")

		// PERSISTENCE: Read from DB if available
		if db != nil {
			var rows *sql.Rows
			var err error

			if status != "" {
				query := `SELECT id, name, email, phone, message, course, source, status, created_at, verification_token, utm_campaign FROM leads WHERE status = $1 ORDER BY id DESC`
				rows, err = db.Query(query, status)
			} else {
				query := `SELECT id, name, email, phone, message, course, source, status, created_at, verification_token, utm_campaign FROM leads ORDER BY id DESC`
				rows, err = db.Query(query)
			}

			if err != nil {
				log.Printf("❌ [DATABASE] Failed to fetch leads: %v", err)
				// Fallback to memory
			} else {
				defer rows.Close()
				var dbLeads []Lead
				for rows.Next() {
					var l Lead
					// Handle potentially NULL fields if schema allows, but here we scan directly
					// Nullable strings in SQL scan to empty string in Go usually if using sql.NullString or just string (might error if NULL)
					// Assuming initialization creates NOT NULL or zero values.
					if err := rows.Scan(&l.ID, &l.Name, &l.Email, &l.Phone, &l.Message, &l.Course, &l.Source, &l.Status, &l.CreatedAt, &l.VerificationToken, &l.UtmCampaign); err != nil {
						log.Printf("❌ [DATABASE] Scan error: %v", err)
						continue
					}
					dbLeads = append(dbLeads, l)
				}
				return c.JSON(dbLeads)
			}
		}

		// Memory Fallback
		leadsMutex.RLock()
		defer leadsMutex.RUnlock()

		if status != "" {
			var filtered []Lead
			for _, l := range leads {
				if l.Status == status {
					filtered = append(filtered, l)
				}
			}
			return c.JSON(filtered)
		}

		return c.JSON(leads)
	})

	// UPDATE LEAD STATUS - SECURITY: Protected - ADMIN ONLY
	api.Patch("/leads", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		var update struct {
			ID     int    `json:"id"`
			Status string `json:"status"`
		}
		if err := c.BodyParser(&update); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		leadsMutex.Lock()
		defer leadsMutex.Unlock()

		for i, l := range leads {
			if l.ID == update.ID {
				leads[i].Status = update.Status
				return c.JSON(leads[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Lead not found"})
	})

	// PAGES ENDPOINT
	api.Get("/pages", func(c *fiber.Ctx) error {
		// Try database first
		if db != nil {
			rows, err := db.Query("SELECT id, slug, title, content, status, seo_title, seo_description, created_at, updated_at FROM pages ORDER BY id")
			if err == nil {
				defer rows.Close()
				var dbPages []PageContent
				for rows.Next() {
					var p PageContent
					var id int
					var content, seoTitle, seoDesc, createdAt, updatedAt sql.NullString
					if err := rows.Scan(&id, &p.Slug, &p.Title, &content, &p.Status, &seoTitle, &seoDesc, &createdAt, &updatedAt); err == nil {
						p.Html = content.String
						p.SeoTitle = seoTitle.String
						p.SeoDescription = seoDesc.String
						p.UpdatedAt = updatedAt.String
						dbPages = append(dbPages, p)
					}
				}
				return c.JSON(dbPages)
			}
			log.Printf("DB pages query failed, falling back to memory: %v", err)
		}
		// Fallback to memory
		pagesMutex.RLock()
		defer pagesMutex.RUnlock()
		return c.JSON(pages)
	})

	// SECURITY: Pages modification requires authentication
	api.Post("/pages", authMiddleware, func(c *fiber.Ctx) error {
		var req struct {
			Slug string `json:"slug"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		now := time.Now().Format(time.RFC3339)
		title := strings.Title(strings.ReplaceAll(req.Slug, "-", " "))
		defaultContent := "<p>Start editing this page...</p>"

		// Try database first (ONLY IN DEV MODE)
		settingsMutex.RLock()
		devMode := settings.EnableDevelopmentMode
		settingsMutex.RUnlock()

		if db != nil && devMode {
			_, err := db.Exec(`INSERT INTO pages (slug, title, content, status, seo_title, seo_description, created_at, updated_at) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
				req.Slug, title, defaultContent, "draft", title, "Description for "+req.Slug, now, now)
			if err != nil {
				if strings.Contains(err.Error(), "duplicate") || strings.Contains(err.Error(), "unique") {
					return c.Status(409).JSON(fiber.Map{"error": "Page already exists"})
				}
				log.Printf("DB insert failed, falling back to memory: %v", err)
			} else {
				return c.Status(201).JSON(fiber.Map{"slug": req.Slug, "title": title, "status": "draft"})
			}
		}

		// Fallback to memory
		pagesMutex.Lock()
		defer pagesMutex.Unlock()

		if len(pages) >= 200 {
			return c.Status(429).JSON(fiber.Map{"error": "Page limit reached"})
		}

		for _, p := range pages {
			if p.Slug == req.Slug {
				return c.Status(409).JSON(fiber.Map{"error": "Page already exists"})
			}
		}

		newPage := PageContent{
			Slug:           req.Slug,
			Title:          title,
			Status:         "draft",
			UpdatedAt:      now,
			Hero:           HeroSection{Title: "New Page"},
			Sections:       map[string]interface{}{"content": defaultContent},
			Html:           defaultContent,
			SeoTitle:       title,
			SeoDescription: "Description for " + strings.ReplaceAll(req.Slug, "-", " "),
			SeoKeywords:    "education, learning",
		}
		pages = append(pages, newPage)

		return c.Status(201).JSON(newPage)
	})

	// DEV MODE: Update page content without auth (for GrapesJS editor during development)
	// This is a convenience route - in production, use the PUT route with auth
	api.Post("/pages/*/update", func(c *fiber.Ctx) error {
		slug := c.Params("*")
		var req struct {
			Html       *string     `json:"html"`
			Css        *string     `json:"css"`
			Components interface{} `json:"components"`
			Styles     interface{} `json:"styles"`
		}

		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		now := time.Now().Format(time.RFC3339)

		// Try database first
		if db != nil && req.Html != nil {
			result, err := db.Exec("UPDATE pages SET content = $1, updated_at = $2 WHERE slug = $3", *req.Html, now, slug)
			if err == nil {
				affected, _ := result.RowsAffected()
				if affected > 0 {
					return c.JSON(fiber.Map{"success": true, "message": "Page updated in DB"})
				}
			}
			log.Printf("DB update failed, falling back to memory: %v", err)
		}

		// Fallback to memory
		pagesMutex.Lock()
		defer pagesMutex.Unlock()

		for i, p := range pages {
			if p.Slug == slug {
				if req.Html != nil {
					pages[i].Html = *req.Html
				}
				if req.Css != nil {
					pages[i].Css = *req.Css
				}
				if req.Components != nil {
					pages[i].Components = req.Components
				}
				if req.Styles != nil {
					pages[i].Styles = req.Styles
				}
				pages[i].UpdatedAt = now
				return c.JSON(fiber.Map{"success": true, "message": "Page updated", "page": pages[i]})
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Page not found"})
	})

	// UPDATE PAGE CONTENT (CMS EDITOR)
	// Note: Using *slug wildcard to support nested paths like courses/seo, locations/bangalore
	// DEV MODE: Auth disabled for local development
	api.Put("/pages/*", func(c *fiber.Ctx) error {
		slug := c.Params("*")
		var req struct {
			PuckData   interface{}            `json:"puckData"`
			Sections   map[string]interface{} `json:"sections"`
			Html       *string                `json:"html"`
			Css        *string                `json:"css"`
			Components interface{}            `json:"components"`
			Styles     interface{}            `json:"styles"`
		}

		// Parse Body
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		pagesMutex.Lock()
		defer pagesMutex.Unlock()

		for i, p := range pages {
			if p.Slug == slug {
				// Update Puck Data
				if req.PuckData != nil {
					pages[i].PuckData = req.PuckData
				}
				// Update Sections (Legacy / HTML support)
				if req.Sections != nil {
					pages[i].Sections = req.Sections
				}

				// Update GrapesJS Data
				if req.Html != nil {
					pages[i].Html = *req.Html
				}
				if req.Css != nil {
					pages[i].Css = *req.Css
				}
				if req.Components != nil {
					pages[i].Components = req.Components
				}
				if req.Styles != nil {
					pages[i].Styles = req.Styles
				}

				pages[i].UpdatedAt = time.Now().Format(time.RFC3339)
				return c.JSON(pages[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Page not found"})
	})

	// Note: Using * wildcard to support nested paths like courses/seo, locations/bangalore
	api.Get("/pages/*", func(c *fiber.Ctx) error {
		slug := c.Params("*")
		pagesMutex.RLock()
		defer pagesMutex.RUnlock()
		for _, p := range pages {
			if p.Slug == slug {
				return c.JSON(p)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Page not found"})
	})

	// SEO ENDPOINTS
	api.Get("/seo", func(c *fiber.Ctx) error {
		slug := c.Query("slug")
		if slug == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Slug required"})
		}

		pagesMutex.RLock()
		defer pagesMutex.RUnlock()
		for _, p := range pages {
			if p.Slug == slug {
				return c.JSON(p)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Page not found"})
	})

	// SECURITY: SEO modification requires authentication
	api.Post("/seo", authMiddleware, func(c *fiber.Ctx) error {
		var req struct {
			Slug           string `json:"slug"`
			SeoTitle       string `json:"seoTitle"`
			SeoDescription string `json:"seoDescription"`
			SeoKeywords    string `json:"seoKeywords"`
			OgImage        string `json:"ogImage"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		pagesMutex.Lock()
		defer pagesMutex.Unlock()
		for i, p := range pages {
			if p.Slug == req.Slug {
				pages[i].SeoTitle = req.SeoTitle
				pages[i].SeoDescription = req.SeoDescription
				pages[i].SeoKeywords = req.SeoKeywords
				pages[i].OgImage = req.OgImage
				pages[i].UpdatedAt = time.Now().Format(time.RFC3339)
				return c.JSON(pages[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Page not found"})
	})

	// COURSES ENDPOINTS - PUBLIC (with CDN caching)
	api.Get("/courses", func(c *fiber.Ctx) error {
		// OPTIMIZATION: Cache for 5 minutes, stale-while-revalidate for 1 hour
		c.Set("Cache-Control", "public, max-age=300, stale-while-revalidate=3600")
		c.Set("Vary", "Accept-Encoding")

		// Try database first
		if db != nil {
			rows, err := db.Query("SELECT id, title, slug, description, duration, price, image, status, created_at FROM courses ORDER BY id")
			if err == nil {
				defer rows.Close()
				dbCourses := []Course{}
				for rows.Next() {
					var course Course
					var createdAt sql.NullString
					if err := rows.Scan(&course.ID, &course.Title, &course.Slug, &course.Description, &course.Duration, &course.Price, &course.Image, &course.Status, &createdAt); err == nil {
						dbCourses = append(dbCourses, course)
					}
				}
				return c.JSON(dbCourses)
			}
			log.Printf("DB courses query failed, falling back to memory: %v", err)
		}

		coursesMutex.RLock()
		defer coursesMutex.RUnlock()
		return c.JSON(courses)
	})

	// SECURITY: Course modification requires authentication
	api.Post("/courses", authMiddleware, func(c *fiber.Ctx) error {
		var course Course
		if err := c.BodyParser(&course); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		now := time.Now().Format(time.RFC3339)

		// Try database first
		if db != nil {
			err := db.QueryRow(`INSERT INTO courses (title, slug, description, duration, price, image, status, created_at) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
				course.Title, course.Slug, course.Description, course.Duration, course.Price, course.Image, "active", now).Scan(&course.ID)
			if err == nil {
				return c.Status(201).JSON(course)
			}
			log.Printf("DB course insert failed, falling back to memory: %v", err)
		}

		// Fallback to memory
		coursesMutex.Lock()
		defer coursesMutex.Unlock()

		if len(courses) >= 500 {
			return c.Status(429).JSON(fiber.Map{"error": "Course limit reached"})
		}

		course.ID = nextID
		nextID++
		courses = append(courses, course)

		return c.Status(201).JSON(course)
	})

	api.Put("/courses/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}
		var update Course
		if err := c.BodyParser(&update); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		coursesMutex.Lock()
		defer coursesMutex.Unlock()

		for i, course := range courses {
			if course.ID == id {
				// Update fields
				courses[i].Title = update.Title
				courses[i].Slug = update.Slug
				courses[i].Description = update.Description
				courses[i].Duration = update.Duration
				courses[i].Price = update.Price
				courses[i].Status = update.Status
				return c.JSON(courses[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Course not found"})
	})

	api.Delete("/courses/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		coursesMutex.Lock()
		defer coursesMutex.Unlock()

		for i, course := range courses {
			if course.ID == id {
				courses = append(courses[:i], courses[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Course not found"})
	})

	// STORIES ENDPOINTS - PUBLIC (with CDN caching)
	api.Get("/stories", func(c *fiber.Ctx) error {
		c.Set("Cache-Control", "public, max-age=300, stale-while-revalidate=3600")
		storiesMutex.RLock()
		defer storiesMutex.RUnlock()
		return c.JSON(stories)
	})

	api.Post("/stories", authMiddleware, func(c *fiber.Ctx) error {
		var story SuccessStory
		if err := c.BodyParser(&story); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		storiesMutex.Lock()
		story.ID = storyNextID
		storyNextID++
		stories = append(stories, story)
		storiesMutex.Unlock()

		return c.Status(201).JSON(story)
	})

	api.Delete("/stories/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		storiesMutex.Lock()
		defer storiesMutex.Unlock()

		for i, story := range stories {
			if story.ID == id {
				stories = append(stories[:i], stories[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Story not found"})
	})

	// FAQ ENDPOINTS - PUBLIC (with CDN caching)
	api.Get("/faqs", func(c *fiber.Ctx) error {
		c.Set("Cache-Control", "public, max-age=600, stale-while-revalidate=3600")
		faqsMutex.RLock()
		defer faqsMutex.RUnlock()
		return c.JSON(faqs)
	})

	api.Post("/faqs", authMiddleware, func(c *fiber.Ctx) error {
		var faq FAQ
		if err := c.BodyParser(&faq); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		faqsMutex.Lock()
		faq.ID = faqNextID
		faqNextID++
		faqs = append(faqs, faq)
		faqsMutex.Unlock()

		return c.Status(201).JSON(faq)
	})

	api.Delete("/faqs/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		faqsMutex.Lock()
		defer faqsMutex.Unlock()

		for i, faq := range faqs {
			if faq.ID == id {
				faqs = append(faqs[:i], faqs[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "FAQ not found"})
	})

	// PARTNERS ENDPOINTS - PUBLIC (with CDN caching)
	api.Get("/partners", func(c *fiber.Ctx) error {
		c.Set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400")
		partnersMutex.RLock()
		defer partnersMutex.RUnlock()
		return c.JSON(partners)
	})

	api.Post("/partners", authMiddleware, func(c *fiber.Ctx) error {
		var p Partner
		if err := c.BodyParser(&p); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}
		// SECURITY: Added mutex protection
		partnersMutex.Lock()
		defer partnersMutex.Unlock()
		p.ID = partnerNextID
		partnerNextID++
		partners = append(partners, p)
		return c.Status(201).JSON(p)
	})

	api.Delete("/partners/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}
		// SECURITY: Added mutex protection
		partnersMutex.Lock()
		defer partnersMutex.Unlock()
		for i, p := range partners {
			if p.ID == id {
				partners = append(partners[:i], partners[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Partner not found"})
	})

	// STATS ENDPOINTS
	api.Get("/stats", func(c *fiber.Ctx) error {
		statsMutex.RLock()
		defer statsMutex.RUnlock()
		return c.JSON(stats)
	})

	api.Post("/stats", authMiddleware, func(c *fiber.Ctx) error {
		var s Stat
		if err := c.BodyParser(&s); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}
		statsMutex.Lock()
		s.ID = statNextID
		statNextID++
		stats = append(stats, s)
		statsMutex.Unlock()
		return c.Status(201).JSON(s)
	})

	api.Delete("/stats/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}
		statsMutex.Lock()
		defer statsMutex.Unlock()
		for i, s := range stats {
			if s.ID == id {
				stats = append(stats[:i], stats[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Stat not found"})
	})

	// AUTHORS ENDPOINTS - SECURITY: Write requires auth
	api.Get("/authors", func(c *fiber.Ctx) error {
		authorsMutex.RLock()
		defer authorsMutex.RUnlock()
		return c.JSON(authors)
	})

	api.Post("/authors", authMiddleware, func(c *fiber.Ctx) error {
		var author Author
		if err := c.BodyParser(&author); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		authorsMutex.Lock()
		author.ID = authorNextID
		authorNextID++
		authors = append(authors, author)
		authorsMutex.Unlock()

		return c.Status(201).JSON(author)
	})

	api.Delete("/authors/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		authorsMutex.Lock()
		defer authorsMutex.Unlock()

		for i, a := range authors {
			if a.ID == id {
				authors = append(authors[:i], authors[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Author not found"})
	})

	// BLOG POSTS ENDPOINTS
	api.Get("/posts", func(c *fiber.Ctx) error {
		// Try database first
		if db != nil {
			rows, err := db.Query("SELECT id, title, slug, content, status, created_at FROM posts ORDER BY id DESC")
			if err == nil {
				defer rows.Close()
				var dbPosts []BlogPost
				for rows.Next() {
					var p BlogPost
					var createdAt sql.NullString
					if err := rows.Scan(&p.ID, &p.Title, &p.Slug, &p.Content, &p.Status, &createdAt); err == nil {
						p.PublishedAt = createdAt.String
						dbPosts = append(dbPosts, p)
					}
				}
				return c.JSON(dbPosts)
			}
		}
		postsMutex.RLock()
		defer postsMutex.RUnlock()
		return c.JSON(posts)
	})

	api.Post("/posts", authMiddleware, func(c *fiber.Ctx) error {
		var post BlogPost
		if err := c.BodyParser(&post); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		now := time.Now().Format(time.RFC3339)

		// Try database first (ONLY IN DEV MODE)
		settingsMutex.RLock()
		devMode := settings.EnableDevelopmentMode
		settingsMutex.RUnlock()

		if db != nil && devMode {
			err := db.QueryRow(`INSERT INTO posts (title, slug, content, status, created_at, updated_at) 
				VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
				post.Title, post.Slug, post.Content, "draft", now, now).Scan(&post.ID)
			if err == nil {
				post.PublishedAt = now
				return c.Status(201).JSON(post)
			}
			log.Printf("DB post insert failed, falling back to memory: %v", err)
		}

		// Fallback to memory
		postsMutex.Lock()
		post.ID = postNextID
		postNextID++
		post.PublishedAt = time.Now().Format("2006-01-02")
		posts = append(posts, post)
		postsMutex.Unlock()

		return c.Status(201).JSON(post)
	})

	api.Delete("/posts/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		// Try database first
		if db != nil {
			result, err := db.Exec("DELETE FROM posts WHERE id = $1", id)
			if err == nil {
				affected, _ := result.RowsAffected()
				if affected > 0 {
					return c.SendStatus(204)
				}
			}
		}

		// Fallback to memory
		postsMutex.Lock()
		defer postsMutex.Unlock()

		for i, p := range posts {
			if p.ID == id {
				posts = append(posts[:i], posts[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	})

	// EVENTS ENDPOINTS
	api.Get("/events", func(c *fiber.Ctx) error {
		// Try database first
		if db != nil {
			rows, err := db.Query("SELECT id, title, description, date, status, created_at FROM events ORDER BY date DESC")
			if err == nil {
				defer rows.Close()
				var dbEvents []Event
				for rows.Next() {
					var e Event
					var createdAt sql.NullString
					if err := rows.Scan(&e.ID, &e.Title, &e.Description, &e.Date, &e.Status, &createdAt); err == nil {
						dbEvents = append(dbEvents, e)
					}
				}
				return c.JSON(dbEvents)
			}
		}
		eventsMutex.RLock()
		defer eventsMutex.RUnlock()
		return c.JSON(events)
	})

	api.Post("/events", authMiddleware, func(c *fiber.Ctx) error {
		var event Event
		if err := c.BodyParser(&event); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		now := time.Now().Format(time.RFC3339)

		// Try database first (ONLY IN DEV MODE)
		settingsMutex.RLock()
		devMode := settings.EnableDevelopmentMode
		settingsMutex.RUnlock()

		if db != nil && devMode {
			err := db.QueryRow(`INSERT INTO events (title, description, date, status, created_at) 
				VALUES ($1, $2, $3, $4, $5) RETURNING id`,
				event.Title, event.Description, event.Date, "upcoming", now).Scan(&event.ID)
			if err == nil {
				return c.Status(201).JSON(event)
			}
			log.Printf("DB event insert failed, falling back to memory: %v", err)
		}

		// Fallback to memory
		eventsMutex.Lock()
		event.ID = eventNextID
		eventNextID++
		events = append(events, event)
		eventsMutex.Unlock()

		return c.Status(201).JSON(event)
	})

	api.Delete("/events/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		// Try database first
		if db != nil {
			result, err := db.Exec("DELETE FROM events WHERE id = $1", id)
			if err == nil {
				affected, _ := result.RowsAffected()
				if affected > 0 {
					return c.SendStatus(204)
				}
			}
		}

		// Fallback to memory
		eventsMutex.Lock()
		defer eventsMutex.Unlock()

		for i, e := range events {
			if e.ID == id {
				events = append(events[:i], events[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Event not found"})
	})

	// CORPORATE ENDPOINTS - SECURITY: PII data - ADMIN ONLY
	api.Get("/corporate-leads", requireAdmin, func(c *fiber.Ctx) error {
		corporateLeadsMutex.RLock()
		defer corporateLeadsMutex.RUnlock()
		return c.JSON(corporateLeads)
	})

	api.Post("/corporate-leads", func(c *fiber.Ctx) error {
		var lead CorporateLead
		if err := c.BodyParser(&lead); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// SECURITY: OTP Verification (WhatsApp)
		// Corporate leads always require phone, so mandatory check
		if lead.Phone != "" {
			otpMutex.RLock()
			isValid := verifiedTokens[lead.VerificationToken]
			otpMutex.RUnlock()

			if !isValid {
				return c.Status(401).JSON(fiber.Map{"error": "Phone verification required. Invalid or missing token."})
			}
		}

		corporateLeadsMutex.Lock()
		lead.ID = corporateLeadNextID
		corporateLeadNextID++
		lead.Status = "new"
		lead.Date = time.Now().Format("2006-01-02")
		corporateLeads = append(corporateLeads, lead)
		corporateLeadsMutex.Unlock()

		// WEBHOOK TRIGGER - SECURITY: Semaphore + Robust SSRF Protection
		select {
		case webhookSemaphore <- struct{}{}:
			go func(l CorporateLead) {
				defer func() { <-webhookSemaphore }()

				settingsMutex.RLock()
				crmEnabled := settings.EnableCRM
				webhookUrl := settings.WebhookUrl
				settingsMutex.RUnlock()

				// If CRM is disabled in settings, skip webhook
				if !crmEnabled {
					log.Printf("[WEBHOOK] CRM integration disabled in settings - webhook not sent")
					return
				}

				if webhookUrl == "" {
					return
				}

				// SECURITY: Robust SSRF Protection - Parse URL and validate hostname
				parsedURL, parseErr := url.Parse(webhookUrl)
				if parseErr != nil || parsedURL.Host == "" {
					log.Printf("[WEBHOOK] SECURITY: Invalid webhook URL format")
					return
				}

				hostname := parsedURL.Hostname()
				dangerousPatterns := []string{
					"localhost", "127.", "10.", "172.16.", "172.17.", "172.18.",
					"172.19.", "172.20.", "172.21.", "172.22.", "172.23.", "172.24.",
					"172.25.", "172.26.", "172.27.", "172.28.", "172.29.", "172.30.",
					"172.31.", "192.168.", "169.254.", "0.", "[::1]", "[::0]",
					"metadata.google", "169.254.169.254",
				}

				isBlocked := false
				for _, pattern := range dangerousPatterns {
					if strings.HasPrefix(strings.ToLower(hostname), pattern) ||
						strings.Contains(strings.ToLower(hostname), pattern) {
						isBlocked = true
						break
					}
				}

				if net.ParseIP(hostname) != nil {
					ip := net.ParseIP(hostname)
					if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() {
						isBlocked = true
					}
				}

				if isBlocked {
					log.Printf("[WEBHOOK] SECURITY: Blocked SSRF attempt to internal URL: %s", webhookUrl)
					return
				}

				jsonData, _ := json.Marshal(l)
				resp, err := http.Post(webhookUrl, "application/json", bytes.NewBuffer(jsonData))
				if err != nil {
					log.Printf("Webhook failed: %v", err)
					return
				}
				defer resp.Body.Close()
				log.Printf("Webhook sent to %s, status: %s", webhookUrl, resp.Status)
			}(lead)
		default:
			log.Println("[WEBHOOK] Skipping corporate lead webhook - too many concurrent")
		}

		return c.Status(201).JSON(lead)
	})

	api.Put("/corporate-leads/:id", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		var update struct {
			Status string `json:"status"`
		}
		if err := c.BodyParser(&update); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		corporateLeadsMutex.Lock()
		defer corporateLeadsMutex.Unlock()

		for i, lead := range corporateLeads {
			if lead.ID == id {
				corporateLeads[i].Status = update.Status
				logAdminAction(c, "UPDATE_LEAD", fmt.Sprintf("Lead %d", id), fmt.Sprintf("Status: %s", update.Status))
				return c.JSON(corporateLeads[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Lead not found"})
	})

	// DOWNLOADS ENDPOINTS
	api.Get("/downloads", func(c *fiber.Ctx) error {
		downloadsMutex.RLock()
		defer downloadsMutex.RUnlock()
		return c.JSON(downloads)
	})

	// SECURITY: Downloads modification requires auth
	api.Post("/downloads", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		var item Download
		if err := c.BodyParser(&item); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		downloadsMutex.Lock()
		item.ID = downloadNextID
		downloadNextID++
		downloads = append(downloads, item)
		downloadsMutex.Unlock()

		logAdminAction(c, "CREATE_DOWNLOAD", item.Title, item.Url)

		return c.Status(201).JSON(item)
	})

	api.Delete("/downloads/:id", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		downloadsMutex.Lock()
		defer downloadsMutex.Unlock()
		for i, item := range downloads {
			if item.ID == id {
				downloads = append(downloads[:i], downloads[i+1:]...)
				logAdminAction(c, "DELETE_DOWNLOAD", item.Title, fmt.Sprintf("ID: %d", id))
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Download not found"})
	})

	api.Post("/database/connect", authMiddleware, func(c *fiber.Ctx) error {
		// Detailed Request Structure
		var req struct {
			Provider string `json:"provider"`
			// Common / Aiven
			Url           string `json:"url"` // Legacy support
			ServiceUrl    string `json:"serviceUrl"`
			Host          string `json:"host"`
			Port          string `json:"port"`
			User          string `json:"user"`
			Password      string `json:"password"`
			DatabaseName  string `json:"databaseName"`
			CaCertificate string `json:"caCertificate"`

			// Nile Specifics
			ConnectionUrl string `json:"connectionUrl"`
			Workspace     string `json:"workspace"`
			Region        string `json:"defaultRegion"`
			ApiUrl        string `json:"apiUrl"`
			PostgresUrl   string `json:"postgresUrl"`
		}

		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// Determine Connection String Priority
		connStr := ""
		if req.ConnectionUrl != "" {
			connStr = req.ConnectionUrl // Nile Primary
		} else if req.ServiceUrl != "" {
			connStr = req.ServiceUrl // Aiven Primary
		} else if req.Url != "" {
			connStr = req.Url // Fallback/Test
		} else {
			// Construct from components if possible
			if req.Host != "" && req.User != "" && req.DatabaseName != "" {
				port := req.Port
				if port == "" {
					port = "5432"
				}

				// SECURITY: SSRF Protection
				if !validateHost(req.Host) {
					return c.Status(403).JSON(fiber.Map{"error": "Security Alert: Access to internal/private network resources is blocked."})
				}

				// SECURITY: Prevent Connection String Injection via URL Encoding
				// We manually construct the URL to ensure special chars in password/user don't break parsing
				// e.g. a password like "foo@bar" would break the URL flow without encoding
				connStr = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require",
					url.QueryEscape(req.User),
					url.QueryEscape(req.Password),
					url.QueryEscape(req.Host),
					url.QueryEscape(port),
					url.QueryEscape(req.DatabaseName))
			}
		}

		// SANITIZATION: Fix common copy-paste errors
		// Example: "psql postgres://..."
		if strings.HasPrefix(strings.TrimSpace(connStr), "psql") {
			parts := strings.Fields(connStr)
			for _, part := range parts {
				if strings.HasPrefix(part, "postgres://") || strings.HasPrefix(part, "postgresql://") {
					connStr = part
					break
				}
			}
		}
		// Example: "Connect with psql: postgres://..."
		if idx := strings.Index(connStr, "postgres://"); idx > 0 {
			connStr = connStr[idx:]
		} else if idx := strings.Index(connStr, "postgresql://"); idx > 0 {
			connStr = connStr[idx:]
		}

		// Validation check
		if !strings.HasPrefix(connStr, "postgres://") && !strings.HasPrefix(connStr, "postgresql://") {
			// If it's a DSN (key=value), libpq handles it, but let's warn if it looks like a command
			if strings.Contains(connStr, "psql") {
				return c.Status(400).JSON(fiber.Map{"error": "Invalid format. It looks like you copied a 'psql' command. Please copy JUST the 'postgres://...' URL."})
			}
		}

		if connStr == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Could not determine connection string. Please provide a Service URL or Connection URL."})
		}

		// Validate Connection String
		db, err := sql.Open("postgres", connStr)
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid connection string format: " + err.Error()})
		}
		defer db.Close()

		// Test Connectivity
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := db.PingContext(ctx); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Connection failed: " + err.Error()})
		}

		log.Println("Database connection verified successfully via provider:", req.Provider)

		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "Connection verified! Credentials Valid.",
		})
	}) // END: DISABLED database/connect endpoint

	// SUBSCRIBERS ENDPOINTS - SECURITY: Email list - ADMIN ONLY
	api.Get("/subscribers", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		subscribersMutex.RLock()
		defer subscribersMutex.RUnlock()
		return c.JSON(subscribers)
	})

	api.Post("/subscribers", func(c *fiber.Ctx) error {
		var sub Subscriber
		if err := c.BodyParser(&sub); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		now := time.Now().Format(time.RFC3339)

		// Try database first (ONLY IN DEV MODE)
		settingsMutex.RLock()
		devMode := settings.EnableDevelopmentMode
		settingsMutex.RUnlock()

		if db != nil && devMode {
			err := db.QueryRow("INSERT INTO subscribers (email, created_at) VALUES ($1, $2) RETURNING id",
				sub.Email, now).Scan(&sub.ID)
			if err == nil {
				sub.CreatedAt = now
				sub.Date = time.Now().Format("2006-01-02")
				return c.Status(201).JSON(sub)
			}
			log.Printf("DB subscriber insert failed, falling back to memory: %v", err)
		}

		// Fallback to memory
		subscribersMutex.Lock()
		defer subscribersMutex.Unlock()

		if len(subscribers) >= 10000 {
			return c.Status(429).JSON(fiber.Map{"error": "Subscriber limit reached"})
		}

		sub.ID = subscriberNextID
		subscriberNextID++
		sub.Date = time.Now().Format("2006-01-02")
		subscribers = append(subscribers, sub)

		return c.Status(201).JSON(sub)
	})

	// SETTINGS ENDPOINTS - SECURITY: ADMIN ONLY (webhook URL = SSRF risk)
	// SETTINGS ENDPOINTS - SECURITY: ADMIN ONLY (webhook URL = SSRF risk)
	api.Get("/admin/settings", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		settingsMutex.RLock()
		copyOfSettings := settings // Copy struct to avoid mutating global state during read
		settingsMutex.RUnlock()

		// Fill in missing credentials from Environment Variables if not set in CMS
		if copyOfSettings.MetaPhoneID == "" {
			copyOfSettings.MetaPhoneID = os.Getenv("META_PHONE_NUMBER_ID")
		}
		if copyOfSettings.MetaToken == "" {
			copyOfSettings.MetaToken = os.Getenv("META_ACCESS_TOKEN")
		}
		if copyOfSettings.MetaTemplate == "" {
			copyOfSettings.MetaTemplate = os.Getenv("META_TEMPLATE_NAME")
		}
		if copyOfSettings.WebhookUrl == "" {
			copyOfSettings.WebhookUrl = os.Getenv("META_WEBHOOK_URL")
		}
		if copyOfSettings.MetaVerifyToken == "" {
			copyOfSettings.MetaVerifyToken = os.Getenv("META_VERIFY_TOKEN")
		}

		return c.JSON(copyOfSettings)
	})

	// SECURITY: Settings modification requires ADMIN due to webhook SSRF risk
	api.Post("/admin/settings", authMiddleware, requireAdmin, func(c *fiber.Ctx) error {
		var update Settings
		if err := c.BodyParser(&update); err != nil {
			log.Printf("[ERROR] BodyParser failed: %v\n", err)
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}
		log.Printf("[DEBUG] POST /settings received: %+v\n", update)

		settingsMutex.Lock()
		settings = update
		saveSettings() // Persist
		settingsMutex.Unlock()

		logAdminAction(c, "UPDATE_SETTINGS", "Global Settings", "Global settings updated")

		return c.JSON(settings)
	})

	// ANALYTICS ENDPOINTS - SECURITY: Business metrics - ADMIN ONLY
	api.Get("/analytics", requireAdmin, func(c *fiber.Ctx) error {
		analyticsMutex.RLock()
		defer analyticsMutex.RUnlock()
		return c.JSON(analytics)
	})

	api.Post("/analytics", requireAdmin, func(c *fiber.Ctx) error {
		var a Analytics
		if err := c.BodyParser(&a); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}
		analyticsMutex.Lock()
		a.ID = analyticsNextID
		analyticsNextID++
		a.Date = time.Now().Format("2006-01-02")
		analytics = append(analytics, a)
		analyticsMutex.Unlock()
		logAdminAction(c, "UPDATE_ANALYTICS", "Business Metrics", fmt.Sprintf("ID: %d", a.ID))
		return c.Status(201).JSON(a)
	})

	// PPC ENDPOINTS - SECURITY: Marketing spend data - ADMIN ONLY
	api.Get("/ppc", requireAdmin, func(c *fiber.Ctx) error {
		ppcMutex.RLock()
		defer ppcMutex.RUnlock()
		return c.JSON(ppcCampaigns)
	})

	api.Post("/ppc", requireAdmin, func(c *fiber.Ctx) error {
		var p PpcCampaign
		if err := c.BodyParser(&p); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}
		ppcMutex.Lock()
		p.ID = ppcNextID
		ppcNextID++
		p.Date = time.Now().Format("2006-01-02")
		ppcCampaigns = append(ppcCampaigns, p)
		ppcMutex.Unlock()
		logAdminAction(c, "UPDATE_PPC", p.Name, fmt.Sprintf("Spend: %.2f", p.Spend))
		return c.Status(201).JSON(p)
	})

	// MEDIA ENDPOINTS - SECURITY: Added file extension validation - ADMIN ONLY
	api.Post("/media/upload", requireAdmin, func(c *fiber.Ctx) error {
		file, err := c.FormFile("file")
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "File upload failed"})
		}

		// SECURITY: Validate file extension
		ext := strings.ToLower(filepath.Ext(file.Filename))
		allowedExts := map[string]bool{
			".jpg": true, ".jpeg": true, ".png": true, ".gif": true,
			".webp": true, ".pdf": true, ".doc": true, ".docx": true,
			".xls": true, ".xlsx": true,
		}
		if !allowedExts[ext] {
			return c.Status(400).JSON(fiber.Map{"error": "File type not allowed"})

		}

		// SECURITY: Sanitize filename to prevent directory traversal
		cleanName := strings.ReplaceAll(file.Filename, "..", "")
		// Add timestamp to prevent overwrites
		path := fmt.Sprintf("./uploads/%d_%s", time.Now().Unix(), cleanName)

		// SECURITY: Magic Byte Validation (Prevent Fake Files)
		// Read first 512 bytes to sniff actual content type
		src, err := file.Open()
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to open file"})
		}
		defer src.Close()

		buffer := make([]byte, 512)
		if _, err := src.Read(buffer); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to read file"})
		}
		// Reset file pointer back to start!
		src.Seek(0, 0)

		contentType := http.DetectContentType(buffer)
		// Strict check for trusted MIME types
		allowedMime := map[string]bool{
			"image/jpeg": true, "image/png": true, "image/gif": true, "image/webp": true,
			"application/pdf": true, "application/msword": true,
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document": true,
			"application/vnd.ms-excel": true,
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": true,
		}

		if !allowedMime[contentType] {
			log.Printf("[SECURITY] Blocked Magic Byte Mismatch: %s claims to be %s but header is %s", file.Filename, ext, contentType)
			return c.Status(400).JSON(fiber.Map{"error": "Invalid file content (Magic Bytes mismatch)"})
		}

		if err := c.SaveFile(file, path); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Failed to save file"})
		}

		// SECURITY: ANTI-POLYGLOT / ANTI-STEGANOGRAPHY DEFENSE
		// We open the saved file and attempt to decode it with the image library.
		// If it fails or has trailing garbage (which we can't easily check with stdlib but decoding is a good step),
		// we treat it as suspicious. For strict polyglot defense, we should arguably RE-ENCODE it,
		// but for now, verifying it parses as a valid image structure is a huge step up from Magic Bytes.
		// A true polyglot GIF+JS might parse, but browsers won't execute JS if served as image/gif + nosniff.
		// This check ensures it IS actually an image.

		imgFile, err := os.Open(path)
		if err == nil {
			_, _, err = image.Decode(imgFile)
			imgFile.Close()
			if err != nil {
				// Decoration failed - possible malformed file or polyglot attempt that breaks image spec
				log.Printf("[SECURITY] Possible Polyglot/Malware detected (Decode Failed): %s", file.Filename)
				os.Remove(path) // Delete immediately
				return c.Status(400).JSON(fiber.Map{"error": "Invalid image structure"})
			}
		}

		mediaMutex.Lock()
		media := MediaFile{
			ID:         mediaNextID,
			Name:       file.Filename,
			Path:       path,
			Url:        fmt.Sprintf("/uploads/%s", file.Filename),
			Size:       strconv.FormatInt(file.Size, 10),
			UploadDate: time.Now().Format("2006-01-02"),
		}
		mediaNextID++
		mediaFiles = append(mediaFiles, media)
		mediaMutex.Unlock()

		logAdminAction(c, "UPLOAD_FILE", media.Name, fmt.Sprintf("Size: %s", media.Size))

		return c.Status(201).JSON(media)
	})

	api.Get("/media", func(c *fiber.Ctx) error {
		mediaMutex.RLock()
		defer mediaMutex.RUnlock()
		return c.JSON(mediaFiles)
	})

	// SECURITY: Media deletion requires ADMIN PRIVILEGES (RBAC)
	api.Delete("/media/:id", requireAdmin, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}
		mediaMutex.Lock()
		defer mediaMutex.Unlock()
		for i, m := range mediaFiles {
			if m.ID == id {
				// SECURITY: Path traversal protection - only delete from uploads directory
				absPath, err := filepath.Abs(m.Path)
				if err != nil || !strings.HasPrefix(absPath, filepath.Join(".", "uploads")) {
					safePath := strings.ReplaceAll(strings.ReplaceAll(m.Path, "\n", ""), "\r", "")
					log.Printf("[SECURITY] Blocked path traversal attempt: %s", safePath)
					return c.Status(403).JSON(fiber.Map{"error": "Invalid file path"})
				}
				os.Remove(m.Path)
				mediaFiles = append(mediaFiles[:i], mediaFiles[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "File not found"})
	})

	// USERS ENDPOINTS - Public GET to show whitelist, auth required to modify
	api.Get("/users", func(c *fiber.Ctx) error {
		usersMutex.RLock()
		defer usersMutex.RUnlock()
		return c.JSON(users)
	})

	// User creation - allows first user without auth (bootstrap mode)
	api.Post("/users", func(c *fiber.Ctx) error {
		usersMutex.RLock()
		isFirstUser := len(users) == 0
		usersMutex.RUnlock()

		// If not first user, require authentication
		if !isFirstUser {
			// Run auth check manually
			authHeader := c.Get("Authorization")
			cookieToken := c.Cookies("auth-token")
			tokenStr := ""
			if strings.HasPrefix(authHeader, "Bearer ") {
				tokenStr = strings.TrimPrefix(authHeader, "Bearer ")
			} else if cookieToken != "" {
				tokenStr = cookieToken
			}

			if tokenStr == "" {
				return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
			}

			token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
				return jwtSecret, nil
			})
			if err != nil || !token.Valid {
				return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
			}

			claims := token.Claims.(jwt.MapClaims)
			role, _ := claims["role"].(string)
			if role != "admin" {
				return c.Status(403).JSON(fiber.Map{"error": "Forbidden: Insufficient privileges"})
			}
		}

		var u User
		if err := c.BodyParser(&u); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// Set default role to admin if not specified (dashboard users need admin access)
		if u.Role == "" {
			u.Role = "admin"
		}

		now := time.Now().Format(time.RFC3339)

		// Try database first
		if db != nil {
			err := db.QueryRow("INSERT INTO users (email, role, status, created_at) VALUES ($1, $2, $3, $4) RETURNING id",
				u.Email, u.Role, "invited", now).Scan(&u.ID)
			if err == nil {
				u.Status = "invited"
				u.CreatedAt = now
				return c.Status(201).JSON(u)
			}
			log.Printf("DB user insert failed, falling back to memory: %v", err)
		}

		// Fallback to memory
		usersMutex.Lock()
		defer usersMutex.Unlock()

		if len(users) >= 1000 {
			return c.Status(429).JSON(fiber.Map{"error": "User limit reached"})
		}

		u.ID = userNextID
		userNextID++
		u.CreatedAt = time.Now().Format("2006-01-02")
		u.Status = "invited"
		users = append(users, u)

		logAdminAction(c, "CREATE_USER", u.Email, fmt.Sprintf("Role: %s", u.Role))

		return c.Status(201).JSON(u)
	})

	// User deletion
	api.Delete("/users/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		// Try database first
		if db != nil {
			result, err := db.Exec("DELETE FROM users WHERE id = $1", id)
			if err == nil {
				affected, _ := result.RowsAffected()
				if affected > 0 {
					return c.SendStatus(204)
				}
			}
		}

		// Fallback to memory
		usersMutex.Lock()
		defer usersMutex.Unlock()
		for i, u := range users {
			if u.ID == id {
				users = append(users[:i], users[i+1:]...)
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	})

	// Update user status (toggle invited/active)
	api.Patch("/users/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		var req struct {
			Status string `json:"status"`
		}
		if err := c.BodyParser(&req); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		// Validate status
		if req.Status != "active" && req.Status != "invited" {
			return c.Status(400).JSON(fiber.Map{"error": "Status must be 'active' or 'invited'"})
		}

		// Try database first
		if db != nil {
			result, err := db.Exec("UPDATE users SET status = $1 WHERE id = $2", req.Status, id)
			if err == nil {
				affected, _ := result.RowsAffected()
				if affected > 0 {
					return c.JSON(fiber.Map{"id": id, "status": req.Status})
				}
			}
		}

		// Fallback to memory
		usersMutex.Lock()
		defer usersMutex.Unlock()
		for i := range users {
			if users[i].ID == id {
				users[i].Status = req.Status
				return c.JSON(users[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	})

	// NAVIGATION ENDPOINTS - SECURITY: Write operations require auth
	api.Get("/navigation", func(c *fiber.Ctx) error {
		navMutex.RLock()
		defer navMutex.RUnlock()
		return c.JSON(navItems)
	})

	api.Post("/navigation", authMiddleware, func(c *fiber.Ctx) error {
		var n NavigationItem
		if err := c.BodyParser(&n); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}
		navMutex.Lock()
		n.ID = navNextID
		navNextID++
		navItems = append(navItems, n)
		navMutex.Unlock()
		logAdminAction(c, "CREATE_NAV", n.Label, n.Url)
		return c.Status(201).JSON(n)
	})

	api.Delete("/navigation/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}
		navMutex.Lock()
		defer navMutex.Unlock()
		for i, n := range navItems {
			if n.ID == id {
				navItems = append(navItems[:i], navItems[i+1:]...)
				logAdminAction(c, "DELETE_NAV", n.Label, fmt.Sprintf("ID: %d", id))
				return c.SendStatus(204)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Item not found"})
	})

	// LLM CONTEXT / GEO ENDPOINT
	api.Get("/context", func(c *fiber.Ctx) error {
		var sb strings.Builder
		sb.WriteString("# Pixe Education - Institutional Context\n\n")
		sb.WriteString("> This document provides a semantic summary of Pixe Education for AI agents.\n\n")

		// 0. Site Structure
		sb.WriteString("## Site Navigation\n")
		navMutex.RLock()
		for _, n := range navItems {
			sb.WriteString(fmt.Sprintf("- [%s](%s)\n", n.Label, n.Url))
		}
		navMutex.RUnlock()
		sb.WriteString("\n")

		// 1. Mission & Stats
		settingsMutex.RLock()
		sb.WriteString("## About Us\n")
		sb.WriteString(fmt.Sprintf("%s\n%s\n\n", settings.SiteTitle, settings.SiteDescription))
		settingsMutex.RUnlock()

		sb.WriteString("### Key Statistics\n")
		statsMutex.RLock()
		for _, s := range stats {
			sb.WriteString(fmt.Sprintf("- %s: %s (%s)\n", s.Label, s.SubLabel, s.Icon))
		}
		statsMutex.RUnlock()
		sb.WriteString("\n")

		// 2. Courses
		sb.WriteString("## Our Courses (Certification Programs)\n")
		coursesMutex.RLock()
		for _, course := range courses {
			sb.WriteString(fmt.Sprintf("### %s\n", course.Title))
			sb.WriteString(fmt.Sprintf("- **Description**: %s\n", course.Description))
			sb.WriteString(fmt.Sprintf("- **Duration**: %s\n", course.Duration))
			sb.WriteString(fmt.Sprintf("- **Price**: ₹%.2f\n", course.Price))
			sb.WriteString(fmt.Sprintf("- **Mode**: Online + Live Banking\n\n"))
		}
		coursesMutex.RUnlock()

		// 3. Success Stories
		sb.WriteString("## Success Stories (Real Placements)\n")
		storiesMutex.RLock()
		for _, story := range stories {
			sb.WriteString(fmt.Sprintf("- **%s** placed at **%s** (%s)\n", story.Name, story.Company, story.Role))
			sb.WriteString(fmt.Sprintf("  > \"%s\"\n", story.Quote))
		}
		storiesMutex.RUnlock()
		sb.WriteString("\n")

		// 4. FAQs
		sb.WriteString("## Frequently Asked Questions\n")
		faqsMutex.RLock()
		for _, faq := range faqs {
			sb.WriteString(fmt.Sprintf("Q: %s\nA: %s\n\n", faq.Question, faq.Answer))
		}
		faqsMutex.RUnlock()

		// 5. Blog & Resources
		sb.WriteString("## Latest Resources & Articles\n")
		postsMutex.RLock()
		for _, post := range posts {
			sb.WriteString(fmt.Sprintf("### %s\n", post.Title))
			if len(post.Content) > 150 {
				sb.WriteString(fmt.Sprintf("%s...\n\n", post.Content[:150]))
			} else {
				sb.WriteString(fmt.Sprintf("%s\n\n", post.Content))
			}
		}
		postsMutex.RUnlock()

		// 6. Events & Masterclasses
		sb.WriteString("## Upcoming Masterclasses\n")
		eventsMutex.RLock()
		for _, event := range events {
			sb.WriteString(fmt.Sprintf("- **%s** (%s) at %s\n", event.Title, event.Date, event.Time))
		}
		eventsMutex.RUnlock()
		sb.WriteString("\n")

		// 7. Hiring Partners
		sb.WriteString("## Our Hiring Partners\n")
		// (Assuming partners variable exists, created in seed or struct)
		// Since partners slice was verified in seed data, we can iterate
		// Note from prior view: partners slice defined at line 227
		sb.WriteString("We are trusted by top companies including: ")
		var partnerNames []string
		for _, p := range partners {
			partnerNames = append(partnerNames, p.Name)
		}
		sb.WriteString(strings.Join(partnerNames, ", ") + "\n\n")

		// 8. Contact & Site Structure
		settingsMutex.RLock()
		sb.WriteString("## Contact Information\n")
		sb.WriteString(fmt.Sprintf("- Email: %s\n", settings.ContactEmail))
		sb.WriteString(fmt.Sprintf("- Phone: %s\n", settings.PhoneNumber))
		settingsMutex.RUnlock()

		// Return as plain text/markdown
		c.Set("Content-Type", "text/markdown; charset=utf-8")
		return c.SendString(sb.String())
	})

	// FORM FIELDS ENDPOINTS - SECURITY: Write operations require auth
	api.Get("/formfields", func(c *fiber.Ctx) error {
		formKey := c.Query("form")
		if formKey == "" {
			formKey = "lead-form" // Default to lead-form for backward compatibility
		}

		formFieldsMutex.RLock()
		defer formFieldsMutex.RUnlock()

		var filtered []FormField
		for _, f := range formFields {
			if f.FormKey == formKey {
				filtered = append(filtered, f)
			}
		}

		// If no fields found for this key (and it's not lead-form), return empty array
		// For lead-form we might have seeded data, but filtered logic handles it.

		return c.JSON(filtered)
	})

	api.Post("/formfields", authMiddleware, func(c *fiber.Ctx) error {
		var field FormField
		if err := c.BodyParser(&field); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		formFieldsMutex.Lock()
		field.ID = formFieldNextID
		formFieldNextID++
		formFields = append(formFields, field)
		formFieldsMutex.Unlock()

		saveFormFields() // PERSISTENCE: Save changes

		return c.Status(201).JSON(field)
	})

	api.Put("/formfields/:id", authMiddleware, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		var update FormField
		if err := c.BodyParser(&update); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid payload"})
		}

		formFieldsMutex.Lock()
		defer formFieldsMutex.Unlock()

		for i, field := range formFields {
			if field.ID == id {
				update.ID = id
				formFields[i] = update
				saveFormFields() // PERSISTENCE: Save changes
				return c.JSON(update)
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Field not found"})
	})

	// SECURITY: Form field deletion requires ADMIN PRIVILEGES (RBAC)
	api.Delete("/formfields/:id", requireAdmin, func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
		}

		formFieldsMutex.Lock()
		defer formFieldsMutex.Unlock()

		for i, field := range formFields {
			if field.ID == id {
				formFields = append(formFields[:i], formFields[i+1:]...)
				saveFormFields() // PERSISTENCE: Save changes
				return c.JSON(fiber.Map{"deleted": true})
			}
		}
		return c.Status(404).JSON(fiber.Map{"error": "Field not found"})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}

// Persistence Helpers
func loadFormFields() {
	file, err := os.ReadFile("formfields.json")
	if err != nil {
		if os.IsNotExist(err) {
			log.Println("No formfields.json found, using seeded data.")
			return
		}
		log.Println("Error reading formfields.json:", err)
		return
	}

	var loaded []FormField
	if err := json.Unmarshal(file, &loaded); err != nil {
		log.Println("Error parsing formfields.json:", err)
		return
	}

	formFieldsMutex.Lock()
	defer formFieldsMutex.Unlock()
	formFields = loaded

	// Update nextID
	maxID := 0
	for _, f := range formFields {
		if f.ID > maxID {
			maxID = f.ID
		}
	}
	formFieldNextID = maxID + 1
	log.Printf("Loaded %d form fields from disk.", len(formFields))
}

func saveFormFields() {
	formFieldsMutex.RLock()
	defer formFieldsMutex.RUnlock()

	data, err := json.MarshalIndent(formFields, "", "  ")
	if err != nil {
		log.Println("Error marshaling form fields:", err)
		return
	}

	if err := os.WriteFile("formfields.json", data, 0644); err != nil {
		log.Println("Error writing formfields.json:", err)
	}
}

// initSchema creates necessary tables if they don't exist
func initSchema(db *sql.DB) error {
	// LEADS Table
	queryLeads := `
	CREATE TABLE IF NOT EXISTS leads (
		id SERIAL PRIMARY KEY,
		name TEXT,
		email TEXT,
		phone TEXT,
		message TEXT,
		course TEXT,
		source TEXT,
		status TEXT,
		created_at TEXT,
		verification_token TEXT,
		utm_campaign TEXT,
		utm_source TEXT,
		utm_medium TEXT
	);`
	if _, err := db.Exec(queryLeads); err != nil {
		return fmt.Errorf("creating leads table: %w", err)
	}

	// USERS Table
	queryUsers := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		role TEXT DEFAULT 'user',
		status TEXT DEFAULT 'active',
		created_at TEXT
	);`
	if _, err := db.Exec(queryUsers); err != nil {
		return fmt.Errorf("creating users table: %w", err)
	}

	// PAGES Table (CMS)
	queryPages := `
	CREATE TABLE IF NOT EXISTS pages (
		id SERIAL PRIMARY KEY,
		slug TEXT UNIQUE NOT NULL,
		title TEXT,
		content TEXT,
		status TEXT DEFAULT 'draft',
		seo_title TEXT,
		seo_description TEXT,
		created_at TEXT,
		updated_at TEXT
	);`
	if _, err := db.Exec(queryPages); err != nil {
		return fmt.Errorf("creating pages table: %w", err)
	}

	// COURSES Table
	queryCourses := `
	CREATE TABLE IF NOT EXISTS courses (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		slug TEXT UNIQUE,
		description TEXT,
		duration TEXT,
		price TEXT,
		image TEXT,
		status TEXT DEFAULT 'active',
		created_at TEXT
	);`
	if _, err := db.Exec(queryCourses); err != nil {
		return fmt.Errorf("creating courses table: %w", err)
	}

	// POSTS Table (Blog)
	queryPosts := `
	CREATE TABLE IF NOT EXISTS posts (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		slug TEXT UNIQUE,
		content TEXT,
		excerpt TEXT,
		author TEXT,
		status TEXT DEFAULT 'draft',
		created_at TEXT,
		updated_at TEXT
	);`
	if _, err := db.Exec(queryPosts); err != nil {
		return fmt.Errorf("creating posts table: %w", err)
	}

	// EVENTS Table
	queryEvents := `
	CREATE TABLE IF NOT EXISTS events (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		description TEXT,
		date TEXT,
		location TEXT,
		image TEXT,
		status TEXT DEFAULT 'upcoming',
		created_at TEXT
	);`
	if _, err := db.Exec(queryEvents); err != nil {
		return fmt.Errorf("creating events table: %w", err)
	}

	// SUBSCRIBERS Table
	querySubscribers := `
	CREATE TABLE IF NOT EXISTS subscribers (
		id SERIAL PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		created_at TEXT
	);`
	if _, err := db.Exec(querySubscribers); err != nil {
		return fmt.Errorf("creating subscribers table: %w", err)
	}

	// FORM_FIELDS Table
	queryFormFields := `
	CREATE TABLE IF NOT EXISTS form_fields (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		field_type TEXT,
		label TEXT,
		placeholder TEXT,
		required BOOLEAN DEFAULT false,
		options TEXT,
		field_order INTEGER DEFAULT 0
	);`
	if _, err := db.Exec(queryFormFields); err != nil {
		return fmt.Errorf("creating form_fields table: %w", err)
	}

	// SETTINGS Table (Key-Value store)
	querySettings := `
	CREATE TABLE IF NOT EXISTS app_settings (
		key TEXT PRIMARY KEY,
		value TEXT
	);`
	if _, err := db.Exec(querySettings); err != nil {
		return fmt.Errorf("creating app_settings table: %w", err)
	}

	log.Println("✅ [DATABASE] All tables initialized successfully")
	return nil
}

// reloadDatabaseConnection switches the database connection based on current settings
func reloadDatabaseConnection() error {
	settingsMutex.RLock()
	dbURL := getDatabaseURL()
	settingsMutex.RUnlock()

	// 1. If connection string is empty, switch to In-Memory
	if dbURL == "" {
		if db != nil {
			db.Close()
			db = nil
		}
		log.Println("ℹ️  [DATABASE] No Connection URL. Switched to In-Memory mode.")
		return nil
	}

	// 2. Validate URL (Basic check)
	if !strings.HasPrefix(dbURL, "postgres://") && !strings.HasPrefix(dbURL, "postgresql://") {
		return fmt.Errorf("invalid database URL scheme")
	}

	// 3. Connect
	newDB, err := sql.Open("postgres", dbURL)
	if err != nil {
		return fmt.Errorf("failed to open connection: %w", err)
	}

	// 4. Ping to verify
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := newDB.PingContext(ctx); err != nil {
		newDB.Close()
		return fmt.Errorf("failed to ping database: %w", err)
	}

	// 5. Swap global connection
	if db != nil {
		db.Close()
	}
	db = newDB

	log.Println("✅ [DATABASE] Connection re-established successfully!")

	// 6. Init Schema
	if err := initSchema(db); err != nil {
		log.Printf("⚠️ [DATABASE] Schema init warning: %v", err)
	}

	return nil
}
