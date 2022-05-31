const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const axios = require("axios");

// const customers = [
//   { id: "1", name: "J Doe", age: 25, email: "j_doe@gmail.com" },
//   { id: "2", name: "M Amir", age: 25, email: "m_amir@gmail.com" },
//   { id: "3", name: "M Ahmad", age: 35, email: "m_ahmad@gmail.com" },
// ];

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parentValue, args) => {
        const { data } = await axios.get(
          `http://localhost:3001/customers/${args.id}`
        );
        return data;
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id === args.id) {
        //     return customers[i];
        //   }
        // }
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve: async () => {
        // return customers;
        const { data } = await axios.get(`http://localhost:3001/customers`);
        return data;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parentValue, args) => {
        const { data } = await axios.post(`http://localhost:3001/customers`, {
          name: args.name,
          age: args.age,
          email: args.email,
        });
        return data;
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parentValue, args) => {
        const { data } = await axios.delete(
          `http://localhost:3001/customers/${args.id}`
        );
        return data;
      },
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: async (parentValue, args) => {
        const { data } = await axios.patch(
          `http://localhost:3001/customers/${args.id}`,
          args
        );
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
