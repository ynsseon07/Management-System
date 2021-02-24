module.exports = {
    user : process.env.NODE_ORACLEDB_USER || "ynsseon",
    password : process.env.NODE_ORACLEDB_PASSWORD || "ynsseon",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/xe"
}