import './sass/main.scss';
// console.log('hw-13');

import fetchImageApi from './js/fetch-Image-Api';
import photoCardTpl from './temlates/photo-card';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

const newFetchImageApi = new fetchImageApi();

async function onSearchForm(evt) {
    evt.preventDefault();

    isHiddenTrue();
   
    newFetchImageApi.query = evt.currentTarget.elements.searchQuery.value;

    if (newFetchImageApi.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    newFetchImageApi.resetPage();
    clearGalleryContainer();

    const response = await newFetchImageApi.fetchImages();
    return photoCardMarkup(response);
}


async function onLoadMoreBtn() {
    const response = await newFetchImageApi.fetchImages();
    return photoCardMarkup(response); 
}


function photoCardMarkup(images) {
    
    galleryContainer.insertAdjacentHTML('beforeend', photoCardTpl(images))
    
    isHiddenFalse();

    if (images.length === 0) {
        isHiddenTrue();
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    if (images.length < 40) {
        isHiddenTrue();
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }
}


function clearGalleryContainer() {
    galleryContainer.innerHTML = '';
}

function isHiddenFalse() {
    loadMoreBtn.classList.remove('is-hidden')
}

function isHiddenTrue() {
    loadMoreBtn.classList.add('is-hidden')
}