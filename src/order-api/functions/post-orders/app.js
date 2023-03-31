// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const dynamodb = require("aws-sdk/clients/dynamodb")
const docClient = new dynamodb.DocumentClient()
const uuid = require("node-uuid")

const tableName = process.env.ORDER_TABLE
const DEFAULT_ORDER_STATUS = "PENDING"

// It gets the current date
const getCurrentDate = () => {
  let date_ob = new Date()
  let date = ("0" + date_ob.getDate()).slice(-2)
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
  let year = date_ob.getFullYear()
  let hours = date_ob.getHours()
  let minutes = date_ob.getMinutes()
  let seconds = date_ob.getSeconds()

  return (
    year +
    "-" +
    month +
    "-" +
    date +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  )
}

exports.postOrders = async (event) => {
  let formattedDateNow = getCurrentDate()

  // We are reading the records from SQS in a loop
  for (const record of event.Records) {
    const { messageId, body } = record // Now destructures the MessageId and Body from event.
    let parsedBody = JSON.parse(body) // Parses the Json to Javascript object

    // Instead of ussing uuid in Id, now we are passing MessageId to Id parameter in Item payload
    let item = {
      user_id: "static_user",
      id: messageId,
      name: parsedBody.data.name,
      restaurantId: parsedBody.data.restaurantId,
      quantity: parsedBody.data.quantity,
      createdAt: formattedDateNow.toString(),
      orderStatus: DEFAULT_ORDER_STATUS,
    }

    let params = {
      TableName: tableName,
      Item: item,
    }

    // Use Put method to put items into Dynamodb
    try {
      const data = await docClient.put(params).promise()
      console.log("Success for putting Item")
      console.log(data)
    } catch (err) {
      console.log("Failure", err.message)
    }
  }
  const response = {
    statusCode: 200,
  }
  return response
}
