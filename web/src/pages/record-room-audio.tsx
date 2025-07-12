/* biome-ignore-all lint/suspicious/noConsole: we ball */
import { ArrowLeft, Mic } from "lucide-react";
import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { constants } from "@/constants";

interface RecordingNotSupportedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function RecordingNotSupportedDialog({
  open,
  onOpenChange,
}: RecordingNotSupportedDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recording Not Supported</AlertDialogTitle>
          <AlertDialogDescription>
            Your browser does not support audio recording.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

export function RecordRoomAudio() {
  const { id } = useParams<{ id: string }>();

  const [isRecording, setIsRecording] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);

  if (!id) {
    return <Navigate replace to="/create-room" />;
  }
  async function startRecording() {
    if (!isRecordingSupported) {
      setIsDialogOpen(true);
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    recorderRef.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorderRef.current.start();
  }

  function stopRecording() {
    setIsRecording(false);

    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
  }

  async function uploadAudio(audioBlob: Blob) {
    const formData = new FormData();

    formData.append("file", audioBlob, "audio.webm");

    const res = await fetch(`${constants.SERVER_URL}/rooms/${id}/audio`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Failed to upload audio");
    }

    const data = await res.json();
    console.log("Audio uploaded successfully:", data);
  }

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center">
      <RecordingNotSupportedDialog
        onOpenChange={setIsDialogOpen}
        open={isDialogOpen}
      />
      <Link to={`/room/${id}`}>
        <Button
          className="absolute top-4 left-4 cursor-pointer"
          variant="outline"
        >
          <ArrowLeft className="mr-2" />
          Back
        </Button>
      </Link>
      <h1 className="font-semibold text-3xl">Record Room Audio</h1>
      <p className="text-muted-foreground text-xs">
        This page will allow you to record audio for a room.
      </p>

      {isRecording && (
        <div className="mt-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Mic className="size-6 animate-pulse duration-5" />
        </div>
      )}

      {isRecording ? (
        <Button className="mt-4" onClick={stopRecording} size="sm">
          Stop Recording
        </Button>
      ) : (
        <Button className="mt-4" onClick={startRecording} size="sm">
          Start Recording
        </Button>
      )}
    </main>
  );
}
