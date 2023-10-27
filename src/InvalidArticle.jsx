import { MagnifyingGlassSvg } from "./assets/SvgFiles";

export default function InvalidArticle() {
    return (
        <>
            <MagnifyingGlassSvg />
            <div className="invalid-info">
                <h3 className="not-found-header">
                    Oops!
                </h3>
                <h1 className="not-found-info">
                    Couldnt find this article..
                </h1>
            </div>
        </>
    )
}