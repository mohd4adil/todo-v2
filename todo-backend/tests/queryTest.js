const { Client } = require('pg')

const client = new Client({
    user: "admin",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "todo-app"
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to database ✅');

    const res = await client.query(`SELECT * FROM users WHERE user_email='4adil16@gmail.com'`);
    console.log(res);

    // Update status_updated timestamps for tasks 2-178, randomly between task_created and now
    const updateStatusQuery = `
      UPDATE tasks
      SET status_updated = (
        task_created::TIMESTAMP + 
        -- Random time between task_created and now
        (CURRENT_TIMESTAMP - task_created::TIMESTAMP) * RANDOM()
      )
      WHERE task_id BETWEEN 2 AND 178 
        AND is_deleted = false
        AND task_created IS NOT NULL;
    `;
    
    const updateStatusRes = await client.query(updateStatusQuery);
    console.log(`Updated ${updateStatusRes.rowCount} tasks with new status_updated timestamps ✅`);

  } catch (err) {
    console.error('Database error ❌', err);
  } finally {
    await client.end();
  }
}

run();
