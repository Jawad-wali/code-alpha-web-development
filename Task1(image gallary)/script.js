const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");
const downloadBtn = document.getElementById("download-btn");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const searchInput = document.getElementById("search-input");

let currentIndex = 0;
let itemsArray = Array.from(galleryItems);

// Open Lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openLightbox(index);
  });
});

function openLightbox(index) {
  currentIndex = index;
  const img = itemsArray[index].querySelector("img");
  const title = itemsArray[index].getAttribute("data-title");
  const desc = itemsArray[index].getAttribute("data-desc");

  lightbox.style.display = "block";
  lightboxImg.src = img.src;
  lightboxTitle.innerText = title;
  lightboxDesc.innerText = desc;
  downloadBtn.href = img.src;
}

// Close Lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Next / Prev
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % itemsArray.length;
  openLightbox(currentIndex);
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
  openLightbox(currentIndex);
});

// Category Filter
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    itemsArray.forEach(item => {
      if (category === "all" || item.getAttribute("data-category") === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Search Filter
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.toLowerCase();
  itemsArray.forEach(item => {
    const title = item.getAttribute("data-title").toLowerCase();
    const desc = item.getAttribute("data-desc").toLowerCase();
    if (title.includes(query) || desc.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
