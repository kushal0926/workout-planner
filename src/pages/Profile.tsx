import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Calendar, Dumbbell, RefreshCcw, Target, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/Card";
import { PlanDisplay } from "../components/layout/PlanDisplay";

export default function Profile() {
  const { user, isLoading, plan, generatePlan } = useAuth();

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (!plan) {
    return <Navigate to="/onboarding" replace />;
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 ">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1 text-accent">Your Training Plan</h1>
            <p className="text-muted font-medium">
              Version {plan.version} • Created {formatDate(plan.createdAt)}
            </p>
          </div>

          <Button variant="secondary" className="gap-2" onClick={async () => await generatePlan()}>
            <RefreshCcw className="w-5 h-5 text-accent" />
            Regenerate Plan
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl text-muted font-medium">Goal</p>
              <p className="font-medium text-sm text-cream">{plan.overview.goal}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl text-muted font-medium">Frequency</p>
              <p className="font-medium text-sm text-cream">{plan.overview.frequency}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-medium text-muted">Split</p>
              <p className="font-medium text-sm text-cream">{plan.overview.split}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-medium text-muted">Version</p>
              <p className="font-medium text-sm text-cream">{plan.version}</p>
            </div>
          </Card>
        </div>

        {/* Plan notes */}
        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2 text-accent">Workout Notes</h2>
          <p className="text-cream font-medium text-xl leading-relaxed">{plan.overview.notes}</p>
        </Card>

        {/* Weekly Schedule */}
        <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2 text-accent">Progression Strategy</h2>
          <p className="text-cream font-medium text-xl leading-relaxed">{plan.progression}</p>
        </Card>
      </div>
    </div>
  );
}
