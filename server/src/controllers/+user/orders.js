const connection = require("./../../utils/mysql-connection");

const getMyOrders = (req, res, next) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
        O.userId, 
        O.orderStatusId, 
        OS.statusName,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'productId', OI.productId,
                'productName', P.productName,
                'productType', P.productType,
                'img', P.img,
                'pigmentPrice', P.pigmentPrice,
                'isShadeEnabled', P.isShadeEnabled,
                'size', OI.size,
                'mrp', OI.mrp,
                'discount', OI.discount,
                'shade', OI.shade,
                'soldPrice', OI.soldPrice
            )
        ) AS orderItems
    FROM 
        Orders O
    JOIN 
        OrderItems OI ON O.orderId = OI.orderId
    JOIN 
        Products P ON OI.productId = P.productId
    JOIN 
        OrderStatus OS ON O.orderStatusId = OS.id
    WHERE 
        O.userId = ?
    GROUP BY 
        O.userId, 
        O.orderStatusId,
        OS.statusName
  `;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No orders found for the user" });
    }

    // Send the formatted order data as the response

    return res.status(200).json({ status: true, data: results });
  });
};

const order = (req, res, next) => {
  const { userId, orderStatusId, orderItems } = req.body;
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Insert order into Orders table
    const insertOrderQuery =
      "INSERT INTO Orders (userId, orderStatusId) VALUES (?, ?)";
    connection.query(
      insertOrderQuery,
      [userId, orderStatusId],
      (error, result) => {
        if (error) {
          console.error("Error creating order:", error);
          // Rollback transaction on error
          connection.rollback(() => {
            console.error("Transaction rolled back");
            res.status(500).json({ message: "Internal server error" });
          });
          return;
        }

        const orderId = result.insertId;

        // Insert order items into OrderItems table
        const insertOrderItemsQuery =
          "INSERT INTO OrderItems (orderId, productId, size, mrp, discount, shade, soldPrice) VALUES ?";
        const orderItemValues = orderItems.map((item) => [
          orderId,
          item.productId,
          item.size,
          item.mrp,
          item.discount,
          item.shade,
          item.soldPrice,
        ]);
        connection.query(
          insertOrderItemsQuery,
          [orderItemValues],
          (error, result) => {
            if (error) {
              console.error("Error creating order items:", error);
              // Rollback transaction on error
              connection.rollback(() => {
                console.error("Transaction rolled back");
                res.status(500).json({ message: "Internal server error" });
              });
              return;
            }

            // Commit transaction
            connection.commit((err) => {
              if (err) {
                console.error("Error committing transaction:", err);
                // Rollback transaction on error
                connection.rollback(() => {
                  console.error("Transaction rolled back");
                  res.status(500).json({ message: "Internal server error" });
                });
                return;
              }
              console.log("Transaction committed");
              res
                .status(200)
                .json({ message: "Order created successfully", orderId });
            });
          }
        );
      }
    );
  });
};

module.exports = {
  getMyOrders: getMyOrders,
  order: order,
};
