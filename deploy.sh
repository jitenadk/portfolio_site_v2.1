#!/bin/bash

# Colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Log functions
log_info() {
  echo -e "${BLUE}ℹ️ INFO:${NC} $1"
}

log_success() {
  echo -e "${GREEN}✅ SUCCESS:${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}⚠️ WARNING:${NC} $1"
}

log_error() {
  echo -e "${RED}❌ ERROR:${NC} $1"
}

# Check if running as root/sudo
check_sudo() {
  if [ "$EUID" -ne 0 ]; then
    log_warning "Not running as root. Some operations might fail."
    log_info "Consider running the script with sudo for full functionality."
    return 1
  fi
  return 0
}

# System update and cleanup
system_update() {
  log_info "Updating system packages..."
  sudo apt update || { log_error "Failed to update system packages"; return 1; }
  log_success "System packages updated"
  
  log_info "Upgrading system packages..."
  sudo apt upgrade -y || { log_warning "Some packages might not have been upgraded"; }
  log_success "System packages upgraded"
  
  log_info "Cleaning package cache..."
  sudo apt clean || { log_warning "Failed to clean package cache"; }
  sudo apt autoclean || { log_warning "Failed to autoclean package cache"; }
  sudo apt autoremove -y || { log_warning "Failed to autoremove unused packages"; }
  log_success "Package cache cleaned"
  
  return 0
}

