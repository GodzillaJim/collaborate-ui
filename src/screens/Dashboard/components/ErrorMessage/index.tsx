import React from "react"

interface IErrorMessage{
    message: string,
    retryAction: () => void
}
const ErrorMessage = ({ message, retryAction }: IErrorMessage) => {
    return <div className={"container-fluid"}>
        <div className={"row my-2 pb-2"}>
            <div className={"col text-danger text-center"}>{message || "Something went wrong. 😥"}</div>
        </div>
        <div className={"row"}>
            <div className={"col text-center"}>
                <button onClick={retryAction} className={"btn btn-sm btn-info"}>Retry</button>
            </div>
        </div>
    </div>
}

export default ErrorMessage;