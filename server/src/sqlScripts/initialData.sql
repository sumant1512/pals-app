-- Default Data
INSERT INTO UserType (userType, description)
VALUES('admin', 'A System Administrator');
INSERT INTO UserType (userType, description)
VALUES('staff', 'An Ordering Staff Member');
INSERT INTO UserType (userType, description)
VALUES('end_user', 'The End User / Client');

INSERT INTO UserStatus (userStatusName, description)
VALUES('alive', 'The User is active in the system');
INSERT INTO UserStatus (userStatusName, description)
VALUES('dead', 'The User has been deleted from the system');

INSERT INTO Products (productName, productType, img, isShadeEnabled)
VALUES('Wall Primer','Interior','product_1.jpeg',false);
INSERT INTO Products (productName, productType, img, isShadeEnabled)
VALUES('Wall Primer','Exterior','product_2.jpeg',false);
INSERT INTO Products (productName, productType, img, pigmentPrice, isShadeEnabled)
VALUES('Acrylic Washable Distemper','Interior/Exterior','product_3.jpeg', 5, true);
INSERT INTO Products (productName, productType, img, pigmentPrice, isShadeEnabled)
VALUES('Plastic Paint','Exterior','product_4.jpeg',5, true);
INSERT INTO Products (productName, productType, img, pigmentPrice, isShadeEnabled)
VALUES('Plastic Paint','Exterior','product_5.jpeg', 5, true);

INSERT INTO OrderStatus (statusName)
VALUES('Pending');
INSERT INTO OrderStatus (statusName)
VALUES('Processing');
INSERT INTO OrderStatus (statusName)
VALUES('Shipped');
INSERT INTO OrderStatus (statusName)
VALUES('Delivered');
INSERT INTO OrderStatus (statusName)
VALUES('Cancelled');
INSERT INTO OrderStatus (statusName)
VALUES('Refunded');
INSERT INTO OrderStatus (statusName)
VALUES('On Hold');
INSERT INTO OrderStatus (statusName)
VALUES('Returned');
INSERT INTO OrderStatus (statusName)
VALUES('Completed');

INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('1L','219','30', 1);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('4L','699','30', 1);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('10L','1259','35', 1);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('20L','2199','30', 1);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('1L','419','30', 2);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('4L','1219','30', 2);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('10L','2459','35', 2);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('20L','4299','30', 2);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('1KG','119','30', 3);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('5KG','219','30', 3);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('10KG','359','35', 3);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('20KG','899','30', 3);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('1L','319','30', 4);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('4L','999','30', 4);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('10L','1859','35', 4);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('20L','3199','30', 4);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('1L','619','30', 5);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('4L','1899','30', 5);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('10L','3659','35', 5);
INSERT INTO PackSize (size, mrp, discount, productId)
VALUES('20L','6299','30', 5);