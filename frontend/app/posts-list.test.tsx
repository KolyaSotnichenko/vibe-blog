import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostsList } from './posts-list';
import { ApiClient } from '../src/api/apiClient';

jest.mock('../src/api/apiClient');

const mockPosts = [{ id: 1, title: 'Test post' }];

describe('PostsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders recent posts list', async () => {
    (ApiClient as jest.Mock).mockImplementation(() => ({
      getPosts: jest.fn().mockResolvedValue(mockPosts),
      deletePost: jest.fn(),
    }));

    render(<PostsList apiClient={new (ApiClient as jest.Mock)()} />);

    expect(await screen.findByText('Recent posts')).toBeInTheDocument();
    expect(await screen.findByText('Test post')).toBeInTheDocument();
  });

  it('allows deleting a post', async () => {
    const deletePost = jest.fn().mockResolvedValue(undefined);
    (ApiClient as jest.Mock).mockImplementation(() => ({
      getPosts: jest.fn().mockResolvedValue(mockPosts),
      deletePost,
    }));

    window.confirm = jest.fn().mockReturnValue(true);

    render(<PostsList apiClient={new (ApiClient as jest.Mock)()} />);

    const deleteButton = await screen.findByText('Видалити');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(deletePost).toHaveBeenCalledWith(1));
  });
});
