const pages = document.querySelectorAll('[data-page]');
let currentPage = 'start-page';

export function getCurrentPage() {
  return currentPage;
}

export function setCurrentPage(page) {
  currentPage = page;
}

export function changePage() {
  pages.forEach((page) => {
    page.classList.remove('open');
  });
  pages.forEach((page) => {
    if (page.classList.contains(currentPage)) {
      page.classList.add('open');
    }
  });
}


