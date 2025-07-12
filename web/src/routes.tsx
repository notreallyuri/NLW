import { createBrowserRouter } from "react-router";
import { CreateRoom } from "./pages/create-room";
import { Home } from "./pages/home";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Room } from "./pages/room";

export const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Home />,
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
  {
    path: "/create-room",
    element: <CreateRoom />,
  },
  {
    path: "/room/:id/audio",
    element: <RecordRoomAudio />,
  },
]);
