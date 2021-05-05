import utilite from './utilite';

const app = () => {
  const head = document.querySelector('h1');
  head.innerHTML = 'RSS test!';
  utilite();
};

export default app;
