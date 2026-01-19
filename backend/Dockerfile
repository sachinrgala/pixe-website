# Production Dockerfile for Go Backend
# Multi-stage build for minimal image size

FROM golang:1.21-alpine AS builder
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git ca-certificates

# Download dependencies first (cached layer)
COPY go.mod go.sum ./
RUN go mod download

# Build the application
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o server ./cmd/server

# Minimal production image
FROM alpine:3.19
WORKDIR /app

# Security: Add certificates and create non-root user
RUN apk --no-cache add ca-certificates tzdata \
    && addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy binary and assets
COPY --from=builder /app/server .
COPY --from=builder /app/uploads ./uploads

# Change ownership
RUN chown -R appuser:appgroup /app

USER appuser

# Cloud Run uses port 8080
EXPOSE 8080
ENV PORT=8080

CMD ["./server"]
