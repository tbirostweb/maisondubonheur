#!/usr/bin/env bash
# Test de non-régression : build de l'image, exécution durcie
# (read-only, cap-drop ALL, no-new-privileges), contrôle UID, health, headers,
# 404, 405, cache, canonical, absence de Google Fonts.
set -u
cd "$(dirname "$0")/.."
fail=0; ok(){ echo "OK   $1"; }; ko(){ echo "FAIL $1"; fail=1; }
chk(){ if eval "$2"; then ok "$1"; else ko "$1"; fi; }
docker build -q -t mdb-app --build-arg VITE_SITE_URL=https://example.test application >/dev/null || exit 1
R=(--read-only --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges)
docker rm -f mdb-ta >/dev/null 2>&1
docker run -d --name mdb-ta "${R[@]}" -p 18082:8080 mdb-app >/dev/null
sleep 6
for n in ta; do
  chk "$n UID non-root" '[ "$(docker exec mdb-$n id -u)" != 0 ]'
  chk "$n healthy" '[ "$(docker inspect -f "{{.State.Health.Status}}" mdb-$n)" = healthy ]'
done
A=localhost:18082
chk "app 404 vrai statut + page dédiée" '[ "$(curl -s -o /dev/null -w %{http_code} $A/nope)" = 404 ] && curl -s $A/nope | grep -q "Page introuvable"'
chk "app POST 405" '[ "$(curl -s -o /dev/null -w %{http_code} -X POST $A/)" = 405 ]'
chk "app dotfile 404" '[ "$(curl -s -o /dev/null -w %{http_code} $A/.env)" = 404 ]'
chk "app CSP sans Google" 'curl -sI $A/ | grep -i content-security | grep -vq google'
chk "app headers sur 404" 'curl -sI $A/nope | grep -qi x-content-type-options'
chk "app canonical=VITE_SITE_URL" 'curl -s $A/ | grep -q "canonical\" href=\"https://example.test/\""'
chk "app robots/sitemap alignés" 'curl -s $A/robots.txt | grep -q example.test && curl -s $A/sitemap.xml | grep -q "example.test/mentions"'
chk "app sans Google Fonts" '! curl -s $A/ | grep -q googleapis && ! curl -s $A/mentions-legales.html | grep -q googleapis'
chk "app 404 asset non cachée" 'curl -sI $A/assets/zzz.js | grep -i cache-control | grep -vq immutable'
docker rm -f mdb-ta >/dev/null
exit $fail
