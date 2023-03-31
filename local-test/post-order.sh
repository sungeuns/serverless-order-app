cd ..
# sam local invoke "PostOrders" -e events/post-order-event.json -n envs/env.json
sam local invoke "PostOrders" -e events/post-order-sqs-event.json -n envs/env.json