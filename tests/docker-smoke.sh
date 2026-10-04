#!/usr/bin/env bash
# Test de non-régression : build des deux images, exécution durcie
# (read-only, cap-drop ALL, no-new-privileges), contrôle UID, health, headers,
# 404, 405, cache, canonical/noindex, absence de Google Fonts.
set -u
cd "$(dirname "$0")/.."
fail=0; ok(){ echo "OK   $1"; }; ko(){ echo "FAIL $1"; fail=1; }
chk(){ if eval "$2"; then ok "$1"; else ko "$1"; fi; }
docker build -q -t mdb-app --build-arg VITE_SITE_URL=https://example.test application >/dev/null || exit 1
docker build -q -t mdb-vitrine vitrine >/dev/null || exit 1
R=(--read-only --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges)
docker rm -f mdb-ta mdb-tv >/dev/null 2>&1
docker run -d --name mdb-ta "${R[@]}" -p 18082:8080 mdb-app >/dev/null
docker run -d --name mdb-tv "${R[@]}" -p 18081:8080 mdb-vitrine >/dev/null
sleep 6
for n in ta tv; do
  chk "$n UID non-root" '[ "$(docker exec mdb-$n id -u)" != 0 ]'
  chk "$n healthy" '[ "$(docker inspect -f "{{.State.Health.Status}}" mdb-$n)" = healthy ]'
done
A=localhost:18082; V=localhost:18081
chk "app 404 vrai statut + page dédiée" '[ "$(curl -s -o /dev/null -w %{http_code} $A/nope)" = 404 ] && curl -s $A/nope | grep -q "Page introuvable"'
chk "app POST 405" '[ "$(curl -s -o /dev/null -w %{http_code} -X POST $A/)" = 405 ]'
chk "app dotfile 404" '[ "$(curl -s -o /dev/null -w %{http_code} $A/.env)" = 404 ]'
chk "app CSP sans Google" 'curl -sI $A/ | grep -i content-security | grep -vq google'
chk "app headers sur 404" 'curl -sI $A/nope | grep -qi x-content-type-options'
chk "app canonical=VITE_SITE_URL" 'curl -s $A/ | grep -q "canonical\" href=\"https://example.test/\""'
chk "app robots/sitemap alignés" 'curl -s $A/robots.txt | grep -q example.test && curl -s $A/sitemap.xml | grep -q "example.test/mentions"'
chk "app sans Google Fonts" '! curl -s $A/ | grep -q googleapis && ! curl -s $A/mentions-legales.html | grep -q googleapis'
chk "app 404 asset non cachée" 'curl -sI $A/assets/zzz.js | grep -i cache-control | grep -vq immutable'
chk "vitrine POST 405" '[ "$(curl -s -o /dev/null -w %{http_code} -X POST $V/)" = 405 ]'
chk "vitrine X-Robots-Tag noindex" 'curl -sI $V/ | grep -qi "x-robots-tag: noindex"'
chk "vitrine meta noindex, sans JSON-LD/Google" 'curl -s $V/ | grep -q "noindex" && ! curl -s $V/ | grep -qE "ld\+json|googleapis"'
chk "vitrine favicon non immutable" 'curl -sI $V/favicon.svg | grep -i cache-control | grep -vq immutable'
chk "vitrine asset hashé immutable" 'curl -sI $V$(curl -s $V/ | grep -o "/assets/[^\"]*\.js" | head -1) | grep -qi immutable'
chk "vitrine bandeau démo" 'docker exec mdb-tv grep -rl "Site de démonstration" /usr/share/nginx/html/assets >/dev/null'
docker rm -f mdb-ta mdb-tv >/dev/null
exit $fail
