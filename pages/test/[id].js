import { useRouter } from 'next/router';

const Test = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Test: {id}</p>;
};

export default Test;

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  };
}
