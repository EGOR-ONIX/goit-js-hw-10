import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
// import

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loaderMessage: document.querySelector('.loader'),
  errorMessage: document.querySelector('.error'),
  catBox: document.querySelector('.cat-info'),
};

// First loading. Add class
toggleVisuallyHiddenClass(refs.errorMessage);
toggleVisuallyHiddenClass(refs.breedSelect);

fetchBreeds()
  .then(data => {
    const arrBreedsId = [];
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });

    new SlimSelect({
      select: refs.breedSelect,
      data: arrBreedsId,
    });

    // Add class
    toggleVisuallyHiddenClass(refs.loaderMessage);
    // Remove class
    toggleVisuallyHiddenClass(refs.breedSelect);
  })
  .catch(onFetchError);

refs.breedSelect.addEventListener('change', showBoxCat);

function showBoxCat(event) {
  refs.catBox.innerHTML = '';

  // Lodaing info
  toggleVisuallyHiddenClass(refs.loaderMessage);

  fetchCatByBreed(event.currentTarget.value)
    .then(data => {
      const markup = data.reduce(
        (acc, { url, width, breeds: [{ description, name, temperament }] }) =>
          acc +
          `
      <img class="cat-photo" src="${url}" alt="${name} cat photo" width="${width}"/>
        <div class="cat-wrap">
          <h1 class="cat-title">${name}</h1>
          <p class="cat-desc">${description}</p>
          <p><b>Temperament:</b> ${temperament}.</p>
          </div>`,
        ''
      );

      // Get info
      toggleVisuallyHiddenClass(refs.loaderMessage);

      refs.catBox.innerHTML = markup;
    })
    .catch(onFetchError);
}

function onFetchError() {
  // Remuve class
  toggleVisuallyHiddenClass(refs.breedSelect);
  toggleVisuallyHiddenClass(refs.loaderMessage);

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}

function toggleVisuallyHiddenClass(element) {
  element.classList.toggle('visually-hidden');
}
