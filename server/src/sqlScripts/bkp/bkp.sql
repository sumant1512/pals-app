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

CREATE TABLE Discount (
	discountID INT,
    expiryDate Date, 
    rate FLOAT,
    CONSTRAINT discount_pk PRIMARY KEY(discountID)
);

CREATE TABLE Cuisine (
	cuisineName CHAR(20),
    CONSTRAINT cuisine_pk PRIMARY KEY(cuisineName)
);

CREATE TABLE Restaurant (
	restaurantID INT auto_increment,
    restaurantName CHAR(25) UNIQUE NOT NULL,
    cuisine CHAR(20) NOT NULL, 
    deliveryFee FLOAT,
    rest_add CHAR(100),
    taxPercent FLOAT CHECK(taxPercent>=0 and taxPercent<=1),    
    startHour TIME,
    endHour TIME,
    CONSTRAINT restaurant_pk PRIMARY KEY(restaurantID),
    CONSTRAINT cuisine_fk FOREIGN KEY(cuisine) REFERENCES Cuisine(cuisineName)
);

CREATE TABLE MenuType (
    menuType CHAR(15),
    CONSTRAINT menutype_pk PRIMARY KEY(menuType)
);

CREATE TABLE RestaurantMenu (
    menuType CHAR(15),
	restaurantID INT,
    startHour TIME NOT NULL,
    endHour TIME NOT NULL,
    CONSTRAINT  menu_pk PRIMARY KEY(menuType, restaurantID),
    CONSTRAINT menuType_fk FOREIGN KEY(menuType) REFERENCES MenuType(menuType)
);


CREATE TABLE ItemConfiguration (
	configName CHAR(30),
    ratio FLOAT NOT NULL, 
    CONSTRAINT  config_pk PRIMARY KEY(configName)
);

CREATE TABLE RestaurantMenuItem (
    menuType CHAR(15),
	restaurantID INT,
    menuItemName CHAR(25),
    basePrice FLOAT NOT NULL,
    CONSTRAINT  rest_menu_item_pk PRIMARY KEY(menuType, restaurantID, menuItemName),
    CONSTRAINT restaurant_menu_fk FOREIGN KEY(menuType, restaurantID) REFERENCES RestaurantMenu(menuType, restaurantID)   
);


CREATE TABLE RestaurantMenuItemConfig (
    menuType CHAR(15),
	restaurantID INT,
    menuItemName CHAR(25),
    configName CHAR(30),
    CONSTRAINT  rest_menu_item_config_pk PRIMARY KEY(menuType, restaurantID, menuItemName, configName),
    CONSTRAINT restaurant_menu_item_fk FOREIGN KEY(menuType, restaurantID, menuItemName) REFERENCES RestaurantMenuItem(menuType, restaurantID, menuItemName),
    CONSTRAINT config_fk FOREIGN KEY(configName) REFERENCES ItemConfiguration(configName)
);

CREATE TABLE DeliveryArea(
	areaName CHAR(20),
	CONSTRAINT  areaname_pk PRIMARY KEY(areaName)
);

CREATE TABLE UserAddress (
  userAddNo INT AUTO_INCREMENT,
  username  CHAR(20),
  areaName CHAR(20) NOT NULL,
  addressLine1 CHAR(20) NOT NULL, 
  addressLine2 CHAR(20),
  CONSTRAINT user_add_pk PRIMARY KEY (userAddNo),
  CONSTRAINT user_add_area_fk FOREIGN KEY (areaName) REFERENCES DeliveryArea(areaName),
  CONSTRAINT user_add_name_fk FOREIGN KEY (username) REFERENCES User(username)
);

CREATE TABLE RestaurantDeliveryArea(
	areaName CHAR(20),
    restaurantID INT,
	CONSTRAINT  rest_area_pk PRIMARY KEY(areaName, restaurantID),
    CONSTRAINT rest_fk FOREIGN KEY(restaurantID) REFERENCES Restaurant(restaurantID),
    CONSTRAINT area_fk FOREIGN KEY(areaName) REFERENCES DeliveryArea(areaName)
);

CREATE TABLE OrderStatus(
	statusName CHAR(20),
	CONSTRAINT  status_pk PRIMARY KEY(statusName)
);

CREATE TABLE Cart(
	cartID INT auto_increment,
	orderedByName  CHAR(20)  NOT NULL,
    orderedByAddNo INT NOT NULL, 
    restaurantID INT NOT NULL,
    discountID INT ,
    statusName CHAR(20),
	CONSTRAINT cart_pk PRIMARY KEY(cartID),
    CONSTRAINT rest_name_fk FOREIGN KEY(restaurantID) REFERENCES Restaurant(restaurantID),    
    CONSTRAINT orderedByAdd_fk FOREIGN KEY(orderedByAddNo) REFERENCES UserAddress(userAddNo),
    CONSTRAINT orderedByName_fk FOREIGN KEY(orderedByName) REFERENCES User(username),
    CONSTRAINT discount_fk FOREIGN KEY(discountID) REFERENCES Discount(discountID),
    CONSTRAINT status_fk FOREIGN KEY(statusName) REFERENCES OrderStatus(statusName) 
);

CREATE TABLE CartItem (
	CartID INT,
    menuType CHAR(15),
	restaurantID INT,
    menuItemName CHAR(25),
    configName CHAR(30), 
    quantity INT, 
    comment CHAR(100),
    CONSTRAINT user_ordered_item_pk PRIMARY KEY(cartID, menuType, restaurantID, menuItemName, configName),
    CONSTRAINT menu_item_config_fk FOREIGN KEY(menuType, restaurantID, menuItemName, configName) REFERENCES RestaurantMenuItemConfig(menuType, restaurantID, menuItemName, configName),
    CONSTRAINT cart_fk FOREIGN KEY(cartID) REFERENCES Cart(cartID)
);

drop view if exists cartTotal;
create view cartTotal(cartID, total)
as (
	Select DISTINCT CC.cartID, RR.deliveryFee+sum(R.basePrice*IC.ratio*(1+RR.taxPercent)*C.quantity*(1-IF(CC.discountID is NULL,0, d.rate)))
    from Cart CC, CartItem C, RestaurantMenuItem R, Restaurant RR, ItemConfiguration IC, Discount D
    where CC.cartID = C.cartID
    and CC.restaurantID = C.restaurantID
    and CC.restaurantID = R.restaurantID
    and CC.restaurantID = RR.restaurantID
    and C.configName = IC.configName
    and C.restaurantID = RR.restaurantID
    and C.menuType = R.menuType
    and C.restaurantID  = R.restaurantID
    and C.menuItemName = R.menuItemName
    and R.restaurantID = RR.restaurantID
    and ((D.discountID = CC.discountID and D.expiryDate>CurDate()) or CC.discountID is NULL)
	group by CC.cartID, D.discountID
    order by CC.cartID
);