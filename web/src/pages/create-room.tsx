import { Loader2 } from "lucide-react";
import { CreateRoomForm } from "@/components/create-room";
import { RoomList } from "@/components/room-list";
import { useRooms } from "@/http/use-rooms";

export function CreateRoom() {
  const { data, isLoading } = useRooms();

  return (
    <div className="min-h-screen space-y-4">
      <div className="grid h-screen w-full grid-cols-3 overflow-hidden ">
        <div className="h-full border-r border-r-sidebar-border bg-sidebar p-4 dark:bg-sidebar/25">
          <CreateRoomForm />
        </div>

        {isLoading && (
          <div className="col-span-2 flex h-full w-full items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {data && !isLoading && <RoomList data={data} />}
      </div>
    </div>
  );
}
