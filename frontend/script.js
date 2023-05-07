document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
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
function updateThumbnail(dropZoneElement, file) {
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
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  }
  else {
    thumbnailElement.style.backgroundImage = null;
  }
}

function submitForm() {
  const inputElement = document.querySelector('input[name="myFile"]');
  const file = inputElement.files[0];

  if (!file) {
    document.getElementById("warning-message").style.display = "block";
    setTimeout(() => {
      document.getElementById("warning-message").style.display = "none";
    }, 3000); // hide after 3 seconds
    return;
  }

  document.getElementById("warning-message").style.display = "none";

  const formData = new FormData();
  formData.append("file", file, file.filename);

  fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {

      console.log(data);
      // create HTML elements for each property of the JSON response
      const responseContainer = document.getElementById("api-response");
      responseContainer.innerHTML = "";
      for (let key in data) {
        const label = document.createElement("label");
        label.textContent = `${key}: `;
        const value = document.createElement("span");
        value.textContent = `${data[key]}`;
        label.appendChild(value);
        responseContainer.appendChild(label);
      }

      // apply styles to the HTML elements using CSS
      responseContainer.style.display = "flex";
      responseContainer.style.flexWrap = "wrap";
      responseContainer.style.marginTop = "20px";
      responseContainer.querySelectorAll("label").forEach((label) => {
        label.style.flex = "1 2 100%";
        label.style.marginRight = "10px";
        label.style.fontSize = "18px";
        label.style.fontWeight = "bold";
        label.style.textAlign = "center";
      });

      responseContainer.querySelectorAll("span").forEach((value) => {
        value.style.flex = "2 2 90%";
        value.style.fontSize = "18px";
      });

    })
    .catch((error) => {
      console.error("Error:", error);
      // display warning message
      const responseContainer = document.getElementById("api-response");
      responseContainer.innerHTML = "";
      const warning = document.createElement("p");
      warning.textContent = "Unable to reach API. Please try again later.";
      warning.style.color = "red";
      warning.style.textAlign = "center";
      responseContainer.appendChild(warning);

      // hide warning container after 3 seconds
      setTimeout(() => {
        responseContainer.style.display = "none";
      }, 3000);
    });
}
