import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateRoom } from "@/http/use-create-room";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const createRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  description: z
    .string()
    .max(300, "Description must be 300 characters or less")
    .optional(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateRoom(data: CreateRoomFormData) {
    try {
      await createRoom(data);
      createRoomForm.reset();
    } catch (error) {
      toast.error("Failed to create room. Please try again.", {
        description: (error as Error).message,
      });
    }
  }

  const {
    formState: { errors },
  } = createRoomForm;

  return (
    <div>
      <div>
        <h1 className="font-semibold text-4xl">Create Room</h1>
        <p className="text-muted-foreground text-sm">
          Create a new room to start chatting.
        </p>
      </div>
      <Form {...createRoomForm}>
        <form
          className="mt-4 space-y-4"
          onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
        >
          <FormField
            control={createRoomForm.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel
                    className={cn("font-medium", errors.name && "text-red-500")}
                  >
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      placeholder="Enter room name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={createRoomForm.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "font-medium",
                      errors.description && "text-red-500"
                    )}
                  >
                    Description{" "}
                    <span
                      className={"font-normal text-muted-foreground text-xs"}
                    >
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-30 bg-background"
                      placeholder="Enter room description"
                      {...field}
                      maxLength={300}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button size="sm" type="submit">
            Create Room
          </Button>
        </form>
      </Form>
    </div>
  );
}
