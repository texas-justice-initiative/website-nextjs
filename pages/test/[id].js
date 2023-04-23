import { useRouter } from 'next/router';

const Test = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Test: {id}</p>;
};

export default Test;
