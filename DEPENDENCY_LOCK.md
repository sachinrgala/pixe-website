# 🔒 Dependency Lock Policy

**Status**: LOCKED  
**Last Updated**: 2026-01-18  

## Policy
All package updates are **DISABLED**. Dependencies are frozen at their current versions to ensure stability and prevent supply-chain attacks.

## How to Update (Manual Only)

### Frontend (npm)
```bash
cd frontend
# Review what would be updated first:
npm outdated

# Update a specific package manually:
npm install <package>@<version> --save-exact

# NEVER run:
# npm update  ❌
```

### Backend (Go)
```bash
cd backend
# Dependencies are vendored in /vendor

# To update a specific package:
go get <package>@<version>
go mod tidy
go mod vendor

# NEVER run:
# go get -u ./...  ❌
```

## Why This Matters
1. **Supply Chain Security**: Prevents malicious package updates
2. **Reproducible Builds**: Same code = same binary every time
3. **Controlled Updates**: You decide when and what to update

## Files That Enforce This
- `frontend/.npmrc` - npm lock settings
- `backend/vendor/` - Vendored Go dependencies
- `frontend/package-lock.json` - Exact npm versions
- `backend/go.sum` - Go module checksums
