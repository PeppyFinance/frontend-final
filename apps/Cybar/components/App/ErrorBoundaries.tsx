import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
  }

  componentDidMount(): void {
    window.addEventListener("unhandledrejection", this.handleRejection);
  }

  componentWillUnmount(): void {
    window.removeEventListener("unhandledrejection", this.handleRejection);
  }

  handleRejection = (event: PromiseRejectionEvent): void => {
    const error = event.reason;
    if (
      error?.name === "TransactionNotFoundError" ||
      error?.name === "BlockNotFoundError"
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "#151A1F",
            color: "#AEE3FA",
            fontFamily: "monospace",
          }}
        >
          <h1>Something went wrong</h1>
          <p style={{ color: "#8a8a8a" }}>
            An unexpected error occurred. Please refresh the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            style={{
              marginTop: "16px",
              padding: "10px 24px",
              background: "#AEE3FA",
              color: "#151A1F",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
