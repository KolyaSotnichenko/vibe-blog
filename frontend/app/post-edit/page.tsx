import { PostEditForm } from '../post-edit-form';

interface PageProps {
  params: { id: string };
}

export default function PostEditPage({ params }: PageProps): React.ReactElement {
  const postId = Number(params.id);
  return <PostEditForm postId={postId} />;
}
