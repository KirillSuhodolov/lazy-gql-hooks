# lazy-gql-hooks

Support package to make gql request with react from [lazy-gql](https://github.com/KirillSuhodolov/lazy-gql)

Requires React, Apollo Gql adapter to initialize it at your project

### Initialization

useQueryHook

```
import { gql, useLazyQuery as hook } from '@apollo/client'
import { useState, useEffect } from 'react'
import { buildUseQuery } from 'lazy-gql-hooks'

export const useQuery = buildUseQuery({ gql, hook, useState, useEffect })

```

useMutationHook

```
import { gql, useMutation as hook } from '@apollo/client'
import { useState, useEffect } from 'react'
import { buildUseMutation } from 'lazy-gql-hooks'

export const useMutation = buildUseMutation({ gql, hook, useState, useEffect })

```

### Execution

React component

```
import { buildQuery } from 'lazy-gql'
import { useQuery } from 'hooks/useQuery'

const Users = () => {
  const { data: { users } } = useQuery((buildQuery({
    users: [{
      projects: ['flows']
    }]
  })), {})

  return (
    <>
      {users.map((user) => <>{user.name}</>)}
    </>
  )
}

export default Users
```
