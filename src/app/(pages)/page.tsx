import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex-1 overflow-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-medium">
                Plataforma de gestão financeira
              </span>
            </div>

            <h1 className="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text font-bold text-5xl text-transparent sm:text-6xl lg:text-7xl">
              Gerencie suas finanças de forma inteligente
            </h1>

            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Controle suas despesas, acompanhe investimentos em tempo real e
              alcance seus objetivos financeiros com dashboards intuitivos e
              análises detalhadas.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/authentication">
                  Começar gratuitamente
                  <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl sm:text-4xl">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-lg text-muted-foreground">
              Ferramentas poderosas para controle financeiro completo
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-green-500/5 text-3xl">
                💰
              </div>
              <h3 className="mb-3 font-bold text-xl">Controle de Gastos</h3>
              <p className="text-muted-foreground">
                Registre e categorize suas transações automaticamente. Visualize
                para onde seu dinheiro está indo com gráficos claros.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-3xl">
                📈
              </div>
              <h3 className="mb-3 font-bold text-xl">Gestão de Portfólio</h3>
              <p className="text-muted-foreground">
                Acompanhe ações, cryptomoedas e outros investimentos. Dados em
                tempo real e análise de desempenho completa.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-3xl">
                📊
              </div>
              <h3 className="mb-3 font-bold text-xl">Relatórios Detalhados</h3>
              <p className="text-muted-foreground">
                Insights automáticos sobre seus hábitos financeiros. Identifique
                oportunidades de economia e otimização.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-3xl">
                🎯
              </div>
              <h3 className="mb-3 font-bold text-xl">Metas Financeiras</h3>
              <p className="text-muted-foreground">
                Defina objetivos e acompanhe seu progresso. Planeje compras,
                viagens e economias de longo prazo.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-500/5 text-3xl">
                📅
              </div>
              <h3 className="mb-3 font-bold text-xl">Calendário Financeiro</h3>
              <p className="text-muted-foreground">
                Nunca perca uma data de pagamento. Organize suas contas e receba
                lembretes inteligentes.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 text-3xl">
                🔒
              </div>
              <h3 className="mb-3 font-bold text-xl">Segurança Total</h3>
              <p className="text-muted-foreground">
                Seus dados protegidos com criptografia de ponta. Autenticação
                segura e backup automático.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-8 py-16 text-center sm:px-16">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
            <div className="relative">
              <h2 className="mb-4 font-bold text-3xl text-primary-foreground sm:text-4xl">
                Pronto para assumir o controle?
              </h2>
              <p className="mb-8 text-lg text-primary-foreground/90">
                Junte-se a milhares de usuários que já transformaram suas
                finanças
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-semibold"
              >
                <Link href="/authentication">
                  Criar conta gratuita
                  <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
