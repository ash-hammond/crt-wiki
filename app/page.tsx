export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Community CRT Wiki</h1>
        <ol className="list-decimal">
          <li><a className="underline" href="https://discord.gg/FGwpEpQGKD" target="_blank">Join our discord</a></li>
          <li>
            <a className="underline" href="https://docs.google.com/document/d/1fm_1GCBCUSzVkF3bIC8yHQ1HBPrJ3-PUr_1Qhzi-l9Q/edit?tab=t.0" target="_blank">Copy the article submission template</a>
          </li>
          <li>
            <a className="underline" href="https://forms.gle/6pDeEcA1TzztCZQr9" target="_blank">Submit your article to the Google Form</a>
          </li>
        </ol>
      </main>
    </div>
  );
}
