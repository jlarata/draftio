//import Pagination from '@/app/ui/games/pagination';
import Search from '@/app/ui/search';
//import Table from '@/app/ui/games/table';
//import { CreateGame } from '@/app/ui/games/buttons';
import { inter } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Invoices | Acme Dashboard',
};



/* aparentemente searchParams es una API Dinámica, que desde Next15 va a ser asíncronas, por lo que venía tirando un error
y una amenaza de dejar de funcionar : https://nextjs.org/docs/messages/sync-dynamic-apis
increíblemente, todo indica que con solo cambiarle el nombre a la prop que se le está pasando a esta page (creo que
solo desde Search )  se arregló el problema */

export default async function Page({
  searchParams,
} : {
  searchParams?: {
    query?: string;
    page?: string;
  };}){


  //const query = searchParams?.query || '';
  
  return(
    <div>component broken</div>
  )
}

/* export default async function Page({
  searchParams,
} : {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateGame />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
} */