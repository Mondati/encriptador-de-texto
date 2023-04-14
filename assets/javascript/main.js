document.addEventListener('DOMContentLoaded', () => {

    const $btnEncriptar = document.getElementById('btn-encriptar');
    const $btnDesencriptar = document.getElementById('btn-desencriptar');
    const $btnCopiar = document.getElementById('btn-copiar');
    const $h3mensaje = document.getElementById('mensaje');
    const $ingresarTexto = document.getElementById('ingresar-texto');
    const $textoConvertido = document.getElementById('texto-convertido');
    const textarea = document.getElementById("input");
    const $msgError = document.querySelector('.msg-error');



    function validarTexto(txt) {
        const normalizado = txt.trim().toLowerCase()
        return normalizado
    }

    function encriptar(texto) {
        const caracteres = texto.split("");
        let textoEncriptado = "";
        for (let i = 0; i < caracteres.length; i++) {
            let letra = caracteres[i];
            switch (letra) {
                case "e":
                    textoEncriptado += "enter";
                    break;
                case "i":
                    textoEncriptado += "imes";
                    break;
                case "a":
                    textoEncriptado += "ai";
                    break;
                case "o":
                    textoEncriptado += "ober";
                    break;
                case "u":
                    textoEncriptado += "ufat";
                    break;
                default:
                    textoEncriptado += letra;
                    break;
            }
        }
        return textoEncriptado;
    }
    
    function desencriptar(textoEncriptado) {
        let textoDesencriptado = textoEncriptado;
        for (let i = 0; i < textoDesencriptado.length; i++) {
            let letra = textoDesencriptado[i];
            if (letra === "e" && textoDesencriptado[i + 1] === "n" && textoDesencriptado[i + 2] === "t" && textoDesencriptado[i + 3] === "e" && textoDesencriptado[i + 4] === "r") {
                textoDesencriptado = textoDesencriptado.replace("enter", "e");
            } else if (letra === "i" && textoDesencriptado[i + 1] === "m" && textoDesencriptado[i + 2] === "e" && textoDesencriptado[i + 3] === "s") {
                textoDesencriptado = textoDesencriptado.replace("imes", "i");
            } else if (letra === "a" && textoDesencriptado[i + 1] === "i") {
                textoDesencriptado = textoDesencriptado.replace("ai", "a");
            } else if (letra === "o" && textoDesencriptado[i + 1] === "b" && textoDesencriptado[i + 2] === "e" && textoDesencriptado[i + 3] === "r") {
                textoDesencriptado = textoDesencriptado.replace("ober", "o");
            } else if (letra === "u" && textoDesencriptado[i + 1] === "f" && textoDesencriptado[i + 2] === "a" && textoDesencriptado[i + 3] === "t") {
                textoDesencriptado = textoDesencriptado.replace("ufat", "u");
            }
        }
        return textoDesencriptado;
    }


    function procesarTexto(usarEncriptacion) {
        const textoUsuario = textarea.value
        const textoValido = validarTexto(textoUsuario);
        let textoProcesado;
        if (usarEncriptacion) {
            textoProcesado = encriptar(textoValido);
        } else {
            textoProcesado = desencriptar(textoValido);
        }
        $h3mensaje.classList.add('mensaje-out');
        $ingresarTexto.classList.add('mensaje-out');
        $textoConvertido.classList.add('convertido');
        $btnCopiar.classList.add('boton-copiar-on');
        $textoConvertido.innerHTML = textoProcesado;
    }

    function copiar(texto) {
        navigator.clipboard.writeText(texto)
            .then(() => {
                console.log('Texto copiado al portapapeles');
            })
            .catch((err) => {
                console.error('No se pudo copiar el texto: ', err);
            });
    }


    textarea.addEventListener("input", () => {
        const regex = /^[A-Za-zÑñ0-9\s]+$/; // Expresión regular para solo permitir letras y espacios
        const valor = textarea.value;

        // Comprobar si ya existe un span de error
        let $spanError = $msgError.querySelector('.error');

        if (!regex.test(valor)) {
            if (!$spanError) {
                // Si no existe, crear uno nuevo
                $spanError = document.createElement('span');
                $spanError.classList.add('error')
                $msgError.appendChild($spanError)
            }

            // Actualizar su contenido
            $spanError.textContent = "* Solo se permiten letras, numeros y espacios en este campo.";

            // Desactivar botones
            $btnDesencriptar.disabled = true;
            $btnEncriptar.disabled = true;
        } else {
            // Si no hay error, eliminar el span existente si lo hay
            if ($spanError) {
                $msgError.removeChild($spanError);
            }

            // Activar botones
            $btnDesencriptar.disabled = false;
            $btnEncriptar.disabled = false;
        }
    });


    textarea.addEventListener("focus", (e) => {
        e.target.value = "";
        if ($h3mensaje.classList.contains('mensaje-out') && $ingresarTexto.classList.contains('mensaje-out')) {
            $textoConvertido.classList.remove('convertido');
            $textoConvertido.classList.add('mensaje-out')
            $h3mensaje.classList.remove('mensaje-out')
            $ingresarTexto.classList.remove('mensaje-out')
            $btnCopiar.classList.remove('boton-copiar-on');
        }
    });

    // evento boton encriptar
    $btnEncriptar.addEventListener('click', () => {
        if (!textarea.value == "") {
            procesarTexto(true);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'El campo no puede estar vacío',
            })
        }
    });

    // evento boton desencriptar
    $btnDesencriptar.addEventListener('click', () => {
        if (!textarea.value == "") {
            procesarTexto(false);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'El campo no puede estar vacío',
            })
        }
    });

    //evento boton copiar
    $btnCopiar.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: 'Copiado con éxito',
            text: 'Se ha copiado al portapapeles',
        })
        copiar($textoConvertido.innerHTML);
    });

})