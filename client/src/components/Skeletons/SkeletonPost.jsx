import Skeleton from "./Skeleton"

const SkeletonPost = () => {
    return (
        <div className="post">
            <Skeleton classes="image width-100" />
            <Skeleton classes="text width-70" />
            <Skeleton classes="text width-70" />
            <Skeleton classes="text width-50" />
        </div>
    )
}
export default SkeletonPost