fetch("/api/songs")
  .then((res) => res.json())
  .then((songs) => {
    console.log(songs);
  });
