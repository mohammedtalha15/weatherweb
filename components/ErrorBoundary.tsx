"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 bg-[#E76F51]/10 rounded-full flex items-center justify-center mb-4 text-[#E76F51]">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[#2C3333] mb-2">Something went wrong</h2>
                    <p className="text-[#5C5C5C] mb-6 max-w-md">
                        The simulation encountered an unexpected error. Please try reloading the page.
                    </p>
                    <Button onClick={() => window.location.reload()} className="gap-2">
                        <RefreshCw size={16} />
                        Reload Simulation
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
