import Link from "next/link";

export default async function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="font-bold text-2xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral das suas finanças</p>
        </div>
        <Link href="/authentication" className="">
          Login Page
        </Link>
        <Link href="/app" className="">
          App Page
        </Link>
      </div>
    </main>
  );
}
