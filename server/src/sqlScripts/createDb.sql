USE palsdb;

CREATE TABLE UserType (
  id INT AUTO_INCREMENT,
  userType CHAR(20),
  description CHAR(60),
  CONSTRAINT usertype_pk PRIMARY KEY(id)
);
  
CREATE TABLE UserStatus (
  id INT AUTO_INCREMENT,
  userStatusName CHAR(20),
  description CHAR(60),
  CONSTRAINT userstatus_pk PRIMARY KEY(id)
);

CREATE TABLE OrderStatus (
  id INT AUTO_INCREMENT,
  statusName CHAR(30),
  CONSTRAINT orderstatus_pk PRIMARY KEY(id)
);

CREATE TABLE Users (
  userId INT AUTO_INCREMENT,
  userName  CHAR(20) NOT NULL UNIQUE,
  phoneNo   CHAR(11) NOT NULL UNIQUE,
  email     CHAR(40) NOT NULL UNIQUE,
  fName     CHAR(15) NOT NULL,
  lName     CHAR(15) NOT NULL,
  hashedPwd CHAR(70) NOT NULL,
  otp CHAR(70) NOT NULL,
  authToken CHAR(255),
  userTypeId  INT NOT NULL,
  userStatusId  INT NOT NULL,
  CONSTRAINT user_pk PRIMARY KEY(userId),
  CONSTRAINT usertype_fk FOREIGN KEY(userTypeId) REFERENCES UserType(id),
  CONSTRAINT userstatus_fk FOREIGN KEY(userStatusId) REFERENCES userStatus(id)
);

CREATE TABLE Products (
  productId INT AUTO_INCREMENT,
  productName CHAR(40) NOT NULL,
  productType CHAR(20) NOT NULL,
  img CHAR(100) NOT NULL UNIQUE,
  pigmentPrice CHAR(11),
  isShadeEnabled boolean NOT NULL,
  CONSTRAINT products_pk PRIMARY KEY(productId)
);

CREATE TABLE PackSize (
  packId INT AUTO_INCREMENT,
  size  CHAR(20) NOT NULL,
  mrp   CHAR(11) NOT NULL,
  discount CHAR(40) NOT NULL,
  productId  INT NOT NULL,
  CONSTRAINT packsize_pk PRIMARY KEY(packId),
  CONSTRAINT products_fk FOREIGN KEY(productId) REFERENCES Products(productId)
);

CREATE TABLE Orders (
  orderId INT AUTO_INCREMENT,
  userId  INT NOT NULL,
  orderStatusId INT NOT NULL,
  CONSTRAINT orders_pk PRIMARY KEY(orderId),
  CONSTRAINT user_fk FOREIGN KEY(userId) REFERENCES Users(userId),
  CONSTRAINT orderstatus_fk FOREIGN KEY(orderStatusId) REFERENCES OrderStatus(id)
);

CREATE TABLE OrderItems (
  orderId  INT NOT NULL,
  productId INT NOT NULL,
  size INT NOT NULL,
  mrp INT NOT NULL,
  discount INT NOT NULL,
  shade INT NOT NULL,
  soldPrice INT NOT NULL,
  CONSTRAINT orders_fk FOREIGN KEY(orderId) REFERENCES Orders(orderId),
  CONSTRAINT products_order_fk FOREIGN KEY(productId) REFERENCES Products(productId)
);

CREATE TABLE CartItems (
  cartItemId INT AUTO_INCREMENT,
  userId  INT NOT NULL,
  packId INT NOT NULL,
  shade CHAR(40) NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT cartitems_pk PRIMARY KEY(cartItemId),
  CONSTRAINT users_fk FOREIGN KEY(userId) REFERENCES Users(userId),
  CONSTRAINT pack_size_cart_fk FOREIGN KEY(packId) REFERENCES PackSize(packId)
);

select * from CartItems;