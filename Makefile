# Definição de variáveis
SHELL := /bin/bash
NODE_ENV ?= development  # Ambiente padrão: development
PORT ?= 3000            # Porta padrão

# Comandos disponíveis
.PHONY: install start dev build test lint format clean

# Instalar dependências com pnpm
install:
	@echo "🔧 Instalando dependências..."
	pnpm install

# Iniciar o servidor em produção
run:
	@echo "🚀 Iniciando servidor em produção..."
	NODE_ENV=production pnpm start

# Iniciar o servidor em modo de desenvolvimento
dev:
	@echo "🚀 Iniciando servidor em desenvolvimento..."
	NODE_ENV=$(NODE_ENV) pnpm run start:dev

# Build do projeto
build:
	@echo "📦 Gerando build..."
	pnpm run build

# Rodar testes
test:
	@echo "🧪 Rodando testes..."
	pnpm run test

# Rodar testes com cobertura
test_cov:
	@echo "🛡 Rodando testes com cobertura..."
	pnpm run test:cov

# Verificar lint
lint:
	@echo "🔍 Verificando lint..."
	pnpm run lint

# Corrigir lint automaticamente
lint_fix:
	@echo "🔧 Corrigindo lint automaticamente..."
	pnpm run lint --fix

# Formatar código com Prettier
format:
	@echo "🎨 Formatando código..."
	pnpm run format

# Limpar arquivos gerados
clean:
	@echo "🗑 Limpando diretórios..."
	rm -rf node_modules dist && pnpm store prune
