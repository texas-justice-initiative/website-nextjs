// pages/posts/[id].js

function Post({ post }) {
    return (
        <p>Post #{post.id}</p>
    )
}

// This function gets called at build time
export async function getStaticPaths() {

    // Get the paths we want to pre-render based on posts
    const paths = {
        params: { id: '1' },
    };

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {
        paths: [
            { params: { id: '1' } },
            { params: { id: '2' } }
          ],
          fallback: false,
    }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    const post = {
        id: params.id
    }

    // Pass post data to the page via props
    return { props: { post } }
}

export default Post
