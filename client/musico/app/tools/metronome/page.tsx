import Metronome from "../../../components/Metronome";

export default function MetronomePage() {
    return (
    <div className="min-h-screen bg-beige-100">
    <main className="container mx-auto p-4">
        <h1 className="text-5xl font-bold mt-6 mb-10 w-full text-center">Metronome</h1>
        <Metronome />
    </main>
    </div>
);
}
