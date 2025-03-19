const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="blue-600"
                    d="M4.29 4.29a1 1 0 011.42 0L12 10.59l6.29-6.3a1 1 0 011.42 1.42l-7.3 7.3a1 1 0 01-1.42 0L4.29 5.71a1 1 0 010-1.42z"
                />
            </svg>
        </div>
    );
}
export default Loading;