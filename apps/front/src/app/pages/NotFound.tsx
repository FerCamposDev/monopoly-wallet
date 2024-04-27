import { useRouteError } from 'react-router-dom';

const NotFoundPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, page not found.</p>
    </div>
  );
};

export default NotFoundPage;