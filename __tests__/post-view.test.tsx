import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostPage from '../app/posts/[id]/page'
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '0' }),
}))
jest.mock('../src/api/posts', () => ({
  getPostById: async () => null,
}))

describe('Post view page', () => {
  it('handles missing post gracefully', async () => {
    const client = new QueryClient()
    // @ts-expect-error params injected by Next
    render(
      <QueryClientProvider client={client}>
        <PostPage params={{ id: '0' }} />
      </QueryClientProvider>
    )
    expect(await screen.findByText(/Пост не знайдено/i)).toBeInTheDocument()
  })
})
