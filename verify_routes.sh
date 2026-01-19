#!/bin/bash

# Base URL
BASE="http://localhost:3002"

# List of routes to check
routes=(
    "/"
    "/courses"
    "/advance-digital-marketing-course"
    "/social-media-marketing-course"
    "/seo-course"
    "/ppc-course"
    "/analytics-course"
    "/affiliate-email-marketing-course"
    "/digital-marketing-courses"
    "/about"
    "/contact"
    "/career"
    "/career/career-guide"
    "/career/hire-talent"
    "/career/internship"
    "/hire-talent"
    "/hire-us"
    "/internships"
    "/scholarships"
    "/success-stories"
    "/success-stories/reviews"
    "/blog"
    "/resources"
    "/resources/tools"
    "/pricing"
    "/masterclass"
    "/corporate-training"
    "/locations/bangalore"
    "/locations/mumbai"
    "/locations/pune"
    "/locations/delhi"
    "/locations/uae"
    "/locations/us"
    "/free-counseling"
    "/certifications"
    "/legal/terms"
    "/legal/privacy"
    "/legal/refund"
    "/terms"
    "/privacy"
    "/refund"
    "/faq"
    "/login"
    "/landing"
    "/thank-you"
    "/test-icons"
    "/dashboard"
)

echo "Verifying ${#routes[@]} pages..."
echo "----------------------------------------"
printf "%-50s %s\n" "Route" "Status"
echo "----------------------------------------"

for route in "${routes[@]}"; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$route")
    if [ "$code" == "200" ]; then
        printf "%-50s \e[32m%s\e[0m\n" "$route" "$code OK"
    elif [ "$code" == "307" ] || [ "$code" == "308" ]; then
        printf "%-50s \e[33m%s\e[0m\n" "$route" "$code PRE-REDIRECT"
    elif [ "$code" == "404" ]; then
        printf "%-50s \e[31m%s\e[0m\n" "$route" "$code NOT FOUND"
    else
        printf "%-50s \e[31m%s\e[0m\n" "$route" "$code ERROR"
    fi
done
