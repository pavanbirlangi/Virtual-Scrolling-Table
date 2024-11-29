import pool from "./pool"; // Database connection pool
import { faker } from "@faker-js/faker"; // Faker for generating realistic data

// Utility function to generate a random date between two dates
function randomDate(start: Date, end: Date): Date {
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid Date object provided.");
  }
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


(async () => {
  try {
    const statuses = ["pending", "processing", "completed", "cancelled"]; // Order statuses

    console.log("Seeding database with 10,000 records...");

    // Insert 10,000 orders
    for (let i = 0; i < 10000; i++) {
      const customerName = faker.person.fullName(); // Generate a random customer name
      const orderAmount = parseFloat((Math.random() * (1000 - 10) + 10).toFixed(2)); // Random order amount
      const status = statuses[Math.floor(Math.random() * statuses.length)]; // Random status
      const createdAt = randomDate(new Date("2022-01-01"), new Date("2023-12-31")); // Random date

      // Insert into the database
      await pool.query(
        `INSERT INTO orders (customer_name, order_amount, status, created_at)
         VALUES ($1, $2, $3, $4)`,
        [customerName, orderAmount, status, createdAt]
      );

      // Log progress for every 1,000 records
      if (i % 1000 === 0) {
        console.log(`Inserted ${i} records...`);
      }
    }

    console.log("Seeding complete!");
    pool.end(); // Close database connection
  } catch (err) {
    console.error("Error while seeding database:", err);
    pool.end(); // Close database connection on error
  }
})();
