const connection = require("../../utils/mysql-connection");

const getMyCart = (req, res, next) => {
  const userId = req.params.userId;

  const query = `
    SELECT
      p.productName,
      p.productType,
      ps.productId,
      ps.size,
      ps.mrp,
      ps.discount,
      ci.shade,
      ci.quantity,
      ci.cartItemId,
      CAST(ps.mrp AS UNSIGNED) - (CAST(ps.mrp AS UNSIGNED) * CAST(ps.discount AS UNSIGNED) / 100) AS soldPrice
    FROM
      CartItems ci
    JOIN
      PackSize ps ON ci.packId = ps.packId
    JOIN
      Products p ON ps.productId = p.productId
    WHERE
      ci.userId = ?;
  `;

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No Cart Items found for the user" });
    }

    return res.status(200).json({ status: true, data: results });
  });
};

const cart = (req, res, next) => {
  const { userId, cartItems } = req.body;

  const insertCartItemsQuery =
    "INSERT INTO CartItems (userId, packId, shade, quantity) VALUES ?";
  const cartItemValues = cartItems.map((item) => [
    userId,
    item.packId,
    item.shade,
    item.quantity,
  ]);
  connection.query(insertCartItemsQuery, [cartItemValues], (error, result) => {
    if (error) {
      console.error("Error in adding items to cart:", error);
      res.status(500).send({
        status: false,
        message: "Error in adding items to cart",
      });
    } else {
      res.status(200).json({ message: "Items added to cart" });
    }
  });
};

const updateCartItemQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const cartItemId = req.params.cartItemId;
  console.log("****************", cartItemId);

  const query = "UPDATE CartItems SET quantity = ? WHERE cartItemId = ?";

  connection.query(query, [quantity, cartItemId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Quantity updated successfully" });
  });
};

const deleteCart = (req, res, next) => {
  const userId = req.params.userId;

  const deleteQuery = "DELETE FROM CartItems WHERE userId = ?";

  connection.query(deleteQuery, [userId], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart removed successfully" });
  });
};

module.exports = {
  getMyCart: getMyCart,
  cart: cart,
  updateCartItemQuantity: updateCartItemQuantity,
  deleteCart: deleteCart,
};
