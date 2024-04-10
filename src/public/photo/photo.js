"use strict";

//capturar video ó imagen
const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");
const btnFhoto = document.getElementById("btnPhoto");

btnFhoto.addEventListener("click", () => {
  setTimeout(async () => {
    // Crear un Blob desde la cadena Base64
    const blob = await (await fetch(canvas.children[0].src)).blob();

    // Crear una URL de objeto (Object URL) desde el Blob
    const imageURL = URL.createObjectURL(blob);

    const options = {
      method: "POST", // Método de la solicitud
      headers: {
        "Content-Type": "application/json", // Tipo de contenido que se está enviando (en este caso, JSON)
      },
      body: JSON.stringify({ imageURL: `https://robohash.org/${imageURL}` }), // Datos que se enviarán en el cuerpo de la solicitud (convertidos a formato JSON)
    };

    // Realizar la solicitud Fetch
    fetch("http://localhost:3000/photo", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Hubo un problema con la solicitud: " + response.status
          );
        }
        return response.json(); // Convertir la respuesta a formato JSON
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Hacer algo con la respuesta del servidor, como mostrarla en la interfaz de usuario
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        // Manejar el error, por ejemplo, mostrando un mensaje de error al usuario
      });
  }, 100);
});

//tomar foto
const button = document.querySelector(".start-btn");

//mostrar foto
const photo = document.querySelector(".photo");

//constrains
/*
Aquí enviamos las caracteristicas del video y
audio que solicitamos
*/

const constraints = {
  video: { width: 420, height: 340 },
  audio: false,
};

//acceso a la webcam
/*
Aquí recibimos la respuesta del navegador, es una promesa
 */
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSucces(stream);
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
};

//3. -----------> si la promesa tiene exito
const handleSucces = (stream) => {
  video.srcObject = stream;
  video.play();
};

//4.------------>Llamada a la función get
getVideo();

//4. ----------> Button y foto
button.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 420, 340);
  let data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
});
