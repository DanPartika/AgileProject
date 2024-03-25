const patients = require('./data/patients');

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    try{
        
    }catch(e){
        console.log(e);
    }

    await connection.closeConnection();
}

main();