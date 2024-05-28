document.addEventListener('DOMContentLoaded', () => {
  const projectsSection = document.querySelector("#artwork");
  const projectsList = projectsSection.querySelector("#artwork-container");

  const artworkIds = [869,2189,2816,4081,4428,4575,4758,4773,4788,4796,4884,5357,5848,6565,6596,7021,7124,8624,8633,8958,8991,9010,9503,9512,11272,11320,11393,11434,11723,13720,13853,14572,14574,14591,14598,14655,14968,15401,15468,15563,16146,16169,16231,16298,16327,16362,16487,16488,16499,16551,16568,16571,16776,16964,18709,18757,19339,20432,20579,20684,21023,23333,23506,23684,23700,23972,24306,24548,24645,24836,25332,25853,25865,27307,27310,27984,27987,27992,28067,28560,28849,30709,30839,31285,34116,34181,34286,34299,35198,35376,36132,36161,37368,37761,38930,40619,42566,43060,43145,43714,44018,44741,44892,46230,46327,47149,49195,49686,49691,49702,49714,50148,50157,50276,50330,50909,51185,52560,52679,52736,53001,55249,55384,55706,56682,56731,56905,57051,57819,58540,59426,59787,59847,60031,60755,60812,61128,61428,61603,61608,62042,62371,63178,63234,63554,64276,64339,64724,64729,64818,64884,65290,65868,65916,66039,66434,66683,68769,68823,69109,69780,70003,70202,70207,70443,70739,71396,71829,72726,72728,72801,73216,73413,73417,75644,76054,76240,76244,76279,76295,76395,76571,76779,76816,76869,79307,79379,79507,79600,80062,80084,80479,80607,81512,81558,81564,83642,83889,83905,84241,84709,85533,86340,86385,86421,87045,87163,87479,87643,88724,88793,88977,89403,89856,90048,90300,90443,90536,90583,91194,91620,93345,93811,93900,95998,97402,97910,97916,99539,99602,99766,100079,100089,100250,100472,100829,100858,102131,102234,102295,102591,102611,102963,103347,103887,103943,104031,104043,104094,105073,105105,105203,105466,105800,106538,107069,107300,109275,109330,109439,109686,109780,109819,109926,110507,110634,110663,110881,111060,111164,111317,111377,111380,111400,111401,111436,111442,111559,111610,111617,111628,111642,111654,111810,112092,117188,117266,117271,118661,118746,119454,119521,120154,122054,125660,126981,127644,127859,129884,131385,131541,135430,137125,140645,142526,144272,144361,144969,145681,146701,146905,146953,146988,146989,146991,147003,147508,147513,148412,149681,149776,150054,150739,151358,151363,151371,151424,153244,153701,154232,154235,154237,154238,155969,156442,156474,156538,157056,157156,157160,159136,159824,160144,160201,160222,160226,180298,181091,181145,181774,182728,183077,183277,184095,184186,184193,184324,184362,184371,184672,185180,185184,185222,185619,185651,185760,185766,185905,185963,186047,186049,186392,187155,187165,187528,188540,188844,188845,189207,189289,189290,189595,189600,189715,189775,189807,189932,190224,190558,191197,191371,191454,191556,192689,192890,193664,196323,198809,199002,199854,207293,210482,210511,217201,218612,220179,220272,221885,223309,225016,227420,229351,229354,229393,229406,229510,229866,230189,234004,234433,234781,234972,238749];

  //Randomly generate an index into the array to get a valid artwork id
  const randomInt = Math.floor(Math.random() * artworkIds.length);
  const randomId = artworkIds[randomInt];
  console.log(randomId);
  const url = `https://api.artic.edu/api/v1/artworks/${randomId}`;
  console.log(url);

  //fetch the url and if the data exists for the id, get info about the artwork and the art
  fetch(url)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failure to Load");
          }
          return response.json(); // Parse the response as JSON
      })
      .then((data) => {
          //Get info about artwork
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

          //Add the title to the html
          const artworkTitle = document.getElementById("artworkTitle");
          console.log(artworkTitle);
          artworkTitle.innerHTML = `Title: ${title}`;

          //If artist information is available, then add it to the html
          if (artistTitle != null) {
              const artistTitleElement = document.getElementById("artistTitleId");
              console.log(artistTitleElement);
              artistTitleElement.innerHTML = `Artist: ${artistTitle}`;
          }

          //Get the artwork image for the image id
          const artworkSrcString = `https://www.artic.edu/iiif/2/${artworkImageID}/full/843,/0/default.jpg`;
          console.log(artworkSrcString);

          //Add it to the img block
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
          console.error(`Image ${randomId} not found`, error);
      });

  // Add event listener to the button for fetching another random collection
  const button = document.getElementById('other-collection-button');
  button.addEventListener('click', () => {
      fetch('https://api.artic.edu/api/v1/collections')
          .then(response => response.json())
          .then(data => {
              if (data.data && data.data.length > 0) {
                  const collections = data.data;
                  const randomIndex = Math.floor(Math.random() * collections.length);
                  const randomCollectionID = collections[randomIndex].id;

                  // Construct the URL to the random collection page
                  const collectionUrl = `https://www.artic.edu/collection/${randomCollectionID}`;
                  window.location.href = collectionUrl;
              } else {
                  alert('No collections found.');
              }
          })
          .catch(error => {
              console.error('Error fetching collections data:', error);
              alert('Failed to load collections. Please try again later.');
          });
  });
});