-- Active: 1755252366128@@127.0.0.1@3306@power_tools

-- таблица районов
CREATE TABLE district (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- пользователи (владельцы, клиенты)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    role ENUM('client', 'owner') NOT NULL,
    address VARCHAR(255) NOT NULL
);

ALTER TABLE users 
ALTER COLUMN is_active SET DEFAULT FALSE;

ALTER TABLE users 
MODIFY role ENUM('client', 'owner') NOT NULL DEFAULT 'client';


-- магазины инструментов
CREATE TABLE shop (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    district_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (district_id) REFERENCES district(id)
);

-- сами инструменты
CREATE TABLE tool (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tool_price DECIMAL(8,2) NOT NULL
);

-- связь магазин ↔ инструмент (сколько стоит аренда)
CREATE TABLE shop_tool (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL,
    tool_id INT NOT NULL,
    rent_price DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (shop_id) REFERENCES shop(id),
    FOREIGN KEY (tool_id) REFERENCES tool(id)
);

-- заказы (клиенты арендуют инструменты)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    shop_tool_id INT NOT NULL,
    order_date DATE NOT NULL,
    period INT NOT NULL, -- срок аренды (например, дней)
    total_price DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (shop_tool_id) REFERENCES shop_tool(id)
);