import { Link } from "@inertiajs/react";

type ErrorCode = 503 | 500 | 404 | 403;

interface ErrorPageProps {
  status: ErrorCode;
}

export default function ErrorPage({ status }: ErrorPageProps) {
  console.log(status);

  const title: string =
    {
      503: '503: Service Unavailable',
      500: '500: Server Error',
      404: '404: Page Not Found',
      403: '403: Forbidden',
    }[status] || 'Unknown Error';

  const description: string =
    {
      503: 'Sorry, we are doing some maintenance. Please check back soon.',
      500: 'Whoops, something went wrong on our servers.',
      404: 'Sorry, the page you are looking for could not be found.',
      403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'An unexpected error occurred.';

    return (
      <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="animate-bounce text-4xl font-bold tracking-tighter sm:text-5xl">{status}</h1>
            <p className="text-gray-500">{description}</p>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:ring-1 focus-visible:ring-gray-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Return to website
          </Link>
        </div>
      </div>
    );
}
