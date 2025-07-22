.PHONY: help clean install dev docker-up docker-down docker-watch docker-logs docker-rebuild test build check-env

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

check-env: ## Check if .env file exists
	@if [ ! -f .env ]; then \
		echo "❌ .env file not found!"; \
		echo "Please create a .env file with your database configuration."; \
		echo "See .env.example for reference."; \
		exit 1; \
	fi
	@echo "✅ .env file found"

clean: ## Clean all dependencies and build artifacts
	@echo "🧹 Cleaning dependencies and build artifacts..."
	@rm -rf node_modules
	@rm -rf .pnpm-store
	@rm -rf .next
	@rm -rf dist
	@rm -rf build
	@rm -rf coverage
	@echo "✅ Clean complete"

install: clean ## Clean install all dependencies
	@echo "📦 Installing dependencies..."
	@pnpm install
	@echo "✅ Dependencies installed"

dev: check-env ## Start pnpm development server
	@echo "🚀 Starting development server..."
	@pnpm dev

build: check-env ## Build the application
	@echo "🏗️  Building application..."
	@pnpm build


docker-up: check-env ## Start Docker Compose services
	@echo "🐳 Starting Docker Compose services..."
	@docker-compose up -d --build
	@echo "⏳ Waiting for services to be ready..."
	@sleep 10
	@echo "✅ Services started!"
	@echo "🌐 Application: http://localhost:3000"
	@echo "📊 View logs: make docker-logs"

docker-watch: check-env ## Start Docker Compose with watch mode (hot reload)
	@echo "👀 Starting Docker Compose with watch mode..."
	@echo "🔥 Hot reload enabled - changes will trigger rebuilds"
	@docker-compose watch

docker-down: ## Stop Docker Compose services
	@echo "🛑 Stopping Docker Compose services..."
	@docker-compose down
	@echo "✅ Services stopped"

docker-logs: ## Show Docker Compose logs
	@echo "📊 Showing Docker Compose logs..."
	@docker-compose logs -f

docker-rebuild: ## Rebuild and restart Docker Compose services
	@echo "🔄 Rebuilding Docker Compose services..."
	@docker-compose down
	@docker-compose build --no-cache
	@docker-compose up -d
	@echo "✅ Services rebuilt and restarted"

docker-shell: ## Open shell in the app container
	@echo "🐚 Opening shell in app container..."
	@docker-compose exec app sh

docker-clean: ## Clean Docker containers, images, and volumes
	@echo "🧹 Cleaning Docker resources..."
	@docker-compose down -v
	@docker system prune -f
	@echo "✅ Docker cleanup complete"


status: ## Show status of services
	@echo "📊 Service Status:"
	@echo ""
	@echo "🐳 Docker Compose:"
	@docker-compose ps || echo "Docker Compose not running"
	@echo ""
	@echo "🌐 Application Health:"
	@if curl -f -s http://localhost:3000 > /dev/null; then \
		echo "✅ Application is running and responsive"; \
	else \
		echo "❌ Application is not responding or not running"; \
	fi

setup: ## Complete setup: clean, install, and start development
	@echo "🚀 Complete development setup..."
	@make clean
	@make install
	@make dev

docker-setup: ## Complete Docker setup: clean, build, and start
	@echo "🐳 Complete Docker setup..."
	@make docker-clean
	@make docker-up
	@make seed
	@echo ""
	@echo "💡 Tip: Use 'make docker-watch' for development with hot reload" 
