#!/bin/bash
echo "Starting Cloudflare Tunnel..."
cloudflared tunnel run --token eyJhIjoiNWNiMzhjY2JlMjUxMzczNGI2MjY4MDkxYjNhOWI4NWYiLCJ0IjoiNWY1OWE3YWEtMGQ2Yi00MjFkLWI3MGItZDVmZTE1MjFjOGQxIiwicyI6Ik1URmhZelEzTVRndFlUSmpNUzAwWlRabUxXRXpNak10TnpSak1URmhOR0UwWVdaaiJ9 > cloudflared.log 2>&1 &
echo "Tunnel started in background. Logs: cloudflared.log"
