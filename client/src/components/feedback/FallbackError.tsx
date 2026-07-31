import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";

const FallbackError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "Sorry, an unexpected error occurred. We're working on fixing it.";
  let statusCode: number | string = "";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you're looking for doesn't exist or has been removed.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You need to sign in first to access this page.";
    } else {
      title = "Server error";
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#F2F6F5" }}
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full mb-6"
        style={{ backgroundColor: "#41646520" }}
      >
        <span className="text-3xl font-bold" style={{ color: "#416465" }}>
          {statusCode || "!"}
        </span>
      </div>

      <h1 className="text-2xl font-bold mb-2" style={{ color: "#2E4849" }}>
        {title}
      </h1>

      <p className="text-base mb-8 max-w-md" style={{ color: "#5A7A7B" }}>
        {message}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg px-5 py-2.5 font-medium border transition-colors cursor-pointer"
          style={{ borderColor: "#416465", color: "#416465" }}
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="rounded-lg px-5 py-2.5 font-medium text-white transition-colors cursor-pointer"
          style={{ backgroundColor: "#416465" }}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default FallbackError;