#!/usr/bin/env bash
# Deploy completo: atualiza código e reconstrói/sobe API + frontend de uma vez.
# Uso:
#   ./deploy.sh            -> build normal (rápido, usa cache)
#   ./deploy.sh --fresh    -> build sem cache (garante bundle novo)
set -e

cd "$(dirname "$0")"

echo "==> git pull"
git pull origin main

BUILD_ARGS=""
if [ "$1" = "--fresh" ]; then
  BUILD_ARGS="--no-cache"
  echo "==> build SEM cache (autoqui + autoqui-api)"
else
  echo "==> build (autoqui + autoqui-api)"
fi

docker compose build $BUILD_ARGS autoqui autoqui-api
echo "==> subindo containers"
docker compose up -d autoqui autoqui-api

echo "==> limpando imagens antigas"
docker image prune -f >/dev/null 2>&1 || true

echo ""
echo "==> HEAD atual:"
git log --oneline -1
echo "==> containers:"
docker compose ps autoqui autoqui-api
echo ""
echo "Pronto. Dica: se algo não atualizar, rode ./deploy.sh --fresh"
