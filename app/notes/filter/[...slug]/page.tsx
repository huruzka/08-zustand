import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

interface NotePageProps{
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesFilterPage ({params}:NotePageProps) {
    const queryClient = new QueryClient();

  const resolvedParams = await params;
  const tag =
    resolvedParams.slug?.[0] && resolvedParams.slug[0] !== "All"
      ? resolvedParams.slug[0]
      : "";
  
    await queryClient.prefetchQuery({
        queryKey: ['notes', 1, "", tag],
        queryFn: () => fetchNotes({ page:1, query: "",tag}),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
      </HydrationBoundary>
  );
};

