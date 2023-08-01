import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../apps/api/src/schema.gql',
  watch: true,
  generates: {
    './src/generated/index.tsx': {
      documents: './src/**/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'named-operations-object',
        'typescript-react-apollo',
      ],
      config: {
        avoidOptionals: false,
        exposeQueryKeys: true,
        fetcher: {
          endpoint: process.env.NEXT_PUBLIC_API_URL + '/graphql',
        },
        pureMagicComment: true,
      },
    },
    '../../apps/api/prisma/seed/generated/': {
      documents: '../../apps/api/**/*.graphql',
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
