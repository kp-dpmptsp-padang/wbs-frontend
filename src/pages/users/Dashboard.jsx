export default function Dashboard() {
    return (
        // <div>
        //     <h1></h1>
        // </div>
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-4 gap-6">
                <div className="card p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">Card 1</div>
                <div className="card p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">Card 2</div>
                <div className="card p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">Card 3</div>
                <div className="card p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">Card 4</div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="card p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">Card 5</div>
                <div className="card p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">Card 6</div>
            </div>
        </div>
    );
}