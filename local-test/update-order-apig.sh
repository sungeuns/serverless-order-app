
curl -s --header "Content-Type: application/json" \
  --request PUT \
  --data '{"name":"local-apig-name","restaurantId":"Local-APIG-store","quantity":55 }' \
  http://localhost:8080/orders/c9e83ee8-bb9e-4d54-83ba-e0633eb4da60 | python3 -m json.tool
  