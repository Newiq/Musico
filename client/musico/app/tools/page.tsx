import Link from 'next/link';
import Image from 'next/image';
import TunerImage from '../../assets/images/Electric-Guitar-Tuning.webp';
import MetronomeImage from '../../assets/images/metronome.jpg';

export default function ToolPage() {
    return (
        <div className="min-h-screen">
            <main className="container mx-auto p-4 ">
                <h1 className="text-5xl font-bold mt-6 mb-6 w-full text-center">Music Tools</h1>
                <div className="flex w-full flex-col lg:flex-row justify-center">
                    {/* Metronome Card */}
                    <div className="card lg:card-side bg-base-100 shadow-xl">
                        <figure className="w-full h-full">
                            <Image
                                src={MetronomeImage}
                                alt="Metronome"
                                className="w-full h-64 object-cover rounded-lg"
                                width={500}
                                height={300}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Metronome</h2>
                            <p>Keep perfect time with customizable tempo settings to enhance your rhythm.</p>
                            <div className="card-actions justify-end">
                                <Link className="btn btn-primary" href="./tools/metronome">
                                    Try it!
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="divider lg:divider-horizontal">🎧</div>

                    {/* Tuner Card */}
                    <div className="card lg:card-side bg-base-100 shadow-xl">
                        <figure className="w-full h-full">
                            <Image
                                src={TunerImage}
                                alt="Tuner"
                                className="w-full h-64 object-cover rounded-lg" 
                                width={500}
                                height={300}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Tuner</h2>
                            <p>Achieve precise tuning for any instrument with easy, accurate adjustments.</p>
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
