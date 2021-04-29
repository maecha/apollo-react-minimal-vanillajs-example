// ApolloServerをrequire
const { ApolloServer } = require("apollo-server");
// schemaをrequire
const typeDefs = require('./schema');
// resolverをrequire
const resolvers = require('./resolver')
// Userモデルをrequire
const User = require('./db/models/User');
// データベースとの接続インスタンスをrequire
const { getDB } = require('./db');

const boot = async () => {
	const store = await getDB();
	const server = new ApolloServer({
		cors: {
			origin: '*',
			credentials: true,
		},
		typeDefs,
		resolvers,
		dataSources: () => ({
			User: new User({ store })
		}),
	});
	// 指定ポートでの待受開始
	server.listen().then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`);
	});
}

boot();
