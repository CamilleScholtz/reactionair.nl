//@ts-nocheck
// DO NOT MODIFY THIS FILE. This file is automatically generated by Tina
import { gql } from 'tinacms';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  filename: Scalars['String'];
  basename: Scalars['String'];
  breadcrumbs: Array<Scalars['String']>;
  path: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  template: Scalars['String'];
  collection: Collection;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: InputMaybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Document = {
  sys?: Maybe<SystemInfo>;
  id: Scalars['ID'];
  form: Scalars['JSON'];
  values: Scalars['JSON'];
};

/** A relay-compliant pagination connection */
export type Connection = {
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getOptimizedQuery?: Maybe<Scalars['String']>;
  getCollection: Collection;
  getCollections: Array<Collection>;
  node: Node;
  getDocument: DocumentNode;
  getDocumentList: DocumentConnection;
  getDocumentFields: Scalars['JSON'];
  getArtikelenDocument: ArtikelenDocument;
  getArtikelenList: ArtikelenConnection;
};


export type QueryGetOptimizedQueryArgs = {
  queryString: Scalars['String'];
};


export type QueryGetCollectionArgs = {
  collection?: InputMaybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetDocumentArgs = {
  collection?: InputMaybe<Scalars['String']>;
  relativePath?: InputMaybe<Scalars['String']>;
};


export type QueryGetDocumentListArgs = {
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryGetArtikelenDocumentArgs = {
  relativePath?: InputMaybe<Scalars['String']>;
};


export type QueryGetArtikelenListArgs = {
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DocumentNode>;
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
};

export type Collection = {
  __typename?: 'Collection';
  name: Scalars['String'];
  slug: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  fields?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  documents: DocumentConnection;
};


export type CollectionDocumentsArgs = {
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Float']>;
  last?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
};

export type DocumentNode = ArtikelenDocument;

export type Artikelen = {
  __typename?: 'Artikelen';
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  auteurs?: Maybe<Array<Maybe<Scalars['String']>>>;
  themas?: Maybe<Array<Maybe<Scalars['String']>>>;
  draft?: Maybe<Scalars['Boolean']>;
  body?: Maybe<Scalars['String']>;
};

export type ArtikelenDocument = Node & Document & {
  __typename?: 'ArtikelenDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Artikelen;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type ArtikelenConnectionEdges = {
  __typename?: 'ArtikelenConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<ArtikelenDocument>;
};

export type ArtikelenConnection = Connection & {
  __typename?: 'ArtikelenConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<ArtikelenConnectionEdges>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  updateDocument: DocumentNode;
  deleteDocument: DocumentNode;
  createDocument: DocumentNode;
  updateArtikelenDocument: ArtikelenDocument;
  createArtikelenDocument: ArtikelenDocument;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  template?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateDocumentArgs = {
  collection?: InputMaybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationDeleteDocumentArgs = {
  collection?: InputMaybe<Scalars['String']>;
  relativePath: Scalars['String'];
};


export type MutationCreateDocumentArgs = {
  collection?: InputMaybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationUpdateArtikelenDocumentArgs = {
  relativePath: Scalars['String'];
  params: ArtikelenMutation;
};


export type MutationCreateArtikelenDocumentArgs = {
  relativePath: Scalars['String'];
  params: ArtikelenMutation;
};

export type DocumentMutation = {
  artikelen?: InputMaybe<ArtikelenMutation>;
};

export type ArtikelenMutation = {
  title?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  auteurs?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  themas?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  body?: InputMaybe<Scalars['String']>;
};

export type ArtikelenPartsFragment = { __typename?: 'Artikelen', title?: string | null, subtitle?: string | null, date?: string | null, auteurs?: Array<string | null> | null, themas?: Array<string | null> | null, draft?: boolean | null, body?: string | null };

export type GetArtikelenDocumentQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type GetArtikelenDocumentQuery = { __typename?: 'Query', getArtikelenDocument: { __typename?: 'ArtikelenDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Artikelen', title?: string | null, subtitle?: string | null, date?: string | null, auteurs?: Array<string | null> | null, themas?: Array<string | null> | null, draft?: boolean | null, body?: string | null } } };

export type GetArtikelenListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArtikelenListQuery = { __typename?: 'Query', getArtikelenList: { __typename?: 'ArtikelenConnection', totalCount: number, edges?: Array<{ __typename?: 'ArtikelenConnectionEdges', node?: { __typename?: 'ArtikelenDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Artikelen', title?: string | null, subtitle?: string | null, date?: string | null, auteurs?: Array<string | null> | null, themas?: Array<string | null> | null, draft?: boolean | null, body?: string | null } } | null } | null> | null } };

export const ArtikelenPartsFragmentDoc = gql`
    fragment ArtikelenParts on Artikelen {
  title
  subtitle
  date
  auteurs
  themas
  draft
  body
}
    `;
export const GetArtikelenDocumentDocument = gql`
    query getArtikelenDocument($relativePath: String!) {
  getArtikelenDocument(relativePath: $relativePath) {
    sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    id
    data {
      ...ArtikelenParts
    }
  }
}
    ${ArtikelenPartsFragmentDoc}`;
export const GetArtikelenListDocument = gql`
    query getArtikelenList {
  getArtikelenList {
    totalCount
    edges {
      node {
        id
        sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        data {
          ...ArtikelenParts
        }
      }
    }
  }
}
    ${ArtikelenPartsFragmentDoc}`;
export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
  export function getSdk<C>(requester: Requester<C>) {
    return {
      getArtikelenDocument(variables: GetArtikelenDocumentQueryVariables, options?: C): Promise<{data: GetArtikelenDocumentQuery, variables: GetArtikelenDocumentQueryVariables, query: string}> {
        return requester<{data: GetArtikelenDocumentQuery, variables: GetArtikelenDocumentQueryVariables, query: string}, GetArtikelenDocumentQueryVariables>(GetArtikelenDocumentDocument, variables, options);
      },
    getArtikelenList(variables?: GetArtikelenListQueryVariables, options?: C): Promise<{data: GetArtikelenListQuery, variables: GetArtikelenListQueryVariables, query: string}> {
        return requester<{data: GetArtikelenListQuery, variables: GetArtikelenListQueryVariables, query: string}, GetArtikelenListQueryVariables>(GetArtikelenListDocument, variables, options);
      }
    };
  }
  export type Sdk = ReturnType<typeof getSdk>;

// TinaSDK generated code
import { staticRequest } from 'tinacms'
const requester: (doc: any, vars?: any, options?: any) => Promise<any> = async (
  doc,
  vars,
  _options
) => {
  let data = {}
  try {
    data = await staticRequest({
      query: doc,
      variables: vars,
    })
  } catch (e) {
    // swallow errors related to document creation
    console.warn('Warning: There was an error when fetching data')
    console.warn(e)
  }

  return { data, query: doc, variables: vars || {} }
}

/**
 * @experimental this class can be used but may change in the future
 **/
export const ExperimentalGetTinaClient = ()=>getSdk(requester)

