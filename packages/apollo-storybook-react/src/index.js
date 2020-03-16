import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import createClient from 'apollo-storybook-core';

export default function initializeApollo({
  typeDefs,
  mocks,
  Provider = ApolloProvider,
  apolloLinkOptions = {},
  apolloClientOptions = {},
  links,
  typeResolvers,
  context = {},
  rootValue = {},
  // cacheOptions is a necessary config parameter because some use cases will require a pre-configured
  // fragmentMatcher such as IntrospectionFragmentMatcher, etc.
  cacheOptions = {},
  resolverValidationOptions,
}) {
  const graphqlClient = createClient({
    mocks,
    apolloLinkOptions,
    apolloClientOptions,
    typeResolvers,
    typeDefs,
    rootValue,
    context,
    links,
    cacheOptions,
    resolverValidationOptions,
  });

  function StorybookProvider({ children }) {
    return (
      <Provider client={graphqlClient}>
        <ApolloHooksProvider client={graphqlClient}>
          <Fragment>{children}</Fragment>
        </ApolloHooksProvider>
      </Provider>
    );
  }

  return story => {
    return <StorybookProvider>{story()}</StorybookProvider>;
  };
}
