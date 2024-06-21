// Aguarda o carregamento do conteúdo HTML para executar o código

document.addEventListener("DOMContentLoaded", function () {
  const lockButton = document.getElementById("lock--button");
  const unlockButton = document.getElementById("unlock--button");
  const textArea = document.getElementById("text--to--convert");
  const waitingTextDiv = document.getElementById("waiting--text");
  const encryptedMessageDiv = document.getElementById("encrypted--message");
  const encryptedText = document.getElementById("encrypted--text");

  // Um objeto que contém as regras para criptografar um texto

  const encryptionMap = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  // Um objeto que contém as regras para descriptografar um texto

  const decryptionMap = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  // Verifica se o texto contém caracteres inválidos como letras maiúsculas, números ou acentos

  function hasInvalidCharacters(text) {
    return /[^a-z\s]/.test(text);
  }

  // Função que criptografar o texto utilizando o replace e o objeto encryptionMap

  function encrypt(text) {
    return text.replace(/[eioua]/g, matched => encryptionMap[matched]);
  }

  // Função que descriptografar o texto utilizando o replace e o objeto decryptionMap

  function decrypt(text) {
    return text.replace(
      /enter|imes|ai|ober|ufat/g,
      matched => decryptionMap[matched]
    );
  }

  // Evento de clique para o botão de criptografar e notificações através da biblioteca SweetAlert

  lockButton.addEventListener("click", function () {
    const text = textArea.value;
    if (text.trim() === "") {
      swal("Erro", "Por favor, insira algum texto para criptografar!", "error");
      return;
    }

    if (hasInvalidCharacters(text)) {
      swal(
        "Erro",
        "O texto contém caracteres inválidos! Use apenas letras minúsculas e sem acento.",
        "error"
      );
      return;
    }
    const encrypted = encrypt(text);
    encryptedText.textContent = encrypted;
    waitingTextDiv.style.display = "none";
    encryptedMessageDiv.style.display = "block";
  });

  // Evento de clique para o botão de descriptografar e notificações através da biblioteca SweetAlert

  unlockButton.addEventListener("click", function () {
    const text = textArea.value;
    if (text.trim() === "") {
      swal(
        "Erro",
        "Por favor, insira algum texto para descriptografar!",
        "error"
      );
      return;
    }
    if (hasInvalidCharacters(text)) {
      swal(
        "Erro",
        "O texto contém caracteres inválidos! Use apenas letras minúsculas e sem acento.",
        "error"
      );
      return;
    }
    const decrypted = decrypt(text);
    encryptedText.textContent = decrypted;
    waitingTextDiv.style.display = "none";
    encryptedMessageDiv.style.display = "block";
  });

  // Permite copiar o texto e envia uma notificação através da biblioteca SweetAlert
  document
    .getElementById("copy--button")
    .addEventListener("click", function () {
      if (encryptedText.textContent.trim() === "") {
        swal("Erro", "Não há texto para copiar!", "warning");
        return;
      }
      navigator.clipboard.writeText(encryptedText.textContent).then(() => {
        swal("Sucesso", "Texto copiado com sucesso!", "success");
      });
    });

  // Permite realizar o download do texto em um arquivo .txt e envia uma notificação através da biblioteca SweetAlert
  document
    .getElementById("download--button")
    .addEventListener("click", function () {
      if (encryptedText.textContent.trim() === "") {
        swal("Erro", "Não há texto para realizar o download!", "warning");
        return;
      }
      const blob = new Blob([encryptedText.textContent], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mensagem.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      swal("Sucesso", "Download realizado com sucesso!", "success");
    });
});
