const db = require('./db');

function checkForOverwork() {
    const query = `
        SELECT Employee_ID, SUM(hours_worked) AS total_hours
        FROM Work_Records
        WHERE week = CURRENT_WEEK
        GROUP BY Employee_ID
        HAVING total_hours > 40;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return;
        }
        
        results.forEach(employee => {
            sendNotification(employee.Employee_ID, `Employee ${employee.Employee_ID} has exceeded 40 hours this week.`);
        });
    });
}

function sendNotification(employeeId, message) {
    console.log(`Alert for Manager: ${message}`);
}

module.exports = { checkForOverwork };
