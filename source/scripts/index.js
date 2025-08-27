document.addEventListener('DOMContentLoaded', () => {
  const catalogItems = document.querySelectorAll('.room-card');

  catalogItems.forEach((item) => {
    const button = item.querySelector('.room-card__button');

    button.addEventListener('click', () => {
      if (item.classList.contains('room-card--reserved')) {
        return;
      }
      item.classList.add('room-card--selected');
    });

    item.addEventListener('mouseleave', () => {
      if (item.classList.contains('room-card--selected')) {
        item.classList.add('room-card--reserved');
        item.classList.remove('room-card--selected');
      }
    });

    item.addEventListener('click', () => {
      if (item.classList.contains('room-card--reserved')) {
        item.classList.remove('room-card--reserved');
      }
    });
  });
});
