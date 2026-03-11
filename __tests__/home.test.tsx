import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from '../app/page'
jest.mock('../src/api/posts', () => ({
  getPosts: async () => [{ id: 1, title: 'Post', createdAt: 'now', excerpt: 'text' }],
}))

describe('Home page', () => {
  it('renders posts list', async () => {
    const client = new QueryClient()
    render(
      <QueryClientProvider client={client}>
        <Home />
      </QueryClientProvider>
    )
    expect(await screen.findByText('Post')).toBeInTheDocument()
  })
})
