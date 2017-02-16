let config = {
	portDB: 27017,
	databaseName: "templateExpress",
	facebook: {
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENTSECRET,
	}
}

module.exports = config
