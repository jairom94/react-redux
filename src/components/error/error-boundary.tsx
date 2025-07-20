import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoudaryProps {
    children:ReactNode;
}

class ErrorBoundary extends Component<
ErrorBoudaryProps,
{
    error:Error|null;
    info:unknown;
}>{
    constructor(props: ErrorBoudaryProps){
        super(props);
        this.state = {
            error:null,
            info:null
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({error,info:errorInfo})
    }

    render(): ReactNode {
        const { error,info } = this.state
        if(!error){
            return this.props.children
        }
        return (
            <div>
                <h1>Oooooops!!!</h1>
                <div>
                    <code>{error.message}</code>
                </div>
                <div>
                    <code>{JSON.stringify(info)}</code>
                </div>
            </div>
        )
    }
}

export default ErrorBoundary