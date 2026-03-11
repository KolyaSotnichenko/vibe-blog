import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostsList } from './posts-list';
import { ApiClient } from '../src/api/apiClient';

const createApiClient = (overrides?: Partial<ApiClient>): ApiClient => {
  return {
    getPosts: jest.fn(),
    deletePost: jest.fn(),
    ...overrides,
  } as unknown as ApiClient;
};

describe('PostsList page behavior', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('shows loading state while posts are being fetched', async () => {
    const apiClient = createApiClient({
      getPosts: jest.fn(() => new Promise(() => {})),
    });

    render(<PostsList apiClient={apiClient} />);

    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  it('renders posts list on successful load', async () => {
    const apiClient = createApiClient({
      getPosts: jest.fn().mockResolvedValue([{ id: 1, title: 'Test post' }]),
    });

    render(<PostsList apiClient={apiClient} />);

    expect(await screen.findByText('Пости')).toBeInTheDocument();
    expect(await screen.findByText('Test post')).toBeInTheDocument();
  });

  it('shows empty state when no posts are returned', async () => {
    const apiClient = createApiClient({
      getPosts: jest.fn().mockResolvedValue([]),
    });

    render(<PostsList apiClient={apiClient} />);

    expect(await screen.findByText('Пости відсутні')).toBeInTheDocument();
  });

  it('shows error message when loading posts fails', async () => {
    const apiClient = createApiClient({
      getPosts: jest.fn().mockRejectedValue(new Error('Network error')),
    });

    render(<PostsList apiClient={apiClient} />);

    expect(await screen.findByText('Не вдалося завантажити список постів')).toBeInTheDocument();
  });

  it('removes post from list after successful deletion', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    const deletePost = jest.fn().mockResolvedValue(undefined);
    const apiClient = createApiClient({
      getPosts: jest.fn().mockResolvedValue([{ id: 1, title: 'Test post' }]),
      deletePost,
    });

    render(<PostsList apiClient={apiClient} />);

    fireEvent.click(await screen.findByText('Видалити'));

    await waitFor(() => expect(deletePost).toHaveBeenCalledWith(1));
    expect(await screen.findByText('Пости відсутні')).toBeInTheDocument();
  });

  it('shows error message when deleting a post fails', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    const apiClient = createApiClient({
      getPosts: jest.fn().mockResolvedValue([{ id: 1, title: 'Test post' }]),
      deletePost: jest.fn().mockRejectedValue(new Error('Delete failed')),
    });

    render(<PostsList apiClient={apiClient} />);

    fireEvent.click(await screen.findByText('Видалити'));

    expect(await screen.findByText('Не вдалося видалити пост')).toBeInTheDocument();
  });
});
