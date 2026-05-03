export default function Loading() {
  return (
    <main className="min-h-screen p-8 pb-20">
      <section className="mt-32 mb-10 h-64 rounded-lg bg-slate-200 shadow-lg animate-pulse dark:bg-slate-800 md:h-80" />

      <div className="mx-auto max-w-7xl px-4 space-y-24">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <section key={sectionIndex} className="w-full">
            <div className="mb-8 h-9 w-56 rounded-md bg-slate-200 animate-pulse dark:bg-slate-800" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="flex min-h-105 flex-col rounded-2xl border border-gray-100 bg-slate-200 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  key={index}
                >
                  <div className="mb-4 h-48 w-full rounded-xl bg-white animate-pulse dark:bg-slate-800" />
                  <div className="mb-3 h-5 w-20 rounded bg-blue-100 animate-pulse dark:bg-blue-900/30" />
                  <div className="mb-2 h-4 w-3/4 rounded bg-slate-300 animate-pulse dark:bg-slate-700" />
                  <div className="h-4 w-1/2 rounded bg-slate-300 animate-pulse dark:bg-slate-700" />
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4 dark:border-slate-800">
                    <div className="h-6 w-20 rounded bg-slate-300 animate-pulse dark:bg-slate-700" />
                    <div className="h-9 w-16 rounded-lg bg-slate-300 animate-pulse dark:bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
