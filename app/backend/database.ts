import mysql, { RowDataPacket } from 'mysql2/promise'

import dotenv from 'dotenv'
dotenv.config();

// Create connection pool
const pool = mysql.createPool({
	host: process.env.MYSQL_HOST || 'localhost',
	user: process.env.MYSQL_USER || 'root',
	password: process.env.MYSQL_PASSWORD || '',
	database: process.env.MYSQL_DATABASE || 'webos',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

// Test the connection
pool.getConnection()
	.then(connection => {
		console.log('Database connected successfully');
		connection.release();
	})
	.catch(err => {
		console.error('Error connecting to the database:', err);
	});

export async function getUsers() {
	const [rows] = await pool.query('SELECT * FROM users');
	return rows;
}

export async function checkIfExists(username: string) {
	try {
		const [rows] = await pool.query<RowDataPacket[]>(
			'SELECT * FROM users WHERE username = ?',
			[username]
		);
		return rows.length > 0;
	} catch (error) {
		console.error('Error checking if user exists:', error);
		throw error;
	}
}

export async function checkPassword(username: string, password: string) {
	try {
		const [rows] = await pool.query<RowDataPacket[]>(
			'SELECT * FROM users WHERE username = ? AND password = ?',
			[username, password]
		);
		return rows.length > 0;
	} catch (error) {
		console.error('Error checking password:', error);
		throw error;
	}
}

export async function getCurrentUser(username: string) {
	try {
		const [rows] = await pool.query<RowDataPacket[]>(
			'SELECT id FROM users WHERE username = ?',
			[username]
		);
		return rows[0]?.id;
	} catch (error) {
		console.error('Error getting current user:', error);
		throw error;
	}
}

export async function addUser(username: string, password: string) {
	try {
		await pool.query(
			'INSERT INTO users (id, username, password) VALUES (UUID(), ?, ?)',
			[username, password]
		);
		return await getCurrentUser(username);
	} catch (error) {
		console.error('Error adding user:', error);
		throw error;
	}
}

const users = await getCurrentUser('Test7')
console.log(users)

export { pool };