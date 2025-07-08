import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type GetRoomsAPIResponse = Array<{
  id: string;
  name: string;
  questionsCount: number;
  createdAt: string;
}>;

export function CreateRoom() {
  const [isOpen, setIsOpen] = React.useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      return (await fetch("http://localhost:3333/rooms").then((res) =>
        res.json()
      )) as GetRoomsAPIResponse;
    },
  });

  return (
    <div className="min-h-screen space-y-4 p-4 px-4 py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create Room</CardTitle>
              <CardDescription>
                Create a new room to start chatting.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-end">
              <Button>Create Room</Button>
            </CardFooter>
          </Card>
        </div>

        {isLoading && <p>Loading...</p>}

        {data && (
          <Card>
            <CardHeader>
              <CardTitle>Rooms</CardTitle>
              <CardDescription>
                Access your rooms below. Click on a room to join.
              </CardDescription>
            </CardHeader>
            <Collapsible onOpenChange={setIsOpen} open={isOpen}>
              <CollapsibleTrigger asChild>
                <CardContent className="flex justify-end">
                  <Button onClick={() => setIsOpen(!isOpen)} variant="link">
                    Show More{" "}
                    <ArrowDown
                      className={cn("transition-transform duration-150", {
                        "-rotate-180": isOpen,
                      })}
                    />
                  </Button>
                </CardContent>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <CardFooter className="w-full flex-col items-start gap-2">
                  {data.map((room) => (
                    <Link
                      className="w-full"
                      key={room.id}
                      to={`/room/${room.id}`}
                    >
                      <div className="flex items-center justify-between rounded-lg border p-2 transition-colors duration-75 hover:bg-border/25">
                        <p className="text-sm">{room.name}</p>
                        <ArrowRight className="size-3" />
                      </div>
                    </Link>
                  ))}
                </CardFooter>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}
      </div>
    </div>
  );
}
