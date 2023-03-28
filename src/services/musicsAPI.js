const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`, {
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
