import { compact } from 'ramda-adjunct'
import { gte, is, values, flatten, compose, equals, keys } from 'ramda'
import { wrapToArray } from './array'

const defaultOptions = {
  useSkeleton: true,
}

const prepareSkeleton = ({ loading, called, useSkeleton, skeleton, data }) => {
  if (loading || !called) {
    if (equals(useSkeleton, 'empty')) {
      return keys(skeleton).reduce((acc, key) => ({ ...acc, [key]: [{}] }), {})
    } else if (useSkeleton) {
      return skeleton
    } else {
      return data
    }
  } else {
    return data
  }
}

const deepValues = (args) => {
  if (is(Array, args)) {
    if (args.some(is(Object))) {
      return args.map(deepValues)
    } else {
      return args
    }
  } else if (is(Object, args)) {
    if (values(args).some(is(Object))) {
      return values(args).map(deepValues)
    } else {
      return values(args)
    }
  } else {
    return args
  }
}

export const buildUseMutation = ({ gql, hook, useState }) => (q, _options={}) => {
  const options = { ...defaultOptions, ..._options }
  const [executedVars, setExecutedVars] = useState({})
  const { mutation, variables, skeleton, extendVariablesKeys } = q
  const gqlMutation = gql`${mutation}`
  const [run, { data, loading, error, called }] = hook(gqlMutation, options)
  const { useSkeleton } = options

  return [
    (...args) => {
      const _vars = extendVariablesKeys(variables(...args))
        
      setExecutedVars(_vars)

      return run({ variables: _vars })
    },
    { data: prepareSkeleton({ loading, called, useSkeleton, skeleton, data }), loading, error, called, variables: executedVars, mutation: gqlMutation },
  ]
}

export const buildUseLazyQuery = ({ gql, hook, useState }) => (q, _options={}) => {
  const options = { ...defaultOptions, ..._options }
  const [executedVars, setExecutedVars] = useState({})
  const { query, variables, skeleton, mandatoryVariables, extendVariablesKeys } = q
  const gqlQuery = gql`${query}`
  const [run, { data, previousData, loading, error, called, refetch, variables: usedVars }] = hook(gqlQuery, options)
  const { useSkeleton } = options

  return [
    (...args) => {
      if (gte(compact(args).length, mandatoryVariables || variables.length)) {
        const _vars = extendVariablesKeys(variables(...args))
        
        setExecutedVars(_vars)

        return run({ variables: _vars })
      }
    },
    { data: prepareSkeleton({ loading, called, useSkeleton, skeleton, data }), loading, error, called, refetch, variables: executedVars, query: gqlQuery },
  ]
}

export const buildUseQuery = ({ gql, hook, useState, useEffect }) => (q, args=[], options={}) => {
  const [run, data] = buildUseLazyQuery({ gql, hook, useState })(q, options)

  useEffect(() => {
    !options.skip && run(...wrapToArray(args))
  }, [...compose(flatten, wrapToArray, deepValues)(args), options.skip])

  return data
}




