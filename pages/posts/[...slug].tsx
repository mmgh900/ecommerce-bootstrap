import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPostIds, getPostData} from "../../lib/posts";

export default function SlugPost(props) {
    return <span>
        {JSON.stringify(props.params)}
    </span>
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {Cars: ['1', '2'], slug: ['Car=a&b', 'b']}}
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log("params")
    console.log(params)
    return {
        props: {
            params
        }
    }
}