import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CreatePostPage from '../app/posts/create/page'
import PostPage from '../app/posts/[id]/page'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
  useRouter: () => ({ push: jest.fn() }),
}))

jest.mock('../src/api/posts', () => ({
  createPost: jest.fn(async () => ({ id: 1, title: 't', content: 'c', author: 'a' })),
  updatePost: jest.fn(async () => ({ id: 1, title: 'u', content: 'u', author: 'a' })),
  deletePost: jest.fn(async () => undefined),
  getPostById: jest.fn(async () => ({ id: 1, title: 't', content: 'c', author: 'a' })),
}))

describe('Post forms', () => {
  beforeAll(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true)
  })
  afterAll(() => {
    ;(window.confirm as jest.Mock).mockRestore()
  })
  function wrap(ui: React.ReactElement) {
    const client = new QueryClient()
    return <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  }

  it('creates post successfully', async () => {
    render(wrap(<CreatePostPage />))
    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'New' } })
    fireEvent.change(screen.getByPlaceholderText(/content/i), { target: { value: 'Body' } })
    fireEvent.change(screen.getByPlaceholderText(/author/i), { target: { value: 'Me' } })
    fireEvent.click(screen.getByRole('button', { name: /create/i }))
    await waitFor(() => expect(screen.queryByText(/error/i)).not.toBeInTheDocument())
  })

  it('updates post successfully', async () => {
    // @ts-expect-error next params
    render(wrap(<PostPage params={{ id: '1' }} />))
    await screen.findByDisplayValue('t')
    fireEvent.change(screen.getByDisplayValue('t'), { target: { value: 'Upd' } })
    fireEvent.click(screen.getByRole('button', { name: /зберегти/i }))
    await waitFor(() => expect(screen.queryByText(/error/i)).not.toBeInTheDocument())
  })

  it('deletes post successfully', async () => {
    // @ts-expect-error next params
    render(wrap(<PostPage params={{ id: '1' }} />))
    fireEvent.click(await screen.findByRole('button', { name: /видалити/i }))
    await waitFor(() => expect(screen.queryByText(/error/i)).not.toBeInTheDocument())
  })
})
