document.addEventListener('DOMContentLoaded', () => {
  const catalogItems = document.querySelectorAll('.catalog__item');

  catalogItems.forEach((item) => {
    const button = item.querySelector('.catalog__item-button');

    button.addEventListener('click', () => {
      if (item.classList.contains('catalog__item--reserved')) {
        return;
      }
      item.classList.add('catalog__item--selected');
    });

    item.addEventListener('mouseleave', () => {
      if (item.classList.contains('catalog__item--selected')
        && !item.classList.contains('catalog__item--reserved')) {
        item.classList.add('catalog__item--reserved');
        item.classList.remove('catalog__item--selected');
      }
    });

    item.addEventListener('click', () => {
      if (item.classList.contains('catalog__item--reserved')) {
        item.classList.remove('catalog__item--reserved');
      }
    });
  });
});
