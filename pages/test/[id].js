import { useRouter } from 'next/router';

const Test = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Test: {id}</p>;
};

export default Test;

// export async function getStaticProps({ params }) {
//   return {
//     props: {
//       id: params.id,
//     },
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//     fallback: false,
//   };
// }

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    props: { id: context.params },
  };
}
