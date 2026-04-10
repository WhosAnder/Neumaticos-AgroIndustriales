const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL,
})

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@nei.com"

const deleteUser = async () => {
  const client = await pool.connect()

  try {
    await client.query(`DELETE FROM accounts WHERE account_id = $1`, [ADMIN_EMAIL])
    await client.query(`DELETE FROM users WHERE email = $1`, [ADMIN_EMAIL])
    console.log(`✅ User ${ADMIN_EMAIL} deleted`)
  } catch (error) {
    console.error("❌ Error:", error.message)
  } finally {
    client.release()
    await pool.end()
  }
}

deleteUser()
