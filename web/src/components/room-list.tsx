import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { GetRoomsResponse } from "@/http/types";
import { dayjs } from "@/lib/dayjs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export function RoomList({ data }: { data: GetRoomsResponse }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    setSearchParams(params, { replace: true });
  }, [search, searchParams, setSearchParams]);

  const filteredRooms = data.filter(
    (room) =>
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      (room.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <div className="col-span-2 overflow-y-auto">
      <div className="sticky top-0 flex justify-between bg-background p-4">
        <div>
          <h1 className="font-semibold text-4xl">Rooms</h1>
          <p className="text-muted-foreground text-sm">
            Access your rooms below. Click on a room to join.
          </p>
        </div>
        <Input
          className="w-64"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search rooms..."
          value={search}
        />
      </div>

      <div className="flex w-full flex-col gap-4 p-4">
        {filteredRooms.map((room) => (
          <Card key={room.id}>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge className="text-xs" variant="secondary">
                  <b>{room.questionsCount}</b> Questions
                </Badge>
                <Badge className="text-xs" variant="secondary">
                  <b>Created at:</b>{" "}
                  {dayjs(room.createdAt).format("DD/MM/YYYY HH:mm")}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="justify-end">
              <Link to={`/room/${room.id}`}>
                <Button size="sm">Access Room</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
