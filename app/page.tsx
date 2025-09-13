export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Community CRT Wiki</h1>
        <a className="underline" href="/submit">Submit CRT</a>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a className="underline" href="https://github.com/ash-hammond/crt-wiki" target="_blank">GitHub Repository</a>
        <a className="underline" href="https://discord.gg/FGwpEpQGKD" target="_blank">Join our discord</a>
      </footer>
    </div>
  );
}
