import NavLink from "@/components/NavLink";

export default function Home() {
  return (
    <div>
      <h1>Community CRT Wiki</h1>

      <p>Welcome to the Community CRT Wiki. Here you can find information about CRT TVs and how to repair them.</p>
      <p>Be sure to check out the <NavLink href="/crt">CRT List</NavLink> to find out more about the CRTs we have on record.</p>
    </div>
  );
}
