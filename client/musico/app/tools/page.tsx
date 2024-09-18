import Link from 'next/link';
export default function ToolPage() {
    return (
    <div className="min-h-screen">
    <main className="container mx-auto p-4 ">
        <h1 className="text-5xl font-bold mt-6 mb-6 w-full text-center">Music Tools</h1>
        <div className="flex w-full flex-col lg:flex-row justify-center">
        <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
            alt="Album" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Metronome</h2>
            <p>Click the button to listen on Spotiwhy app.</p>
            <div className="card-actions justify-end">
            <Link className="btn btn-primary" href="./tools/metronome">
                    Try it!
            </Link>
            </div>
        </div>
        </div>
        <div className="divider lg:divider-horizontal">🎧</div>
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                alt="Album" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Tuner</h2>
                <p>Click the button to listen on Spotiwhy app.</p>
                <div className="card-actions justify-end">
                <Link className="btn btn-primary" href="./tools/tuner">
                    Try it!
                </Link>
                </div>
            </div>
            </div>
</div>
    </main>
    </div>
);
}
