import { ExclamationSvg } from "./assets/SvgFiles";

export default function InvalidPage() {
    return (
        <>
            <ExclamationSvg />
            <div className="invalid-info">
                <h3 className="not-found-header">
                    Oops!
                </h3>
                <h1 className="not-found-info">
                    We could not find this page..
                </h1>
            </div>
        </>
    )
}