# Clean system caches
clean_system_caches() {
  log_info "Cleaning system caches..."
  
  # Clean apt cache
  sudo apt clean || log_warning "Failed to clean apt cache"
  
  # Clean thumbnail cache
  if [ -d "$HOME/.cache/thumbnails" ]; then
    rm -rf "$HOME/.cache/thumbnails/*" || log_warning "Failed to clean thumbnail cache"
  fi
  
  # Clean temp files
  sudo rm -rf /tmp/* || log_warning "Failed to clean /tmp"
  
  # Clean journal logs
  if command -v journalctl &> /dev/null; then
    sudo journalctl --vacuum-time=3d || log_warning "Failed to clean journal logs"
  fi
  
  log_success "System caches cleaned"
}

# Check disk space
check_disk_space() {
  log_info "Checking disk space..."
  
  # Get available disk space in MB
  local avail_space=$(df -m / | awk 'NR==2 {print $4}')
  
  if [ "$avail_space" -lt 1000 ]; then
    log_error "Low disk space: ${avail_space}MB available. At least 1GB recommended."
    log_info "Consider cleaning up to free more space before deployment."
    return 1
  else
    log_success "Sufficient disk space available: ${avail_space}MB"
  fi
  
  return 0
}

# Check if port is in use
check_port() {
  local port="${1:-3000}"
  log_info "Checking what's running on port $port..."
  
  local port_in_use=false
  local port_info=""
  local port_pid=""
  
  # Try different commands to check the port
  if command -v ss &> /dev/null; then
    port_info=$(ss -tulpn 2>/dev/null | grep ":$port ")
  elif command -v netstat &> /dev/null; then
    port_info=$(netstat -tulpn 2>/dev/null | grep ":$port ")
  elif command -v lsof &> /dev/null; then
    port_info=$(lsof -i:$port -P -n 2>/dev/null)
  fi
  
  # Extract PID from the port info
  if [ -n "$port_info" ]; then
    port_in_use=true
    if command -v ss &> /dev/null; then
      port_pid=$(echo "$port_info" | awk '{print $7}' | cut -d= -f2 | cut -d, -f1 2>/dev/null)
    elif command -v netstat &> /dev/null; then
      port_pid=$(echo "$port_info" | awk '{print $7}' | cut -d/ -f1 2>/dev/null)
    elif command -v lsof &> /dev/null; then
      port_pid=$(echo "$port_info" | awk 'NR>1 {print $2}' 2>/dev/null)
    fi
  fi
  
  # Show process details if port is in use
  if $port_in_use; then
    log_warning "Port $port is in use:"
    echo "$port_info"
    
    if [ -n "$port_pid" ]; then
      log_info "Process details for PID(s) on port $port:"
      for pid in $port_pid; do
        echo "PID $pid:"
        ps -f -p "$pid" 2>/dev/null || ps aux | grep "$pid" | grep -v grep
      done
    fi
    
    return 1
  else
    log_success "Port $port is free"
    return 0
  fi
}

# Kill process on a specific port
kill_process_on_port() {
  local port="${1:-3000}"
  log_info "Attempting to kill process on port $port..."
  
  local port_pid=""
  
  # Try different commands to find the PID
  if command -v ss &> /dev/null; then
    port_pid=$(ss -tulpn 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d= -f2 | cut -d, -f1 2>/dev/null)
  elif command -v netstat &> /dev/null; then
    port_pid=$(netstat -tulpn 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d/ -f1 2>/dev/null)
  elif command -v lsof &> /dev/null; then
    port_pid=$(lsof -i:$port -t 2>/dev/null)
  fi
  
  if [ -n "$port_pid" ]; then
    log_info "Found process(es) on port $port: $port_pid"
    
    for pid in $port_pid; do
      log_info "Killing process with PID $pid..."
      kill "$pid" 2>/dev/null
      sleep 1
      
      if ps -p "$pid" > /dev/null 2>&1; then
        log_warning "Process still running, using force kill..."
        kill -9 "$pid" 2>/dev/null
        sleep 1
        
        if ps -p "$pid" > /dev/null 2>&1; then
          log_warning "Process still running, attempting with sudo..."
          sudo kill -9 "$pid" 2>/dev/null
          sleep 1
        fi
      fi
      
      if ps -p "$pid" > /dev/null 2>&1; then
        log_error "Failed to kill process $pid"
      else
        log_success "Process $pid killed"
      fi
    done
    
    # Verify if port is free
    sleep 1
    check_port "$port" >/dev/null 2>&1 && log_success "Port $port is now free" || log_error "Port $port is still in use"
  else
    log_info "No process found running on port $port"
  fi
}

# Find and kill all Next.js related processes
kill_next_processes() {
  log_info "Finding and killing all Next.js related processes..."
  
  # Find processes related to Next.js
  local next_pids=$(ps aux | grep -E '[n]ext-server|[n]ext dev|[n]ode.*next|[n]ext.*start|[n]ext build' | awk '{print $2}')
  
  if [ -n "$next_pids" ]; then
    log_info "Found Next.js processes: $next_pids"
    
    for pid in $next_pids; do
      log_info "Killing Next.js process $pid..."
      kill "$pid" 2>/dev/null
      sleep 1
      
      if ps -p "$pid" > /dev/null 2>&1; then
        log_warning "Process still running, using force kill..."
        kill -9 "$pid" 2>/dev/null
        sleep 1
        
        if ps -p "$pid" > /dev/null 2>&1; then
          log_warning "Process still running, attempting with sudo..."
          sudo kill -9 "$pid" 2>/dev/null
          sleep 1
        fi
      fi
      
      if ps -p "$pid" > /dev/null 2>&1; then
        log_error "Failed to kill process $pid"
      else
        log_success "Process $pid killed"
      fi
    done
  else
    log_info "No Next.js processes found"
  fi
  
  # Check and kill processes on typical Next.js ports
  for port in 3000 3001 3002 3003; do
    check_port "$port" >/dev/null 2>&1 || kill_process_on_port "$port"
  done
}

# Set up NVM and Node.js
setup_nvm() {
  log_info "Setting up NVM and Node.js..."
  
  # Load NVM
  export NVM_DIR="$HOME/.nvm"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    source "$NVM_DIR/nvm.sh"
  else
    log_warning "NVM not found. Installing..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source "$NVM_DIR/nvm.sh"
  fi
  
  # Install and use Node.js
  log_info "Installing Node.js v20..."
  nvm install 20 || { log_error "Failed to install Node.js v20"; return 1; }
  nvm use 20 || { log_error "Failed to use Node.js v20"; return 1; }
  
  # Check versions
  log_info "Node.js version: $(node -v 2>/dev/null || echo 'Not available')"
  log_info "npm version: $(npm -v 2>/dev/null || echo 'Not available')"
  
  return 0
}

# Make sure Git is installed
ensure_git() {
  log_info "Checking Git installation..."
  
  if ! command -v git &> /dev/null; then
    log_warning "Git is not installed. Installing..."
    sudo apt update
    sudo apt install -y git || { log_error "Failed to install Git"; return 1; }
  fi
  
  log_success "Git is installed: $(git --version)"
  return 0
}

# Clone or pull repository
clone_or_pull_repo() {
  local repo_url="$1"
  local branch="${2:-main}"
  local deploy_dir="${3:-/var/www/nextjs-app}"
  
  if [ -z "$repo_url" ]; then
    log_error "No repository URL provided"
    return 1
  fi
  
  log_info "Setting up repository from $repo_url (branch: $branch) in $deploy_dir..."
  
  # Create deployment directory if it doesn't exist
  if [ ! -d "$deploy_dir" ]; then
    log_info "Creating deployment directory: $deploy_dir"
    mkdir -p "$deploy_dir" || { log_error "Failed to create deployment directory"; return 1; }
  fi
  
  # Navigate to deployment directory
  cd "$deploy_dir" || { log_error "Failed to navigate to deployment directory"; return 1; }
  
  # Check if repo already exists
  if [ -d .git ]; then
    log_info "Git repository already exists. Pulling latest changes..."
    
    # Stash any local changes
    git stash
    
    # Fetch all branches
    git fetch --all || { log_error "Failed to fetch repository updates"; return 1; }
    
    # Check if branch exists
    if git branch -r | grep -q "origin/$branch"; then
      # Switch to the specified branch
      git checkout "$branch" || { log_error "Failed to checkout branch $branch"; return 1; }
      
      # Pull latest changes
      git pull origin "$branch" || { log_error "Failed to pull latest changes"; return 1; }
    else
      log_error "Branch $branch does not exist in remote repository"
      return 1
    fi
  else
    log_info "Cloning repository..."
    
    # Clone the repository
    git clone --branch "$branch" "$repo_url" . || { log_error "Failed to clone repository"; return 1; }
  fi
  
  log_success "Repository setup complete"
  return 0
}

# Check if .env file exists and create if not
setup_env_file() {
  log_info "Checking environment configuration..."
  
  if [ ! -f .env ]; then
    log_warning ".env file not found"
    
    # Check if .env.example exists
    if [ -f .env.example ]; then
      log_info "Creating .env from .env.example..."
      cp .env.example .env
      log_warning "Please update the .env file with your configuration"
    else
      log_info "Creating empty .env file..."
      touch .env
      log_warning "Please create appropriate environment variables in .env file"
    fi
  else
    log_success ".env file already exists"
  fi
}

# Install project dependencies
install_dependencies() {
  log_info "Installing project dependencies..."
  
  # Check for package.json
  if [ ! -f package.json ]; then
    log_error "package.json not found. Are you in the project directory?"
    return 1
  fi
  
  # Clean install
  log_info "Running npm ci for clean installation..."
  npm ci || {
    log_warning "npm ci failed, falling back to npm install..."
    npm install || { log_error "npm install failed"; return 1; }
  }
  
  log_success "Dependencies installed successfully"
  return 0
}

# Build the project for production
build_project() {
  log_info "Building project for production..."
  
  # Remove previous build if exists
  if [ -d .next ]; then
    log_info "Removing previous build..."
    rm -rf .next || { log_warning "Failed to remove previous build"; }
  fi
  
  # Run build
  npm run build > build.log 2>&1
  if [ $? -ne 0 ]; then
    log_error "Build failed"
    log_info "Last 30 lines of build.log:"
    tail -n 30 build.log
    return 1
  fi
  
  log_success "Build completed successfully"
  return 0
}

# Create or update PM2 process
setup_pm2() {
  log_info "Setting up PM2 process manager..."
  
  # Check if PM2 is installed
  if ! command -v pm2 &> /dev/null; then
    log_warning "PM2 not found. Installing globally..."
    npm install -g pm2 || { log_error "Failed to install PM2"; return 1; }
  fi
  
  # Check if app is already registered with PM2
  if pm2 list | grep -q "nextjs-app"; then
    log_info "Stopping existing PM2 process..."
    pm2 stop nextjs-app || log_warning "Failed to stop existing PM2 process"
    pm2 delete nextjs-app || log_warning "Failed to delete existing PM2 process"
  fi
  
  # Start with PM2
  log_info "Starting application with PM2..."
  PORT=3000 pm2 start npm --name "nextjs-app" -- start || { log_error "Failed to start with PM2"; return 1; }
  
  # Save PM2 configuration
  pm2 save || log_warning "Failed to save PM2 configuration"
  
  # Set up PM2 to start on boot if we have sudo access
  if [ "$EUID" -eq 0 ] || sudo -n true 2>/dev/null; then
    log_info "Setting up PM2 startup script..."
    pm2 startup | tail -n 1 | bash || log_warning "Failed to set up PM2 startup script"
  else
    log_warning "Skipping PM2 startup configuration (requires sudo)"
    log_info "To configure PM2 to start on boot, run:"
    log_info "  sudo pm2 startup"
    log_info "  pm2 save"
  fi
  
  log_success "PM2 setup complete"
  return 0
}

# Setup Caddy as reverse proxy
setup_caddy() {
  local domain="${1:-localhost}"
  local port="${2:-3000}"
  
  log_info "Setting up Caddy as reverse proxy for $domain on port $port..."
  
  # Check if Caddy is installed
  if ! command -v caddy &> /dev/null; then
    log_warning "Caddy not found. Installing..."
    sudo apt update
    
    # Add Caddy official repository
    sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
    sudo apt update
    sudo apt install -y caddy || { log_error "Failed to install Caddy"; return 1; }
  fi
  
  # Create Caddy configuration
  local caddy_conf="/etc/caddy/Caddyfile"
  
  # Backup existing Caddyfile if it exists
  if [ -f "$caddy_conf" ]; then
    sudo cp "$caddy_conf" "${caddy_conf}.backup" || log_warning "Failed to backup existing Caddyfile"
  fi
  
  # Create new Caddyfile configuration
  if [ "$domain" = "localhost" ]; then
    # For localhost, use http
    cat > /tmp/nextjs-caddy.conf << EOL
:${port} {
  reverse_proxy localhost:3000
}
EOL
  else
    # For actual domain, Caddy will automatically handle HTTPS
    cat > /tmp/nextjs-caddy.conf << EOL
${domain} {
  reverse_proxy localhost:3000
}
EOL
  fi
  
  # Move configuration to Caddy directory
  sudo mv /tmp/nextjs-caddy.conf "$caddy_conf" || { log_error "Failed to create Caddy configuration"; return 1; }
  
  # Reload Caddy
  sudo systemctl reload caddy || { log_error "Failed to reload Caddy"; return 1; }
  
  log_success "Caddy setup complete"
  
  if [ "$domain" = "localhost" ]; then
    log_info "Your application is now available at http://localhost:${port}"
  else
    log_info "Your application is now available at https://${domain} (Caddy automatically handles HTTPS)"
  fi
  
  return 0
}

# Note: With Caddy, SSL setup is automatic
# This function is kept for compatibility but will simply inform about Caddy's SSL
setup_ssl() {
  local domain="$1"
  local email="$2"
  
  if [ -z "$domain" ] || [ "$domain" = "localhost" ]; then
    log_warning "SSL setup is only available for public domains, not localhost"
    return 0
  fi
  
  log_info "With Caddy, SSL is automatically configured for $domain"
  log_info "Caddy will automatically obtain and renew SSL certificates from Let's Encrypt"
  
  # Update Caddy config to include the email for Let's Encrypt
  if [ -n "$email" ]; then
    local caddy_conf="/etc/caddy/Caddyfile"
    
    # Add global email setting to the top of the Caddyfile
    sudo sed -i "1s/^/{\\n\\temail $email\\n}\\n\\n/" "$caddy_conf" || log_warning "Failed to add email to Caddy configuration"
    
    # Reload Caddy to apply changes
    sudo systemctl reload caddy || log_warning "Failed to reload Caddy configuration"
  fi
  
  log_success "SSL setup complete (managed by Caddy)"
  log_info "Your application is now available at https://${domain}"
  
  return 0
}

# Run full GitHub deployment process
github_deploy() {
  local repo_url="$1"
  local branch="${2:-main}"
  local deploy_dir="${3:-/var/www/nextjs-app}"
  local domain="${4:-localhost}"
  local setup_proxy="${5:-false}"
  local setup_ssl="${6:-false}"
  local email="${7:-}"
  local proxy_port="${8:-80}"
  
  if [ -z "$repo_url" ]; then
    log_error "GitHub repository URL is required"
    echo "Usage: $0 github-deploy <repo_url> [branch] [deploy_dir] [domain] [setup_proxy] [setup_ssl] [email] [proxy_port]"
    return 1
  fi
  
  log_info "Starting full GitHub deployment process..."
  
  # System preparation
  system_update
  check_disk_space || log_warning "Low disk space might affect deployment"
  clean_system_caches
  
  # Kill any existing processes
  kill_next_processes
  
  # Setup required tools
  ensure_git || { log_error "Failed to setup Git"; return 1; }
  setup_nvm || { log_error "Failed to setup Node.js environment"; return 1; }
  
  # Clone/pull repository
  clone_or_pull_repo "$repo_url" "$branch" "$deploy_dir" || { log_error "Failed to setup repository"; return 1; }
  
  # Navigate to deployment directory
  cd "$deploy_dir" || { log_error "Failed to navigate to deployment directory"; return 1; }
  
  # Setup environment
  setup_env_file
  
  # Install and build
  install_dependencies || { log_error "Failed to install dependencies"; return 1; }
  build_project || { log_error "Failed to build project"; return 1; }
  
  # Setup deployment
  setup_pm2 || { log_error "Failed to setup PM2"; return 1; }
  
  # Setup Caddy if requested
  if [ "$setup_proxy" = "true" ]; then
    setup_caddy "$domain" "$proxy_port" || log_warning "Failed to setup Caddy"
    
    # If using a domain (not localhost) and SSL is requested, configure Caddy email
    if [ "$setup_ssl" = "true" ] && [ "$domain" != "localhost" ]; then
      if [ -z "$email" ]; then
        log_warning "Email is recommended for Let's Encrypt notifications. Caddy will still set up HTTPS."
      else
        setup_ssl "$domain" "$email" || log_warning "Failed to configure SSL email in Caddy"
      fi
    fi
  fi
  
  log_success "Deployment completed successfully!"
  
  # Show application URL
  if [ "$setup_proxy" = "true" ]; then
    if [ "$domain" = "localhost" ]; then
      log_info "Your application is running at http://localhost:${proxy_port}"
    else
      log_info "Your application is running at https://${domain} (Caddy enables HTTPS automatically)"
    fi
  else
    log_info "Your application is running at http://localhost:3000"
  fi
  
  # Show PM2 status
  log_info "PM2 process status:"
  pm2 list | grep nextjs-app
  
  return 0
}

# Show usage
show_usage() {
  echo -e "${BLUE}=== Next.js GitHub Deployment Script with Caddy ===${NC}"
  echo ""
  echo "Usage: $0 [command] [options]"
  echo ""
  echo "Commands:"
  echo "  github-deploy <repo_url> [branch] [deploy_dir] [domain] [setup_proxy] [setup_ssl] [email] [proxy_port]"
  echo "                       Deploy from GitHub repository"
  echo "  system-update         Update and clean system packages"
  echo "  clean-cache           Clean system caches"
  echo "  check-disk            Check available disk space"
  echo "  check-port [port]     Check what's running on a port (default: 3000)"
  echo "  kill-port [port]      Kill process on specified port (default: 3000)"
  echo "  kill-next             Kill all Next.js related processes"
  echo "  setup                 Set up NVM and Node.js environment"
  echo "  help                  Show this help message"
  echo ""
  echo "Examples:"
  echo "  $0 github-deploy https://github.com/user/repo.git main /var/www/nextjs mysite.com true true user@example.com 80"
  echo "  $0 github-deploy https://github.com/user/repo.git"
  echo ""
  echo "Options for github-deploy:"
  echo "  <repo_url>            GitHub repository URL (required)"
  echo "  [branch]              Git branch to deploy (default: main)"
  echo "  [deploy_dir]          Directory to deploy to (default: /var/www/nextjs-app)" 
  echo "  [domain]              Domain name for Caddy (default: localhost)"
  echo "  [setup_proxy]         Setup Caddy as reverse proxy (true/false, default: false)"
  echo "  [setup_ssl]           Register email for SSL notifications (true/false, default: false)"
  echo "                        Note: Caddy handles SSL automatically for domains"
  echo "  [email]               Email for Let's Encrypt notifications"
  echo "  [proxy_port]          Port for Caddy to listen on (default: 80, only applies for localhost)"
}

# Main function
main() {
  local command="${1:-help}"
  shift || true
  
  case "$command" in
    github-deploy)
      github_deploy "$@"
      ;;
    system-update)
      system_update
      ;;
    clean-cache)
      clean_system_caches
      ;;
    check-disk)
      check_disk_space
      ;;
    check-port)
      check_port "${1:-3000}"
      ;;
    kill-port)
      kill_process_on_port "${1:-3000}"
      ;;
    kill-next)
      kill_next_processes
      ;;
    setup)
      setup_nvm
      ;;
    help|*)
      show_usage
      ;;
  esac
}

# Execute main function with all arguments
main "$@"