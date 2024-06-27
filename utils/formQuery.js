

export function formUrlQuery({ params, key, value, keysToRemove }) {
  const urlParams = new URLSearchParams(params);

  if (keysToRemove) {
    keysToRemove.forEach((keyToRemove) => {
      urlParams.delete(keyToRemove);
    });
  } else if (key && value) {
    urlParams.set(key, value);
  }

  return urlParams.toString() ? `?${urlParams.toString()}` : '';
}



export const updateUrlWithSearchQuery = (router, pathname, searchParams, query) => {
  try {
    let newUrl = '';
    if (query) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'query',
        value: query,
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['query'],
      });
    }
    if (newUrl) {
      router.push(`${pathname}${newUrl}`, { scroll: false });
    } else {
      router.push(`/`, { scroll: false });
    }
  } catch (error) {
    console.error("Failed to update URL with search query", error);
  }
};

