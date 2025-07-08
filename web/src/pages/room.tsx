import { useParams, Navigate } from "react-router";

type RoomParams = {
  id: string;
};

export function Room() {
  const { id } = useParams<RoomParams>();

  if (!id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      <h1>Room Details</h1>
      <p>Room ID: {id}</p>
    </div>
  );
}
