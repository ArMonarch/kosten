import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ArrowRight, PieChart, WalletMinimal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <WalletMinimal className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-black"><Link href="/">ExpenseTrack</Link></span>
          </div>
          <div className="flex items-center">
            <Link href="/auth/login">
              <Button variant="outline" size="default" className="rounded-l-xl hover:bg-primary!">Login</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="default" className="rounded-r-xl hover:bg-primary!">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="container mx-auto px-6 py-20">
        {/* Main Slogan */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Take Control of Your
            <span className="text-primary"> Finances</span>
          </h1>
          <p className="text-xl text-black mb-12 max-w-2xl mx-auto">
            Track expenses, manage budgets, and gain insights into your spending habits with our simple and intuitive expense tracker.
          </p>

          <Link href="/auth/signup">
            <Button variant="link" className="text-2xl">
              <p>Get Started</p>
              <ArrowRight />
            </Button>
          </Link>
        </div>

        {/* Features List */}
        <div className="grid md:grid-cols-2 gap-8 mt-24 max-w-2xl mx-auto">
          <Card className="bg-background p-8">
            <div className="w-12 h-12 bg-primary/60 rounded-lg flex items-center justify-center mb-4">
              <WalletMinimal className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Easy Tracking
            </h3>
            <p className="text-black">
              Quickly log your daily expenses and categorize them with just a few clicks.
            </p>
          </Card>

          <Card className="bg-background p-8">
            <div className="w-12 h-12 bg-primary/60 rounded-lg flex items-center justify-center mb-4">
              <PieChart className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              Visual Insights
            </h3>
            <p className="text-black">
              See where your money goes with clear charts and detailed breakdowns.
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-6">
        <div className="text-center text-black">
          <p>
            &copy; 2026 <span className="text-primary">Kosten</span>.
            All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
