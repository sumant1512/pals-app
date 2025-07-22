const connection = require("../../utils/mysql-connection");

const getProductList = (req, res, next) => {
  connection.query(
    "SELECT productId, productName, productType, img FROM Products",
    (err, result, fields) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          status: false,
          message: "Error in getting Client. Please check error.",
        });
      } else {
        res.status(200).send({ status: true, data: result });
      }
    }
  );
};

const getProductDetails = (req, res, next) => {
  const productId = req.params.id;

  const query = `
    SELECT 
        Products.productId, 
        Products.productName, 
        Products.productType, 
        Products.img,
        Products.pigmentPrice, 
        Products.isShadeEnabled,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'packId', PackSize.packId, 
                'size', PackSize.size, 
                'mrp', PackSize.mrp, 
                'discount', PackSize.discount
            )
        ) AS packSize
    FROM 
        Products
    LEFT JOIN 
        PackSize ON Products.productId = PackSize.productId
    WHERE 
        Products.productId = ?
    GROUP BY 
        Products.productId, 
        Products.productName, 
        Products.productType, 
        Products.img,
        Products.pigmentPrice, 
        Products.isShadeEnabled
  `;

  connection.query(query, [productId], (err, result, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        status: false,
        message: "Error in getting Client. Please check error.",
      });
    } else {
      res.status(200).send({ status: true, data: result[0] });
    }
  });
};

module.exports = {
  getProductList: getProductList,
  getProductDetails: getProductDetails,
};
