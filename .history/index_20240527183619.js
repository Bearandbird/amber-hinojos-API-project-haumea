document.addEventListener("DOMContentLoaded", function() {
  const reloadButton = document.getElementById("reloadButton");

  // Add event listener to reload button
  reloadButton.addEventListener("click", function() {
      // Call the fetchArtwork function to reload the fetch
      fetchArtwork();
  });

  // Call fetchArtwork initially to load artwork on page load
  fetchArtwork();
});

// Function to fetch artwork
function fetchArtwork() {
  const url = `https://api.artic.edu/api/v1/artworks/random`;

  // fetch the url and if the data exists for the id, get info about the artwork and the art
  fetch(url)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failure to Load");
          }
          return response.json(); // Parse the response as JSON
      })
      .then((data) => {
          // Get info about artwork
          console.log(data);
          const artwork = data.data;
          console.log(artwork);
          const title = artwork.title;
          console.log(artwork.title);
          const artistTitle = artwork.artist_title;
          console.log(artistTitle);
          const artistId = artwork.artist_id;
          const artworkImageID = artwork.image_id;
          console.log(artworkImageID);

          // Add the title to the html
          const artworkTitle = document.getElementById("artworkTitle");
          console.log(artworkTitle);
          artworkTitle.innerHTML = `Title: ${title}`;

          // If artist information is available, then add it to the html
          if (artistTitle != null) {
              const artistTitleElement = document.getElementById("artistTitleId");
              console.log(artistTitleElement);
              artistTitleElement.innerHTML = `Artist: ${artistTitle}`;
          }

          // Get the artwork image for the image id
          const artworkSrcString = `https://www.artic.edu/iiif/2/${artworkImageID}/full/843,/0/default.jpg`;
          console.log(artworkSrcString);

          // Add it to the img block
          const artworkImage = document.getElementById("artworkImage");
          artworkImage.setAttribute("src", artworkSrcString);

          console.log(artworkSrcString);

          // Fetch artist birth and death date if available
          if (artistId) {
              fetch(`https://api.artic.edu/api/v1/artists/${artistId}`)
                  .then(response => {
                      if (!response.ok) {
                          throw new Error("Failed to load artist info");
                      }
                      return response.json();
                  })
                  .then(artistData => {
                      console.log(artistData);
                      const artist = artistData.data;
                      const artistBirthDate = artist.birth_date;
                      const artistDeathDate = artist.death_date;

                      const artistInfoElement = document.getElementById("artistInfo");
                      artistInfoElement.innerHTML = `
                          <p>Birth Date: ${artistBirthDate}</p>
                          <p>Death Date: ${artistDeathDate}</p>
                      `;
                  })
                  .catch(error => console.error('Error fetching artist info:', error));
          }
      })
      .catch((error) => {
          console.error("Failed to fetch artwork", error);
      });
}