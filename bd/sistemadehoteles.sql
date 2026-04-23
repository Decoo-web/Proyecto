-- Tabla clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Tabla tipos de habitaciones
CREATE TABLE tipos_habitaciones(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL
);

-- Tabla habitaciones
CREATE TABLE habitaciones (
    id SERIAL PRIMARY KEY,
    nombre_habitacion VARCHAR(100) NOT NULL,
    tipo_id INT,
    FOREIGN KEY (tipo_id) REFERENCES tipos_habitaciones(id)
);

-- Tabla reservas
CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    cliente_id INT,
    habitaciones_id INT,
    precio NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (habitaciones_id) REFERENCES habitaciones(id)
);

-- Tabla pagos
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    clientes_id INT,
    reservas_id INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clientes_id) REFERENCES clientes(id),
    FOREIGN KEY (reservas_id) REFERENCES reservas(id)
);



-- Clientes
INSERT INTO clientes (username, email) VALUES
('Samuel', 'samuel@gmail.com'),
('Marchena', 'marchena@gmail.com'),
('Alex', 'alex@gmail.com'),
('Sofia', 'sofia@gmail.com'),
('Diego', 'diego@gmail.com');

-- Tipos de habitaciones
INSERT INTO tipos_habitaciones (tipo) VALUES
('Familiar'),
('Suite'),
('Simple'),
('Doble'),
('Suite');

-- Habitaciones
INSERT INTO habitaciones (nombre_habitacion, tipo_id) VALUES
('Habitación familiar', 1),
('Habitación presidencial', 2),
('Habitación individual', 3),
('Habitación doble económica', 4),
('Habitación ejecutiva', 5);

-- Reservas
INSERT INTO reservas (cliente_id, habitaciones_id, precio) VALUES
(1, 1, 1500),
(2, 2, 3000),
(3, 3, 400),
(4, 4, 650),
(5, 5, 2400);

-- Pagos
INSERT INTO pagos (clientes_id, reservas_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);


SELECT * FROM clientes;
SELECT * FROM tipos_habitaciones;
SELECT * FROM habitaciones;
SELECT * FROM reservas;
SELECT * FROM pagos;