const getCsrfToken = async () => {
  const response = await fetch('/csrf-token', { credentials: 'include' });
  const data = await response.json();
  return data.csrfToken;
};

export default getCsrfToken;
