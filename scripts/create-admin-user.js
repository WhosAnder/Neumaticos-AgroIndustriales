const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL,
})

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@nei.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Nei@Admin2025!"

const createAdminUser = async () => {
  const client = await pool.connect()

  try {
    // Delete existing user if exists
    await client.query(`DELETE FROM users WHERE email = $1`, [ADMIN_EMAIL])
    await client.query(`DELETE FROM accounts WHERE account_id = $1`, [ADMIN_EMAIL])

    // Better-auth uses bcryptjs with specific settings
    const bcrypt = require("bcryptjs")
    const rounds = 12
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, rounds)

    // Generate proper IDs
    const userId = "admin-" + Date.now()
    const accountId = "account-" + Date.now()

    // Insert user
    await client.query(
      `INSERT INTO users (id, name, email, email_verified, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      [userId, "Admin", ADMIN_EMAIL, true]
    )

    // Insert account with password hash
    await client.query(
      `INSERT INTO accounts (id, account_id, provider_id, user_id, password, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [accountId, ADMIN_EMAIL, "credential", userId, hashedPassword]
    )

    console.log(`✅ Admin user created: ${ADMIN_EMAIL}`)
    console.log(`   Password: ${ADMIN_PASSWORD}`)
  } catch (error) {
    console.error("❌ Error:", error.message)
    console.error(error.stack)
  } finally {
    client.release()
    await pool.end()
  }
}

createAdminUser()
