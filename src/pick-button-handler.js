const createRippleEffect = (e) => {
  const locationX = e.clientX - e.target.getBoundingClientRect().left;
  const locationY = e.clientY - e.target.getBoundingClientRect().top;
  const ripple = document.createElement('span');
  ripple.classList.add("ripple");
  ripple.style.left = `${locationX}px`;
  ripple.style.top = `${locationY}px`;

  e.target.appendChild(ripple);
  setTimeout(() => {
    ripple.remove();
  }, 750);
};

const createShakeEffect = (element, delay) => {
  element.style.webkitAnimation = `shake-horizontal 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) ${delay}s both`;
  element.style.animation = `shake-horizontal 1.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) ${delay}s both`;
};

const createSlideInEffect = (element, delay) => {
  element.style.webkitAnimation = `slide-in-elliptic-bottom-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay}s both`;
  element.style.animation = `slide-in-elliptic-bottom-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay}s both`;
};

const createShodowDropEffect = (element, delay) => {
  element.style.webkitAnimation = `shadow-drop-center 1.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay}s both`;
  element.style.animation = `shadow-drop-center 1.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${delay}s both`;
};

const getRandomWordCardURL = () => {
  const randomIndex = Math.floor(Math.random() * 34 + 1)

  return `../resource/img/wordcards/${randomIndex}.jpg`;
};

const fillWordCard = (container, imgURL) => {
  container.innerHTML += `
    <img src=${imgURL} id="wordcard" class="wordcard" />
  `
};

const downloadImage = (imgURL) => {
  fetch(imgURL)
      .then(res => res.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        let imgData
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }))
      .then(imgSource => {
        const imgData = atob(imgSource.split(",")[1]);
        const buf = new ArrayBuffer(imgData.length);
        const view = new Uint8Array(buf);
        for(let i = 0; i < imgData.length; i++) {
          view[i] = imgData.charCodeAt(i) & 0xff;
        }

        const blob = new Blob([view], { type: "image/jpg" });
        window.saveAs(blob, "2021 말씀뽑기.jpg");
      });
};

const showDownloadButton = (container, imgURL) => {
  container.innerHTML += `
    <button class="download-button"">다운로드</button>
  `;
  container.getElementsByTagName("button")[0].addEventListener("click", () => downloadImage(imgURL));
};

const slidePageToLeft = ($main) => {
  const $secondPage = document.getElementById("second-page");
  const imgURL = getRandomWordCardURL();
  fillWordCard($secondPage.children[1], imgURL);

  setTimeout(() => {
    $main.style.transform = "translateX(-50%)"
    createShakeEffect($secondPage.children[0], 0.9);
    createSlideInEffect($secondPage.children[1], 2.5);
    showDownloadButton($secondPage, imgURL);
  }, 800);

  setTimeout(() => {
    createShodowDropEffect($secondPage.children[1], 0);
  }, 4000);
};

export const pickButtonHandler = (e) => {
  createRippleEffect(e);
  slidePageToLeft(e.target.closest("main"));
};