import { CalendarDays, MapPin, ClipboardList, CheckCircle } from 'lucide-react'

interface Step {
  number: number
  title: string
  icon: typeof CalendarDays
}

interface ProgressStepsProps {
  step: number
  steps: Step[]
}

export function ProgressSteps({ step, steps }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((s) => (
          <div
            key={s.number}
            className={`flex flex-col items-center ${
              step >= s.number ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step >= s.number ? 'border-primary bg-primary/10' : 'border-muted-foreground'
              }`}
            >
              <s.icon className="h-5 w-5" />
            </div>
            <span className="mt-2 hidden text-sm md:block">{s.title}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-4">
        <div className="absolute h-1 w-full bg-muted" />
        <div
          className="absolute h-1 bg-primary transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        />
      </div>
    </div>
  )
}

