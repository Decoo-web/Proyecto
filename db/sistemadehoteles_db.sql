CREATE TABLE clientes (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	email VARCHAR(100) NOT NULL
);

CREATE TABLE habitaciones (
	id SERIAL PRIMARY KEY,
	nombre_habitacion VARCHAR(100) NOT NULL
);

CREATE TABLE tipos_habitaciones(
	id SERIAL PRIMARY KEY,
	tipos_habitacion VARCHAR(10) NOT NULL,
	habitaciones_id INT,
	FOREIGN KEY (habitaciones_id) REFERENCES habitaciones(id)
);

CREATE TABLE reservas (
	id SERIAL PRIMARY KEY,
	nombre_habitacion VARCHAR(100) NOT NULL,
	precio INT NOT NULL,
	clientes_id INT,
	habitaciones_id INT,
	FOREIGN KEY (clientes_id) REFERENCES clientes(id),
	FOREIGN KEY (habitaciones_id) REFERENCES habitaciones(id)
);

CREATE TABLE pagos (
	id SERIAL PRIMARY KEY,
	clientes_id INT,
	reservas_id INT,
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (clientes_id) REFERENCES clientes(id),
	FOREIGN KEY (reservas_id) REFERENCES reservas(id)
);

-- INSERTS

INSERT INTO clientes (username, email) VALUES
('Samuel', 'samuel@gmail.com'),
('Marchena', 'marchena@gmail.com'),
('Alex', 'alex@gmail.com'),
('Sofia', 'sofia@gmail.com'),
('Diego', 'diego@gmail.com');

INSERT INTO habitaciones (nombre_habitacion) VALUES
('Habitación familiar'),
('Habitación presidencial'),
('Habitación individual'),
('Habitación doble económica'),
('Habitación ejecutiva');

INSERT INTO tipos_habitaciones (tipos_habitacion, habitaciones_id) VALUES
('Familiar', 1),
('Suite', 2),
('Simple', 3),
('Doble', 4),
('Suite', 5);

INSERT INTO reservas (nombre_habitacion, precio, , habitaciones_id) VALUES
('Habitación familiar', 1500, 1, 1),
('Habitación presidencial', 3000, 2, 2),
('Habitación individual', 400, 3, 3),
('Habitación doble económica', 650, 4, 4),
('Habitación ejecutiva', 2400, 5, 5);

INSERT INTO pagos (clientes_id, reservas_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- CONSULTAS
SELECT * FROM clientes;
SELECT * FROM habitaciones;
SELECT * FROM reservas;
SELECT * FROM tipos_habitaciones;
SELECT * FROM pagos;