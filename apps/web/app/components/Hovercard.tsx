
import { Button } from "@ui/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ui/components/ui/hover-card"

export function HoverCardDemo(props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@Total</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-40">
        <div className="flex justify-between space-x-4">

          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Total Summary</h4>
            <p className="text-sm">
              Attended {props.one}
            </p>
            <p className="text-sm">
            Absent {props.two}

            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
