.PHONY: backend frontend frontend-install test-backend test-frontend

backend:
	go run .

frontend:
	npm --prefix frontend start

frontend-install:
	npm --prefix frontend install

test-backend:
	go test ./...

test-frontend:
	npm --prefix frontend test -- --watchAll=false
