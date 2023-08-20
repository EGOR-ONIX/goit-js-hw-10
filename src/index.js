import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';
// import

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loaderMessage: document.querySelector('.loader'),
  errorMessage: document.querySelector('.error'),
  catBox: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(breeds => {
    const markup = breeds.reduce(
      (acc, { name, id }) => acc + `<option value="${id}">${name}</option>`,
      ''
    );

    refs.breedSelect.innerHTML = markup;

    new SlimSelect({
      select: refs.breedSelect,
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

  refs.catBox.classList.remove('visually-hidden');

  fetchCatByBreed(event.currentTarget.value)
    .then(breed => {
      const markup = breed.reduce(
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
  // Add class
  toggleVisuallyHiddenClass(refs.breedSelect);
  toggleVisuallyHiddenClass(refs.loaderMessage);

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}

function toggleVisuallyHiddenClass(element) {
  element.classList.toggle('visually-hidden');
}
