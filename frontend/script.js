// document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
// 	const dropZoneElement = inputElement.closest(".drop-zone");

// 	dropZoneElement.addEventListener("click", (e) => {
// 		inputElement.click();
// 	});

// 	inputElement.addEventListener("change", (e) => {
// 		if (inputElement.files.length) {
// 			updateThumbnail(dropZoneElement, inputElement.files[0]);
// 		}
// 	});

// 	dropZoneElement.addEventListener("dragover", (e) => {
// 		e.preventDefault();
// 		dropZoneElement.classList.add("drop-zone--over");
// 	});

// 	["dragleave", "dragend"].forEach((type) => {
// 		dropZoneElement.addEventListener(type, (e) => {
// 			dropZoneElement.classList.remove("drop-zone--over");
// 		});
// 	});

// 	dropZoneElement.addEventListener("drop", (e) => {
// 		e.preventDefault();

// 		if (e.dataTransfer.files.length) {
// 			inputElement.files = e.dataTransfer.files;
// 			updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
// 		}

// 		dropZoneElement.classList.remove("drop-zone--over");
// 	});
// });

// /**
//  * Updates the thumbnail on a drop zone element.
//  *
//  * @param {HTMLElement} dropZoneElement
//  * @param {File} file
//  */
// function updateThumbnail(dropZoneElement, file) {
// 	let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

// 	// First time - remove the prompt
// 	if (dropZoneElement.querySelector(".drop-zone__prompt")) {
// 		dropZoneElement.querySelector(".drop-zone__prompt").remove();
// 	}

// 	// First time - there is no thumbnail element, so lets create it
// 	if (!thumbnailElement) {
// 		thumbnailElement = document.createElement("div");
// 		thumbnailElement.classList.add("drop-zone__thumb");
// 		dropZoneElement.appendChild(thumbnailElement);
// 	}

// 	thumbnailElement.dataset.label = file.name;

// 	// Show thumbnail for image files
// 	if (file.type.startsWith("image/")) {
// 		const reader = new FileReader();

// 		reader.readAsDataURL(file);
// 		reader.onload = () => {
// 			thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
// 		};
// 	} else {
// 		thumbnailElement.style.backgroundImage = null;
// 	}
// }


document.querySelectorAll(".drop-zone__input").forEach((inputElement) => 
{
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
});
  
/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) 
{
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    // Show thumbnail for image files
    if (file.type.startsWith("image/")) 
    {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } 
    else 
    {
        thumbnailElement.style.backgroundImage = null;
    }
}

function callAPI() 
{
    const inputElement = document.querySelector('input[name="myFile"]');
    const file = inputElement.files[0];
  
    const formData = new FormData();
    formData.append('image', file);
  
    fetch('https://example.com/api', 
    {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => 
    {
        console.log(data);
        // do something with the API response
        document.getElementById('api-response').textContent = JSON.stringify(data);
    })
    .catch(error => 
    {
      console.error('Error:', error);
    });
}
  