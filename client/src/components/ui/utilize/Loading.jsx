import { Loader2 } from 'lucide-react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Loader2 className="animate-spin h-20 w-20 text-blue-500" />
        </div>
    );
}

export default Loading;